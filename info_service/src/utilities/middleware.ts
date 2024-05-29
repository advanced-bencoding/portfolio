import type { NextFunction, Request, Response } from 'express';
import type { Result } from '../models/result';

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
