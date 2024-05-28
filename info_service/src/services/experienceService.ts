import type { Experience } from '../models/experience';
import type { Result } from '../models/result';
import { collection, getDocs } from 'firebase/firestore/lite';
import db from './firebaseInit';
import { FIREBASE_CONSTANTS } from './constants';
import { LOGGING_HELPER } from '../constants';

const fileName = 'experienceService.ts';

export interface IExperienceService {
    getExperience: () => Promise<Result>;
    saveExperience: (experience: Experience) => any;
    deleteExperience: (experience: Experience) => any;
}

export class ExperienceService implements IExperienceService {
    async getExperience(): Promise<Result> {
        const methodName = 'getExperience';
        console.log(LOGGING_HELPER.entryLog(fileName, methodName));
        try {
            const experience = await getDocs(
                collection(db, FIREBASE_CONSTANTS.EXPERIENCE_COLLECTION)
            );
            const experienceData: Experience[] = [];

            if (!experience.empty) {
                experience.forEach((doc) => {
                    const data = doc.data();
                    experienceData.push({
                        place: data.place,
                        role: data.role,
                        description: data.description,
                        type: data.type,
                        startDate: data.startDate.toDate().toISOString(),
                        endDate: data.endDate?.toDate().toISOString(),
                    } as Experience);
                });
            }

            return {
                data: experienceData,
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
    async saveExperience(experience: Experience) {}
    async deleteExperience(experience: Experience) {}
}

export default ExperienceService;
