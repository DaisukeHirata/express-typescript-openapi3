import * as sourceMapSupport from "source-map-support";
import * as shelljs from "shelljs";

sourceMapSupport.install();

exports.migrate = async (event) => {

  const result = shelljs.exec("./dist/node_modules/db-migrate/bin/db-migrate up --config ./db-spec/database.json -e lambda");

  if (result.code !== 0) {
    return {
      statusCode: 500,
      body: result.stderr
    };
  }

  return {
    statusCode: 200,
    body: result.stdout
  };
};
