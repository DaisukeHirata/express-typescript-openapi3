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
export const REQ_AUTORIZATION: string = "authorization";
export const REQ_GEO_LOCATION: string = "geolocation";
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

export async function setAllHeaders(req: express.Request, res: express.Response, next: express.NextFunction): P <any> {
  // req and res are event emitters. We want to access CLS context inside of their event callbacks
  request.bindEmitter(req);
  request.bindEmitter(res);

  req[REQ_NAME] = req[REQ_NAME] || req.get(REQ_NAME) || req.query[REQ_NAME] || uuid.v4();
  req.requestId = req[REQ_NAME];
  res.setHeader(REQ_NAME, req[REQ_NAME]);
  debug("Response requestId set as: ", res.getHeader(REQ_NAME));
  debug("Store UUID, add it to the request");

  req[REQ_ACCEPT_LANGUAGE] = req[REQ_ACCEPT_LANGUAGE] || req.get(REQ_ACCEPT_LANGUAGE) || req.query[REQ_ACCEPT_LANGUAGE]; // FIXME: use user setting language
  res.setHeader(REQ_ACCEPT_LANGUAGE, req[REQ_ACCEPT_LANGUAGE]);
  debug("Response accept language set as: ", res.getHeader(REQ_ACCEPT_LANGUAGE));
  debug("Store accept language, add it to the request");

  if ((req[REQ_AUTORIZATION] || req.get(REQ_AUTORIZATION) || req.query[REQ_AUTORIZATION])) {
    req[REQ_AUTORIZATION] = req[REQ_AUTORIZATION] || req.get(REQ_AUTORIZATION) || req.query[REQ_AUTORIZATION];
    res.setHeader(REQ_AUTORIZATION, req[REQ_AUTORIZATION]);
    debug("Response authorization token set as: ", res.getHeader(REQ_AUTORIZATION));
    debug("Store authorization, add it to the request");
  }

  if ((req[REQ_GEO_LOCATION] || req.get(REQ_GEO_LOCATION) || req.query[REQ_GEO_LOCATION])) {
    req[REQ_GEO_LOCATION] = req[REQ_GEO_LOCATION] || req.get(REQ_GEO_LOCATION) || req.query[REQ_GEO_LOCATION];
    res.setHeader(REQ_GEO_LOCATION, req[REQ_GEO_LOCATION]);
    debug("Response geolocation set as: ", res.getHeader(REQ_GEO_LOCATION));
    debug("Store geolocation, add it to the request");
  }

  createNewContext(req, next);
}

export async function createNewContext(req: express.Request, next: express.NextFunction): P <any> {
  request.run(function() {
    request.set(REQ_NAME, req[REQ_NAME]);
    debug("CLS, requestId added as:", req[REQ_NAME]);

    request.set(REQ_ACCEPT_LANGUAGE, req[REQ_ACCEPT_LANGUAGE]);
    debug("CLS, accept language added as:", req[REQ_ACCEPT_LANGUAGE]);

    if ((req[REQ_AUTORIZATION] || req.get(REQ_AUTORIZATION) || req.query[REQ_AUTORIZATION])) {
      request.set(REQ_AUTORIZATION, req[REQ_AUTORIZATION]);
      debug("CLS, authorization added as:", req[REQ_AUTORIZATION]);
    }

    if ((req[REQ_GEO_LOCATION] || req.get(REQ_GEO_LOCATION) || req.query[REQ_GEO_LOCATION])) {
      request.set(REQ_GEO_LOCATION, req[REQ_GEO_LOCATION]);
      debug("CLS, geolocation added as:", req[REQ_GEO_LOCATION]);
    }

    next();
  });
}
