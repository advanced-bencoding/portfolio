import type { Request } from 'express';

export const LOGGING_HELPER = {
    entryLog: (fileName: string, methodName: string) =>
        `[${new Date(Date.now()).toISOString()}] Executing ${methodName} in ${fileName}.`,
    exitLog: (fileName: string, methodName: string) =>
        `[${new Date(Date.now()).toISOString()}] Finished executing ${methodName} in ${fileName}.`,
    errorLog: (fileName: string, methodName: string, errorMessage?: string) =>
        `[${new Date(Date.now()).toISOString()}] Error occured while executing ${methodName} in ${fileName}${errorMessage !== undefined ? `: ${errorMessage}` : ''}`,
    requestObjectLog: (object: any) =>
        `[${new Date(Date.now()).toISOString()}] Object recieved in request: ${JSON.stringify(object)}`,
    logRequest: (req: Request, logTime: 'START' | 'END') =>
        `[${new Date(Date.now()).toISOString()}] ${logTime}: ${req.method} ${req.originalUrl}`,
};
