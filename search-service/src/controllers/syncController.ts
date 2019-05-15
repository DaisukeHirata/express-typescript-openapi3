import { Request, Response } from "express";
import * as P from "bluebird";
import { TDebug } from "../log";

const debug = new TDebug("app:src:controllers:goodbyeWorldPost");

export async function postGoodbyeWorld(req: Request, res: Response): P<any> {
    const postId = req.swagger.params.postId && req.swagger.params.postId.value ? req.swagger.params.postId.value : "World";
    debug.log("postId: ", postId);
    res.send({"msg": "goodbye " + postId});
}
