import { MyInfo } from "../../types/myInfo";
import { Result } from "../../types/result";
import { apiBasePath } from "../../constants/constants";
import { hitApiEndpoint } from "./hitApiEndpoint";

export const getMyInfo = async (): Promise<Result<MyInfo | undefined>> => {
    const url = `${apiBasePath}myInfo`;
    const response = await hitApiEndpoint(url, "GET");
    const getData: Result<MyInfo> = await response.json();
    return getData;
}