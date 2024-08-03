import type { Experience, ExperienceFirestore } from "../models/experience";
import type { Result } from "../models/result";
import {
    Timestamp,
    addDoc,
    collection,
    deleteDoc,
    deleteField,
    doc,
    getDoc,
    getDocs,
    updateDoc,
} from "firebase/firestore/lite";
import db from "./firebaseInit";
import { FIREBASE_CONSTANTS } from "./constants";
import { LOGGING_HELPER } from "./logging";
import { ERROR_MESSAGES } from "../utilities/errorMessages";

const fileName = "experienceService.ts";

export interface IExperienceService {
    getExperience: () => Promise<Result<Experience[]>>;
    saveExperience: (experience: Experience) => Promise<Result<undefined>>;
    deleteExperience: (experienceId: string) => Promise<Result<undefined>>;
}

export class ExperienceService implements IExperienceService {
    async getExperience(): Promise<Result<Experience[]>> {
        const methodName = "getExperience";
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
                    });
                });
            }

            experienceData.sort((a: Experience, b: Experience) =>
                a.startDate < b.startDate ? 1 : -1
            );

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

    async saveExperience(experience: Experience): Promise<Result<undefined>> {
        const methodName = "saveExperience";
        console.log(LOGGING_HELPER.entryLog(fileName, methodName));
        try {
            const mappedExperience =
                mapExperienceToExperienceFirestore(experience);
            const experienceCollection = collection(
                db,
                FIREBASE_CONSTANTS.EXPERIENCE_COLLECTION
            );

            // update case
            if (experience.id) {
                const docToUpdate = doc(
                    db,
                    FIREBASE_CONSTANTS.EXPERIENCE_COLLECTION,
                    experience.id
                );

                // check for existence
                const docSnapshot = await getDoc(docToUpdate);
                if (!docSnapshot.exists()) {
                    throw new Error(
                        ERROR_MESSAGES.inexistentDocument(experience.id)
                    );
                }

                await updateDoc(
                    doc(
                        db,
                        FIREBASE_CONSTANTS.EXPERIENCE_COLLECTION,
                        experience.id
                    ),
                    mappedExperience as Record<string, any>
                );
            }
            // insert case
            else {
                await addDoc(experienceCollection, mappedExperience);
            }

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
    async deleteExperience(experienceId: string): Promise<Result<undefined>> {
        const methodName = "deleteExperience";
        console.log(LOGGING_HELPER.entryLog(fileName, methodName));
        try {
            const docToDelete = doc(
                db,
                FIREBASE_CONSTANTS.EXPERIENCE_COLLECTION,
                experienceId
            );

            // check for existence
            const docSnapshot = await getDoc(docToDelete);
            if (!docSnapshot.exists()) {
                throw new Error(
                    ERROR_MESSAGES.inexistentDocument(experienceId)
                );
            }

            await deleteDoc(docToDelete);
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
    } else if (experience.id) {
        mappedObject.description = deleteField();
    }

    if (experience.endDate) {
        mappedObject.endDate = Timestamp.fromDate(new Date(experience.endDate));
    } else if (experience.id) {
        mappedObject.endDate = deleteField();
    }

    return mappedObject;
};

export default ExperienceService;
