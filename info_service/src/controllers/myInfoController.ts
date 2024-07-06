import type { MyInfo } from "../models/myInfo";
import { MyInfoSchema } from "../models/myInfo";
import { LOGGING_HELPER } from "../services/logging";
import type { IMyInfoService } from "../services/myInfoService";

const fileName = "myInfoController.ts";

export class MyInfoController {
    private myinfoService: IMyInfoService;

    constructor(myInfoService: IMyInfoService) {
        this.myinfoService = myInfoService;
    }

    async getMyInfo() {
        const methodName = "getMyInfo";
        console.log(LOGGING_HELPER.entryLog(fileName, methodName));

        const myInfoData = await this.myinfoService.getMyInfo();

        console.log(LOGGING_HELPER.exitLog(fileName, methodName));
        return myInfoData;
    }

    async saveMyInfo(myInfo: MyInfo) {
        const methodName = "saveMyInfo";
        console.log(LOGGING_HELPER.entryLog(fileName, methodName));
        try {
            const validationResult = MyInfoSchema.validate(myInfo, {
                abortEarly: false,
            });

            if (validationResult.error !== undefined) {
                throw new Error(
                    validationResult.error.details
                        .map((detail) => detail.message)
                        .join(", ")
                );
            }
        } catch (error: any) {
            console.error(
                LOGGING_HELPER.errorLog(fileName, methodName, error.message)
            );
            console.log(LOGGING_HELPER.requestObjectLog(myInfo));
            return {
                success: false,
                message: error.message,
            };
        } finally {
            console.log(LOGGING_HELPER.exitLog(fileName, methodName));
        }
    }
}
