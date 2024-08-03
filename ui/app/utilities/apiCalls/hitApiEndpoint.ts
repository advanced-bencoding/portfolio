import { Result } from "../../types/result"

export const hitApiEndpoint = (url: string, method: "GET" | "POST" | "DELETE", requestBody?: any): Promise<Response> => {
    return fetch(url, {
        method,
        body: requestBody ? JSON.stringify(requestBody) : undefined
    })
}

export const getErrorResponse = (error: any): Result<undefined> => ({ success: false, message: error.message });
