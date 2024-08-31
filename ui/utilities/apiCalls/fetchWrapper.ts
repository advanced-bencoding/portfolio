import { Result } from "../../types/result"

export const fetchWrapper = (url: string, method: "GET" | "POST" | "DELETE", requestBody?: any): Promise<Response> => {
    return fetch(url, {
        method,
        body: requestBody ? JSON.stringify(requestBody) : undefined,
        cache: 'no-cache'
    })
}

export const getErrorResponse = (error: any): Result<undefined> => ({ success: false, message: error.message });