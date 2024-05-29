import type { Request } from "express";

export const ERROR_MESSAGES = {
    mandatoryField: (field: string): string => `${field} is mandatory.`,
    invalidDate: (field: string): string =>
        `Given date in ${field} is invalid.`,
    enumMismatch: (field: string, options: string[]): string =>
        `Invalid ${field} given. Given value must be from: '${options.join(", ")}'.`,
    inexistentDocument: (documentId: string): string =>
        `Document with id: '${documentId}' does not exist.`,
    invalidMethodOrUrl: (req: Request) =>
        `Invalid action or URL: '${req.method}' for '${req.protocol + "://" + req.get("host") + req.originalUrl}'.`,
};
