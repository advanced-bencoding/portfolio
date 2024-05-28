export const LOGGING_HELPER = {
    entryLog: (fileName: string, methodName: string) =>
        `Executing ${methodName} in ${fileName}.`,
    exitLog: (fileName: string, methodName: string) =>
        `Finished executing ${methodName} in ${fileName}.`,
    errorLog: (fileName: string, methodName: string, errorMessage?: string) =>
        `Error occured ehile executing ${methodName} in ${fileName}${errorMessage !== undefined ? `: ${errorMessage}` : ''}.`,
};
