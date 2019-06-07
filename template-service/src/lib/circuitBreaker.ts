import * as cls from "cls-hooked";
import CircuitBreaker from "opossum";
import { get } from "request-promise";
import * as Debug from "debug";
const debug = Debug("fetch-circuit-breaker");

const getNamespace = cls.getNamespace;
const NAMESPACE: string = "SOS";
export const REQ_NAME: string = "X-Request-Id";
export const request = getNamespace(NAMESPACE);

declare global {
  interface Error {
    code: string;
    status: string;
    statusCode: string;
    url: RequestInfo;
  }
}

// please see the following to understand this code in detail.
// http://lanceball.com/words/2017/01/05/protect-your-node-js-rest-clients-with-circuit-breakers/
// This article reccomend to use elasticache to share the state of the circuit. but we don't.
// because we should avoid serverless anti-pattern of sharing the state of the circuit across multiple callers.
// https://medium.com/@jeremydaly/serverless-microservice-patterns-for-aws-6dadcd21bc02#834f
// https://epsagon.com/blog/best-practices-for-aws-lambda-timeouts/
export async function fetch(url: RequestInfo, defaultResponse: any = {}) {
  // option should be considered later
  const options = {
    timeout: 3000, // If our function takes longer than 3 seconds, trigger a failure
    errorThresholdPercentage: 50, // When 50% of requests fail, trip the circuit
    resetTimeout: 30000 // After 30 seconds, try again.
  };

  const circuit = CircuitBreaker(get, options);

  circuit.fallback(() => Promise.resolve(defaultResponse ? defaultResponse : {
    error: "Unread messages currently unavailable. Try again later"
  }));

  const requestId = request.get(REQ_NAME);
  const res = await circuit.fire({
    uri: url,
    headers: {[REQ_NAME]: requestId},
    resolveWithFullResponse: true
  }).catch((err) => {
    debug(`get ${url} error (${err.status}).`, err);
    throw err;
  });
  debug("status %d", res.statusCode);
  if (res.statusCode >= 500 && res.statusCode < 600) {
    const err = new Error(res.statusText);
    err.code = err.status = err.statusCode = res.statusCode;
    err.url = url;
    throw err;
  } else {
    const body = JSON.parse(res.body);
    return body;
  }
}
