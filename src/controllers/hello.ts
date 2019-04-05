import { Request, Response } from "express";
import * as P from "bluebird";
import { TDebug } from "../log";

const debug = new TDebug("app:src:controllers:getHelloWorld");

export async function getHelloWorld(req: Request, res: Response): P<any> {
    const greeting = req.swagger.params && req.swagger.params.postId.value ? req.swagger.params.postId.value : "World";
    debug.log("Greeting: ", greeting);
    res.send({"msg": "hello " + greeting});
}
