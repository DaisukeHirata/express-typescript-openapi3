// require("elastic-apm-node").start({
//   serviceName: "movies-service",   // Override service name from package.json
//   serverUrl: "http://apm:8200" // Set custom APM Server URL
// });

import * as sourceMapSupport from "source-map-support";
import { createServer, proxy } from "aws-serverless-express";
import { eventContext } from "aws-serverless-express/middleware";
import { Context } from "aws-lambda";
import { initApp } from "./application";
import { myContainer } from "./inversify/inversify.config";

// NOTE: If you get ERR_CONTENT_DECODING_FAILED in your browser, this is likely
// due to a compressed response (e.g. gzip) which has not been handled correctly
// by aws-serverless-express and/or API Gateway. Add the necessary MIME types to
// binaryMimeTypes below, then redeploy (`npm run package-deploy`)
const binaryMimeTypes: string[] = [
  // 'application/javascript',
  // 'application/json',
  // 'application/octet-stream',
  // 'application/xml',
  // 'font/eot',
  // 'font/opentype',
  // 'font/otf',
  // 'image/jpeg',
  // 'image/png',
  // 'image/svg+xml',
  // 'text/comma-separated-values',
  // 'text/css',
  // 'text/html',
  // 'text/javascript',
  // 'text/plain',
  // 'text/text',
  // 'text/xml',
];

sourceMapSupport.install();
const app = initApp(myContainer);
app.use(eventContext);
const server = createServer(app, undefined, binaryMimeTypes);

// export const http = (event: any, context: Context, callback: any) => {
//   context.callbackWaitsForEmptyEventLoop = false;
//   proxy(server, event, context, "CALLBACK", callback);
// };

export const http = (event: any, context: Context, callback: any) => proxy(server, event, context);
