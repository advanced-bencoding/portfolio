import { Experience } from "@/app/types/experience";
import { Result } from "../../types/result";
import { apiBasePath } from "./constants";
import { fetchWrapper } from "./fetchWrapper";

const experiencePath = "experience";

export const getExperience = async (): Promise<Result<Experience>> => {
    const url = `${apiBasePath}${experiencePath}`;
    const response = await fetchWrapper(url, "GET");
    const getResponse: Result<Experience> = await response.json();
    return getResponse;
}

export const saveExperience = async (requestBody: Experience): Promise<Result<undefined>> => {
    const url = `${apiBasePath}${experiencePath}`;
    const response = await fetchWrapper(url, "POST", requestBody);
    const saveResponse: Result<undefined> = await response.json();
    return saveResponse;
}

export const deleteExperience = async (experienceId: string): Promise<Result<undefined>> => {
    const url = `${apiBasePath}${experiencePath}/${experienceId}`;
    const response = await fetchWrapper(url, "DELETE");
    const deleteResponse: Result<undefined> = await response.json();
    return deleteResponse;
}
