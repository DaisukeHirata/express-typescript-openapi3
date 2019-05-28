import "reflect-metadata";
import * as P from "bluebird";
import { Container, injectable } from "inversify";
import { Moment } from "moment";
import { TYPES } from "../src/inversify/types";

const testContainer = new Container();

export { testContainer };
