import { ExperienceSchema, type Experience } from "../models/experience";
import type { Result } from "../models/result";
import type { IExperienceService } from "../services/experienceService";
import { LOGGING_HELPER } from "../services/logging";
import { ERROR_MESSAGES } from "../utilities/errorMessages";
import { VALIDATION_UTILITIES } from "../utilities/validationUtilities";

const fileName = "experienceController.ts";

class ExperienceController {
    private experienceService: IExperienceService;

    constructor(experienceService: IExperienceService) {
        this.experienceService = experienceService;
    }

    async getExperience(): Promise<Result<Experience[]>> {
        const methodName = "getExperience";
        console.log(LOGGING_HELPER.entryLog(fileName, methodName));

        const experienceData = await this.experienceService.getExperience();

        console.log(LOGGING_HELPER.exitLog(fileName, methodName));
        return experienceData;
    }

    async saveExperience(experience: Experience): Promise<Result<undefined>> {
        const methodName = "saveExperience";
        console.log(LOGGING_HELPER.entryLog(fileName, methodName));
        try {
            // validate request object
            const validationResult = ExperienceSchema.validate(experience, {
                abortEarly: false,
            });

            if (validationResult.error !== undefined) {
                throw new Error(
                    validationResult.error.details
                        .map((detail) => detail.message)
                        .join(", ")
                );
            }

            // save to db
            const experienceData =
                await this.experienceService.saveExperience(experience);
            return experienceData;
        } catch (error: any) {
            console.error(
                LOGGING_HELPER.errorLog(fileName, methodName, error.message)
            );
            console.log(LOGGING_HELPER.requestObjectLog(experience));
            return {
                success: false,
                message: error.message,
            };
        } finally {
            console.log(LOGGING_HELPER.exitLog(fileName, methodName));
        }
    }

    async deleteExperience(experienceId: string): Promise<Result<undefined>> {
        const methodName = "deleteExperience";
        console.log(LOGGING_HELPER.entryLog(fileName, methodName));
        try {
            if (VALIDATION_UTILITIES.isUndefinedOrEmpty(experienceId)) {
                throw new Error(ERROR_MESSAGES.mandatoryField(experienceId));
            }

            const deleteResult =
                await this.experienceService.deleteExperience(experienceId);
            return deleteResult;
        } catch (error: any) {
            console.error(
                LOGGING_HELPER.errorLog(fileName, methodName, error.message)
            );
            console.log(LOGGING_HELPER.requestObjectLog(experienceId));
            return {
                success: false,
                message: error.message,
            };
        } finally {
            console.log(LOGGING_HELPER.exitLog(fileName, methodName));
        }
    }
}

export default ExperienceController;
