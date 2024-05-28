import { LOGGING_HELPER } from '../constants';
import type { Result } from '../models/result';
import type { IExperienceService } from '../services/experienceService';

const fileName = 'experienceController.ts';

class ExperienceController {
    private experienceService: IExperienceService;

    constructor(experienceService: IExperienceService) {
        this.experienceService = experienceService;
    }

    async getExperience(): Promise<Result> {
        const methodName = 'getExperience';
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
}

export default ExperienceController;
