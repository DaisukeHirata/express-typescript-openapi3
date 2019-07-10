import * as express from "express";
import swaggerTools = require("oas-tools");
import { Swagger20Request } from "oas-tools";
import { readFileSync } from "fs";
import * as YAML from "js-yaml";
import { TDebug } from "../log";
const debug = new TDebug("app:src:middlewares:swagger");

declare module "express" {
    interface Request {
        swagger: Swagger20Request["swagger"];
        requestId: string;
        files: any[];
    }
}

// const isProd = (process.env.NODE_ENV === "production");

function loadDocumentSync(file: string): any {
    return YAML.load(readFileSync(file));
}

import * as CognitoExpress from "cognito-express";
import * as env from "../env";

const cognitoExpress = new CognitoExpress({
  region:            env.get("COGNITO_REGION"),
  cognitoUserPoolId: env.get("COGNITO_USER_POOL_ID"),
  tokenUse:          "access",
  tokenExpiration:   365 * 24 * 60 * 60 * 1000
});

// refs. https://www.npmjs.com/package/cognito-express#full-example
// refs. https://github.com/isa-group/oas-tools#2-oassecurity
function verifyToken(req, secDef, token, next) {
  const bearerRegex = /^Bearer\s/;
  debug.log(`token: ${token}`);

  if (token && bearerRegex.test(token)) {
    const newToken = token.replace(bearerRegex, "");

    if (!newToken) {
      return req.res.status(401).send("Access Token missing from header");
    }

    cognitoExpress.validate(newToken, function(error, response) {
      if (error) {
        return req.res.status(401).send(error);
      }

      req.res.locals.user = response;
      next();
    });
  } else {
    return next(req.res.status(403).send("Invalid Access Token"));
  }
}

export const initSwaggerMiddlware = function (app: express.Express, basePath: string, cb: any) {
    const swaggerDoc = loadDocumentSync(basePath + "/definition/swagger.yaml");
    const options = {
        controllers: basePath + "/routes",
        loglevel: "info",
        strict: true,
        router: true,
        validator: true,
        docs: {
            // uncomment following 2 lines causes Lambda crash due to writeFileSync
            // swaggerUi: "/docs",
            // swaggerUiPrefix: "",
            apiDocs: "/api-docs",
            apiDocsPrefix: ""
        },
        oasSecurity: true,
        securityFile: {
            Bearer: verifyToken
        }
    };
    swaggerTools.configure(options);
    swaggerTools.initialize(swaggerDoc, app, function() {
        cb();
    });
};
