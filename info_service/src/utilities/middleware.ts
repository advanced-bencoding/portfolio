import type { NextFunction, Request, Response } from "express";
import type { Result } from "../models/result";
import { LOGGING_HELPER } from "../services/logging";

export const routingErrorHandling = (
    err: any,
    _req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction
) => {
    console.error(err.stack);
    res.send({
        success: false,
        message: err.message,
    } satisfies Result);
};

export const requestLogger = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(LOGGING_HELPER.logRequest(req, "START"));

    next();

    res.once("finish", () => {
        console.log(LOGGING_HELPER.logRequest(req, "END"));
    });
};
