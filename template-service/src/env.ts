exports.get = get;
exports.set = set;

const configs = {
  local: {
    LOG_LEVEL: "silly",
    CORS: "*",
  },
  development: {
    LOG_LEVEL: "silly",
    CORS: "*",
  },
  staging: {
    LOG_LEVEL: "silly",
    CORS: "*",
  },
  production : {
    LOG_LEVEL: "silly",
    CORS: "*",
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
