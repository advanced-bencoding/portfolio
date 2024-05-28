import { Experience } from "../models/experience";
import { Result } from "../models/result";
import { Firestore, collection, getDocs } from "firebase/firestore/lite";
import db from "./firebaseInit";
import { FIREBASE_CONSTANTS } from "./constants";
import { LOGGING_HELPER } from "../globalConstants";

const fileName = "experienceService.ts";

export interface IExperienceService {
    getExperience: () => Promise<Result>;
    saveExperience: (experience: Experience) => any;
    deleteExperience: (experience: Experience) => any;
}

export class ExperienceService implements IExperienceService {
    async getExperience(): Promise<Result> {
        const methodName = "getExperience";
        console.log(LOGGING_HELPER.entryLog(fileName, methodName));
        try {
            const experience = await getDocs(collection(db, FIREBASE_CONSTANTS.EXPERIENCE_COLLECTION));
            const experienceData: Experience[] = [];

            if (!experience.empty) {
                experience.forEach((doc) => {
                    experienceData.push({
                        ...doc.data()
                    } as Experience)
                });
            }

            return {
                data: experienceData,
                success: true
            }
        } catch(error: any) {
            console.error(LOGGING_HELPER.errorLog(fileName, methodName, error.message));
            return {
                success: false,
                message: error.message
            }
        } finally {
            console.log(LOGGING_HELPER.exitLog(fileName, methodName));
        }
    }
    async saveExperience(experience: Experience) {

    }
    async deleteExperience(experience: Experience) {

    }
}

export default ExperienceService;