import * as cls from "cls-hooked";
import * as uuid from "node-uuid";
import * as express from "express";
import * as Debug from "debug";
import * as P from "bluebird";

const debug = Debug("app:src:lib:namespace");

const getNamespace = cls.getNamespace;
const createNamespace = cls.createNamespace;
const NAMESPACE: string = "SOS";
export const REQ_NAME: string = "X-Request-Id";
export const REQ_ACCEPT_LANGUAGE: string = "accept-language";
export const request = createNamespace(NAMESPACE);

export function getRequestId(): string {
  const myRequest = getNamespace(NAMESPACE);
  if (myRequest && myRequest.get(REQ_NAME)) {
    return myRequest.get(REQ_NAME);
  }
  return undefined;
}

export async function setRequestId(req: express.Request, res: express.Response, next: express.NextFunction): P <any> {
  req[REQ_NAME] = req[REQ_NAME] || req.get(REQ_NAME) || req.query[REQ_NAME] || uuid.v4();
  req.requestId = req[REQ_NAME];
  res.setHeader(REQ_NAME, req[REQ_NAME]);
  debug("Response requestId set as: ", res.getHeader(REQ_NAME));
  debug("Store UUID, add it to the request");
  request.run(function() {
    request.set(REQ_NAME, req[REQ_NAME]);
    debug("CLS, requestId added as:", req[REQ_NAME]);
    next();
  });
}

export async function setAcceptLanguage(req: express.Request, res: express.Response, next: express.NextFunction): P <any> {
  req[REQ_ACCEPT_LANGUAGE] = req[REQ_ACCEPT_LANGUAGE] || req.get(REQ_ACCEPT_LANGUAGE) || req.query[REQ_ACCEPT_LANGUAGE] || "en-US"; // FIXME: use user setting language
  res.setHeader(REQ_ACCEPT_LANGUAGE, req[REQ_ACCEPT_LANGUAGE]);
  debug("Response accept language set as: ", res.getHeader(REQ_ACCEPT_LANGUAGE));
  debug("Store accept language, add it to the request");
  request.run(function() {
    request.set(REQ_ACCEPT_LANGUAGE, req[REQ_ACCEPT_LANGUAGE]);
    debug("CLS, accept language added as:", req[REQ_ACCEPT_LANGUAGE]);
    next();
  });
}
