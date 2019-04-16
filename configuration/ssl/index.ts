import * as fs from "fs";

export const ssl = {
  key: fs.readFileSync(`${__dirname}/server.key`),
  cert: fs.readFileSync(`${__dirname}/server.crt`)
};
