exports.get = get;
exports.set = set;

const configs = {
  local: {
    LOG_LEVEL: "silly",
    CORS: "*",
    COGNITO_REGION: "ap-southeast-1",
    COGNITO_USER_POOL_ID: "local",
    COGNITO_CLIENT_ID: "local",
    DATABASE_HOST: "db",
    DATABASE: "cinema_catalog",
    DATABASE_USER: "foo", // can be stored in environment variable
    DATABASE_PASSWORD: "bar", // can be stored in environment variable
    MOVIES_SERVICE_HOST: "http://movies-service:8001",
    SEARCH_SERVICE_HOST: "http://search-service:8001"
  },
  development: {
    LOG_LEVEL: "silly",
    CORS: "*",
    COGNITO_REGION: "ap-southeast-1",
    COGNITO_USER_POOL_ID: "local",
    COGNITO_CLIENT_ID: "local",
    DATABASE_HOST: "db",
    DATABASE: "cinema_catalog",
    DATABASE_USER: "foo", // can be stored in environment variable
    DATABASE_PASSWORD: "bar", // can be stored in environment variable
    MOVIES_SERVICE_HOST: "http://movies-service:8001",
    SEARCH_SERVICE_HOST: "http://search-service:8001"
  },
  staging: {
    LOG_LEVEL: "silly",
    CORS: "*",
    COGNITO_REGION: "ap-southeast-1",
    COGNITO_USER_POOL_ID: "local",
    COGNITO_CLIENT_ID: "local",
    DATABASE_HOST: "db",
    DATABASE: "cinema_catalog",
    DATABASE_USER: "foo", // can be stored in environment variable
    DATABASE_PASSWORD: "bar", // can be stored in environment variable
    MOVIES_SERVICE_HOST: "http://movies-service:8001",
    SEARCH_SERVICE_HOST: "http://search-service:8001"
  },
  production : {
    LOG_LEVEL: "silly",
    CORS: "*",
    COGNITO_REGION: "ap-southeast-1",
    COGNITO_USER_POOL_ID: "local",
    COGNITO_CLIENT_ID: "local",
    DATABASE_HOST: "db",
    DATABASE: "cinema_catalog",
    DATABASE_USER: "foo", // can be stored in environment variable
    DATABASE_PASSWORD: "bar", // can be stored in environment variable
    MOVIES_SERVICE_HOST: "http://movies-service:8001",
    SEARCH_SERVICE_HOST: "http://search-service:8001"
  }
};

const config = typeof process.env.NODE_ENV !== "undefined" ? configs[process.env.NODE_ENV] : configs.local;

const dynamic = {

};

export function get(key) {
  return typeof dynamic[key] !== "undefined" ?
    dynamic[key] :
    typeof process.env[key] !== "undefined" ? process.env[key] : config[key];
}

export function set(key, val) {
  dynamic[key] = val;
}

export function checkEnv() {
  const log = require("./log").default;
  for (const key in config) {
    if (process.env[key] === undefined) {
      log.warn(`Env var ${key} is not set. Default will be used: ${config[key]}`);
    }
  }
}
