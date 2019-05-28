import * as retry from "async-retry";
import * as Debug from "debug";
import fetch from "node-fetch";
import * as cls from "cls-hooked";

const getNamespace = cls.getNamespace;
const NAMESPACE: string = "SOS";
export const REQ_NAME: string = "X-Request-Id";
export const request = getNamespace(NAMESPACE);

const debug = Debug("fetch-retry");

// retry settings
const MIN_TIMEOUT = 10;
const MAX_RETRIES = 3;
const FACTOR = 5;

declare global {
  interface Error {
    code: string;
    status: string;
    statusCode: string;
    url: RequestInfo;
  }
}

export async function fetchRetry(url: RequestInfo, opts: any = {}) {
  const retryOpts = Object.assign({
    // timeouts will be [ 10, 50, 250 ]
    minTimeout: MIN_TIMEOUT,
    retries: MAX_RETRIES,
    factor: FACTOR
  }, opts.retry);

  if (opts.onRetry) {
    retryOpts.onRetry = error => {
      opts.onRetry(error, opts);
      if (opts.retry && opts.retry.onRetry) {
        opts.retry.onRetry(error);
      }
    };
  }

  return retry(async (bail, attempt) => {
    const {method = "GET"} = opts;
    const requestId = request.get(REQ_NAME);
    opts["headers"] = {[REQ_NAME]: requestId};
    const isRetry = attempt < retryOpts.retries;
    try {
      // this will be retried
      const res = await fetch(url, opts);
      debug("status %d", res.status);
      if (res.status >= 500 && res.status < 600 && isRetry) {
        const err = new Error(res.statusText);
        err.code = err.status = err.statusCode = res.status;
        err.url = url;
        throw err;
      } else {
        return res;
      }
    } catch (err) {
      debug(`${method} ${url} error (${err.status}). ${isRetry ? "retrying" : ""}`, err);
      throw err;
    }
  }, retryOpts);
}
