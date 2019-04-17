import { Request, Response } from "express";
import * as P from "bluebird";
import * as fs from "fs";
import { TDebug } from "../log";

const debug = new TDebug("app:src:controllers:UploadImage");

export async function postUploadImage(req: Request, res: Response): P<any> {
    const body = req.body;
    const file = req.swagger.params.uploadImage.files[0];
    debug.log("body: ", body);
    fs.writeFileSync("/tmp/" + body.file, file.buffer);
    res.send({"msg": "file uploaded"});
}
