import { ExperienceType } from "../models/enum";
import type { Experience } from "../models/experience";
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

    async getExperience(): Promise<Result> {
        const methodName = "getExperience";
        console.log(LOGGING_HELPER.entryLog(fileName, methodName));
        try {
            const experienceData = await this.experienceService.getExperience();
            return experienceData;
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

    async saveExperience(experience: Experience): Promise<Result> {
        const methodName = "saveExperience";
        console.log(LOGGING_HELPER.entryLog(fileName, methodName));
        try {
            // validate request object
            const validationString = experienceValidator(experience);
            if (validationString !== undefined) {
                throw new Error(validationString);
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

    async deleteExperience(experienceId: string): Promise<Result> {
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

const experienceValidator = (experience: Experience): string | undefined => {
    const errorMessages: string[] = [];
    if (VALIDATION_UTILITIES.isUndefinedOrEmpty(experience.place)) {
        errorMessages.push(ERROR_MESSAGES.mandatoryField("place"));
    }
    if (VALIDATION_UTILITIES.isUndefinedOrEmpty(experience.role)) {
        errorMessages.push(ERROR_MESSAGES.mandatoryField("role"));
    }
    if (
        experience.type === undefined ||
        experience.type === ExperienceType.UNDEFINED
    ) {
        errorMessages.push(
            ERROR_MESSAGES.enumMismatch("role", Object.keys(ExperienceType))
        );
    }
    if (VALIDATION_UTILITIES.isInvalidIsoString(experience.startDate)) {
        errorMessages.push(ERROR_MESSAGES.invalidDate("startDate"));
    }
    if (
        experience.endDate &&
        VALIDATION_UTILITIES.isInvalidIsoString(experience.endDate)
    ) {
        errorMessages.push(ERROR_MESSAGES.invalidDate("endDate"));
    }

    if (errorMessages.length === 0) return undefined;
    return errorMessages.join("\n");
};

export default ExperienceController;
