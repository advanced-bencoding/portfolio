import { MyInfo } from "../../types/myInfo";
import { Result } from "../../types/result";
import { apiBasePath } from "./constants";
import { fetchWrapper } from "./fetchWrapper";

const myInfoPath = "myinfo";

export const getMyInfo = async (): Promise<Result<MyInfo>> => {
    const url = `${apiBasePath}${myInfoPath}`;
    const response = await fetchWrapper(url, "GET");
    const getResponse: Result<MyInfo> = await response.json();
    return getResponse;
}

export const saveMyInfo = async (requestBody: MyInfo): Promise<Result<undefined>> => {
    const url = `${apiBasePath}${myInfoPath}`;
    const response = await fetchWrapper(url, "POST", requestBody);
    const saveResponse: Result<undefined> = await response.json();
    return saveResponse;
}