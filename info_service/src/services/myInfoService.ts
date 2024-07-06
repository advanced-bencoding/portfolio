import type { MyInfo } from "../models/myInfo";
import type { Result } from "../models/result";
import fs from "fs/promises";
import { LOGGING_HELPER } from "./logging";

const fileName = "experienceService.ts";

export interface IMyInfoService {
    getMyInfo: () => Promise<Result>;
    saveMyInfo: (myInfo: MyInfo) => Promise<Result>;
}

const checkIfFileExists = async (): Promise<boolean> => {
    try {
        const file = await fs.open(process.env.MY_INFO_PATH as string);
        await file.close();
        return true;
    } catch (_) {
        // await fs.writeFile(process.env.MY_INFO_PATH as string, JSON.stringify({}, null, 2))
        return false;
    }
};

export class MyInfoService implements IMyInfoService {
    async getMyInfo(): Promise<Result> {
        const methodName = "getExperience";
        console.log(LOGGING_HELPER.entryLog(fileName, methodName));
        try {
            const fileExists = await checkIfFileExists();
            // read from existing file
            if (fileExists) {
                const data = await fs.readFile(
                    process.env.MY_INFO_PATH as string,
                    "utf-8"
                );
                return {
                    success: true,
                    data: JSON.parse(data),
                };
            }
            // send a default object and expect new file to be saved in save hit
            else {
                return {
                    success: true,
                    data: {
                        firstName: "",
                        lastName: "",
                        address: "",
                        dateOfBirth: "",
                        mobileNumber: "",
                        urls: [],
                    } satisfies MyInfo,
                };
            }
        } catch (error: any) {
            console.error(
                LOGGING_HELPER.errorLog(fileName, methodName, error.message)
            );
            return {
                success: false,
                message: error.message,
            };
        } finally {
            console.log(LOGGING_HELPER.exitLog(fileName, methodName));
        }
    }

    async saveMyInfo(myInfo: MyInfo): Promise<Result> {
        const methodName = "saveMyInfo";
        console.log(LOGGING_HELPER.entryLog(fileName, methodName));
        try {
            await fs.writeFile(
                process.env.MY_INFO_PATH as string,
                JSON.stringify(myInfo, null, 2)
            );
            return {
                success: true,
            };
        } catch (error: any) {
            console.error(
                LOGGING_HELPER.errorLog(fileName, methodName, error.message)
            );
            return {
                success: false,
                message: error.message,
            };
        } finally {
            console.log(LOGGING_HELPER.exitLog(fileName, methodName));
        }
    }
}
