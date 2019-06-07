import { initApp } from "./application";
import { myContainer } from "./inversify/inversify.config";
import log from "./log";

const serverPort = process.env.MOVIE_SERVICE_NODEJS_PORT || 8001;
const app = initApp(myContainer);

app.listen(serverPort, () => {
  log.info(`server is listening on ${serverPort}`);
});
