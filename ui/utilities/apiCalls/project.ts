import { Project } from "next/dist/build/swc";
import { Result } from "../../types/result";
import { apiBasePath } from "./constants";
import { fetchWrapper } from "./fetchWrapper";

const projectPath = "project";

export const getProject = async (): Promise<Result<Project>> => {
    const url = `${apiBasePath}${projectPath}`;
    const response = await fetchWrapper(url, "GET");
    const getResponse: Result<Project> = await response.json();
    return getResponse;
}

export const saveExperience = async (requestBody: Project): Promise<Result<undefined>> => {
    const url = `${apiBasePath}${projectPath}`;
    const response = await fetchWrapper(url, "POST", requestBody);
    const saveResponse: Result<undefined> = await response.json();
    return saveResponse;
}

export const deleteExperience = async (experienceId: string): Promise<Result<undefined>> => {
    const url = `${apiBasePath}${projectPath}/${experienceId}`;
    const response = await fetchWrapper(url, "DELETE");
    const deleteResponse: Result<undefined> = await response.json();
    return deleteResponse;
}