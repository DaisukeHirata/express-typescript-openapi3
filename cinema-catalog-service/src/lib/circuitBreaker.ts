import * as cls from "cls-hooked";
import * as env from "../env";
import CircuitBreaker from "opossum";
import * as rp from "request-promise";
import * as Debug from "debug";
import * as P from "bluebird";
const debug = Debug("fetch-circuit-breaker");

const getNamespace = cls.getNamespace;
const NAMESPACE: string = "SOS";
export const REQ_NAME: string = "X-Request-Id";
export const REQ_ACCEPT_LANGUAGE: string = "accept-language";
export const REQ_AUTORIZATION: string = "authorization";
export const REQ_GEO_LOCATION: string = "geolocation";

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
export async function fetch(url: RequestInfo, defaultResponse: any = {}): P<any> {
  const request = getNamespace(NAMESPACE);
  debug(JSON.stringify(request));
  // if (!request.active.hasOwnProperty(REQ_AUTORIZATION)) {
  //   const err = new Error("authorization does not exist in fetch");
  //   err.statusCode = "501";
  //   throw err;
  // }
  const requestId = request.get(REQ_NAME);
  const acceptLanguage = request.get(REQ_ACCEPT_LANGUAGE);
  const authorization = request.get(REQ_AUTORIZATION);
  const headers = {
    [REQ_NAME]: requestId,
    [REQ_ACCEPT_LANGUAGE]: acceptLanguage,
    [REQ_AUTORIZATION]: authorization,
    "accept": "*/*"
  };
  const geolocation = request.get(REQ_GEO_LOCATION);
  if (geolocation) {
    headers[REQ_GEO_LOCATION] = geolocation;
  }
  const params = {
    uri: url,
    headers,
    resolveWithFullResponse: true
  };
  return req(url, rp.get, params, defaultResponse);
}

export async function put(url: RequestInfo, payload: {}, defaultResponse: any = {}): P<any> {
  const request = getNamespace(NAMESPACE);
  debug(JSON.stringify(request));
  const requestId = request.get(REQ_NAME);
  const acceptLanguage = request.get(REQ_ACCEPT_LANGUAGE);
  const params = {
    method: "PUT",
    uri: url,
    headers: {
      [REQ_NAME]: requestId,
      [REQ_ACCEPT_LANGUAGE]: acceptLanguage
    },
    body: payload,
    json: true,
    resolveWithFullResponse: true
  };
  return req(url, rp.put, params, defaultResponse);
}

export async function post(url: RequestInfo, payload: {}, defaultResponse: any = {}): P<any> {
  const request = getNamespace(NAMESPACE);
  debug(JSON.stringify(request));
  const requestId = request.get(REQ_NAME);
  const acceptLanguage = request.get(REQ_ACCEPT_LANGUAGE);
  const headers = {
    [REQ_NAME]: requestId,
    [REQ_ACCEPT_LANGUAGE]: acceptLanguage,
    "accept": "*/*"
  };
  const geolocation = request.get(REQ_GEO_LOCATION);
  if (geolocation) {
    headers[REQ_GEO_LOCATION] = geolocation;
  }
  const params = {
    method: "POST",
    uri: url,
    headers,
    body: payload,
    json: true,
    resolveWithFullResponse: true
  };
  return req(url, rp.post, params, defaultResponse);
}

export async function index(url: RequestInfo, payload: {}, defaultResponse: any = {}): P<any> {
  const request = getNamespace(NAMESPACE);
  debug(JSON.stringify(request));
  const requestId = request.get(REQ_NAME);
  const acceptLanguage = request.get(REQ_ACCEPT_LANGUAGE);
  const params = {
    method: "POST",
    uri: url,
    headers: {
      [REQ_NAME]: requestId,
      [REQ_ACCEPT_LANGUAGE]: acceptLanguage,
      Authorization: env.get("ES_AUTHORIZATION_TOKEN")
    },
    body: payload,
    json: true,
    resolveWithFullResponse: true
  };
  return req(url, rp.post, params, defaultResponse);
}

export async function search(url: RequestInfo, payload: {}, defaultResponse: any = {}): P<any> {
  const request = getNamespace(NAMESPACE);
  debug(JSON.stringify(request));
  const requestId = request.get(REQ_NAME);
  const acceptLanguage = request.get(REQ_ACCEPT_LANGUAGE);
  const params = {
    method: "GET",
    uri: url,
    headers: {
      [REQ_NAME]: requestId,
      [REQ_ACCEPT_LANGUAGE]: acceptLanguage,
      Authorization: env.get("ES_AUTHORIZATION_TOKEN")
    },
    body: payload,
    json: true,
    resolveWithFullResponse: true
  };
  return req(url, rp.get, params, defaultResponse);
}

async function req(url: RequestInfo, method: any, params: {}, defaultResponse: any = {}): P<any> {
  debug("Send Request: %s %s", url, JSON.stringify(params));

  // option should be considered later
  const options = {
    timeout: 3000, // If our function takes longer than 3 seconds, trigger a failure
    errorThresholdPercentage: 50, // When 50% of requests fail, trip the circuit
    resetTimeout: 30000 // After 30 seconds, try again.
  };

  const circuit = CircuitBreaker(method, options);
  circuit.hystrixStats.getHystrixStream().setMaxListeners(100);

  circuit.fire(params).catch((err) => {
    debug("circuit: " + circuit.status);
    debug(`get ${url} error (${err.status}).`, err);
    throw err;
  });

  return new Promise((resolve, reject) => {
    circuit.fallback(() => reject(defaultResponse ? defaultResponse : {
      error: "Unread messages currently unavailable. Try again later"
    }));

    circuit.on("success", (res) => {
      debug("status %d", res.statusCode);
      if (res.statusCode >= 500 && res.statusCode < 600) {
        const err = new Error(res.statusText);
        err.code = err.status = err.statusCode = res.statusCode;
        err.url = url;
        reject(err);
      }
      if (res && res.body) {
        if (typeof res.body === "string") {
          resolve(JSON.parse(res.body));
        }
        resolve(res.body);
      }
    });

    circuit.on("failure", (err) => {
      if (!err.statusCode) {
        err.statusCode = "500";
      }
      if (err.code === "ETIMEDOUT") {
        err.statusCode = "408";
      }
      debug("status %d", err.statusCode);
      debug("err: " + JSON.stringify(err));
      reject(err);
    });
  });
}
