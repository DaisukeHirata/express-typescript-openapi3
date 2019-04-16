import * as spdy from "spdy";
import { initApp } from "./application";
import { myContainer } from "./inversify/inversify.config";
import log from "./log";
import { ssl } from "../configuration/ssl";

const serverPort = process.env.OPENSHIFT_NODEJS_PORT || 443;
const app = initApp(myContainer);

// app.listen(serverPort, (err) => {
//   if (err) {
//     return log.error(err);
//   }

//   return log.info(`server is listening on ${serverPort}`);
// });

spdy.createServer(ssl, app).listen(serverPort, (err) => {
  if (err) {
    return log.error(err);
  }
  return log.info(`server is listening on ${serverPort}`);
});
