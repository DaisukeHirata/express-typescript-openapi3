import { Request, Response } from "express";
import * as P from "bluebird";
import { TDebug } from "../log";

const debug = new TDebug("app:src:controllers:HelloWorld");

export async function getHelloWorld(req: Request, res: Response): P<any> {
    const greeting = req.swagger.params.greeting.value;
    debug.log("params: ", greeting);
    res.send({"msg": "hello " + greeting});
}

export async function postGoodMorning(req: Request, res: Response): P<any> {
    const body = req.body;
    debug.log("body: ", body);
    res.send(body);
}
