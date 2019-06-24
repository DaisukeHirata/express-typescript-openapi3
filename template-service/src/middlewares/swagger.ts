import * as express from "express";
import swaggerTools = require("oas-tools");
import { Swagger20Request } from "oas-tools";
import { readFileSync } from "fs";
import * as YAML from "js-yaml";

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

export const initSwaggerMiddlware = function (app: express.Express, basePath: string, cb: any) {
    const swaggerDoc = loadDocumentSync(basePath + "/definition/openapi.yml");
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
        }
    };
    swaggerTools.configure(options);
    swaggerTools.initialize(swaggerDoc, app, function() {
        cb();
    });
};
