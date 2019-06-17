import * as cls from "cls-hooked";
import CircuitBreaker from "opossum";
import * as rp from "request-promise";
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
  const requestId = request.get(REQ_NAME);
  const params = {
    uri: url,
    headers: {[REQ_NAME]: requestId},
    resolveWithFullResponse: true
  };
  return req(url, rp.get, params, defaultResponse);
}

export async function put(url: RequestInfo, payload: {}, defaultResponse: any = {}) {
  const requestId = request.get(REQ_NAME);
  const params =  {
    method: "PUT",
    uri: url,
    headers: {[REQ_NAME]: requestId},
    body: payload,
    json: true,
    resolveWithFullResponse: true
  };
  return req(url, rp.put, params, defaultResponse);
}

export async function post(url: RequestInfo, payload: {}, defaultResponse: any = {}) {
  const requestId = request.get(REQ_NAME);
  const params =  {
    method: "POST",
    uri: url,
    headers: {[REQ_NAME]: requestId},
    body: payload,
    json: true,
    resolveWithFullResponse: true
  };
  return req(url, rp.post, params, defaultResponse);
}

export async function search(url: RequestInfo, payload: {}, defaultResponse: any = {}) {
  const requestId = request.get(REQ_NAME);
  const params =  {
    method: "GET",
    uri: url,
    headers: {[REQ_NAME]: requestId},
    body: payload,
    json: true,
    resolveWithFullResponse: true
  };
  return req(url, rp.get, params, defaultResponse);
}

async function req(url: RequestInfo, method: any, params: {}, defaultResponse: any = {}) {
  // option should be considered later
  const options = {
    timeout: 3000, // If our function takes longer than 3 seconds, trigger a failure
    errorThresholdPercentage: 50, // When 50% of requests fail, trip the circuit
    resetTimeout: 30000 // After 30 seconds, try again.
  };

  const circuit = CircuitBreaker(method, options);

  circuit.fallback(() => Promise.resolve(defaultResponse ? defaultResponse : {
    error: "Unread messages currently unavailable. Try again later"
  }));

  const res = await circuit.fire(params).catch((err) => {
    debug(`get ${url} error (${err.status}).`, err);
    throw err;
  });
  debug("status %d", res.statusCode);
  if (isEmpty(res)) {
    const err = new Error("response empty error");
    throw err;
  }
  if (res.statusCode >= 500 && res.statusCode < 600) {
    const err = new Error(res.statusText);
    err.code = err.status = err.statusCode = res.statusCode;
    err.url = url;
    throw err;
  }
  if (res && res.body) {
    if (typeof res.body === "string") {
      return JSON.parse(res.body);
    }
    return res.body;
  }
  return "";
}

function isEmpty(obj) {
  return !Object.keys(obj).length;
}
