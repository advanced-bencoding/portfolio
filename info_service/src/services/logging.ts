import type { Request } from "express";

export const LOGGING_HELPER = {
    entryLog: (fileName: string, methodName: string) =>
        `[${new Date().toISOString()}] Executing ${methodName} in ${fileName}.`,
    exitLog: (fileName: string, methodName: string) =>
        `[${new Date().toISOString()}] Finished executing ${methodName} in ${fileName}.`,
    errorLog: (fileName: string, methodName: string, errorMessage?: string) =>
        `[${new Date().toISOString()}] Error occured while executing ${methodName} in ${fileName}${errorMessage !== undefined ? `: ${errorMessage}` : ""}`,
    requestObjectLog: (object: any) =>
        `[${new Date().toISOString()}] Object recieved in request: ${JSON.stringify(object)}`,
    logRequest: (req: Request, logTime: "START" | "END") =>
        `[${new Date().toISOString()}] ${logTime}: ${req.method} ${req.originalUrl}`,
};
