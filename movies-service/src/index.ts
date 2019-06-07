require("elastic-apm-node").start({
  serviceName: "movies-service",   // Override service name from package.json
  serverUrl: "http://apm:8200" // Set custom APM Server URL
});

import { initApp } from "./application";
import { myContainer } from "./inversify/inversify.config";
import log from "./log";

const serverPort = process.env.MOVIE_SERVICE_NODEJS_PORT || 8001;
const app = initApp(myContainer);

app.listen(serverPort, () => {
  return log.info(`server is listening on ${serverPort}`);
});
