import { initApp } from "./application";
import { myContainer } from "./inversify/inversify.config";
import log from "./log";

const serverPort = process.env.TEMPLATE_SERVICE_NODEJS_PORT || 8001;
const app = initApp(myContainer);

app.listen(serverPort, () => {
  return log.info(`server is listening on ${serverPort}`);
});
