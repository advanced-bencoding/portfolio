import type { Experience, ExperienceFirestore } from '../models/experience';
import type { Result } from '../models/result';
import {
    Timestamp,
    addDoc,
    collection,
    getDocs,
} from 'firebase/firestore/lite';
import db from './firebaseInit';
import { FIREBASE_CONSTANTS } from './constants';
import { LOGGING_HELPER } from '../constants';

const fileName = 'experienceService.ts';

export interface IExperienceService {
    getExperience: () => Promise<Result>;
    saveExperience: (experience: Experience) => Promise<Result>;
    deleteExperience: (experience: Experience) => Promise<Result>;
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
                        id: doc.id,
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

    async saveExperience(experience: Experience): Promise<Result> {
        const methodName = 'saveExperience';
        console.log(LOGGING_HELPER.entryLog(fileName, methodName));
        try {
            const mappedExperience =
                mapExperienceToExperienceFirestore(experience);
            const experienceCollection = collection(
                db,
                FIREBASE_CONSTANTS.EXPERIENCE_COLLECTION
            );

            await addDoc(experienceCollection, mappedExperience);

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
    async deleteExperience(experience: Experience): Promise<Result> {
        return {
            success: true,
        };
    }
}

const mapExperienceToExperienceFirestore = (
    experience: Experience
): ExperienceFirestore => {
    const mappedObject: ExperienceFirestore = {
        place: experience.place,
        role: experience.role,
        type: experience.type,
        startDate: Timestamp.fromDate(new Date(experience.startDate)),
    };

    if (experience.description) {
        mappedObject.description = experience.description;
    }

    if (experience.endDate) {
        mappedObject.endDate = Timestamp.fromDate(new Date(experience.endDate));
    }

    return mappedObject;
};

export default ExperienceService;
