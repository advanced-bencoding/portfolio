import type { Project, ProjectFirestore } from "../models/project";
import type { Result } from "../models/result";
import { LOGGING_HELPER } from "./logging";
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
import { ERROR_MESSAGES } from "../utilities/errorMessages";

export interface IProjectService {
    getProject: (id?: string) => Promise<Result>;
    saveProject: (project: Project) => Promise<Result>;
    deleteProject: (projectId: string) => Promise<Result>;
}

const fileName = "projectService.ts";
export class ProjectService implements IProjectService {
    async getProject(id?: string | undefined): Promise<Result> {
        const methodName = "getProject";
        try {
            console.log(LOGGING_HELPER.entryLog(fileName, methodName));
            // if id was specified
            if (id) {
                const docRef = doc(
                    db,
                    FIREBASE_CONSTANTS.PROJECT_COLLECTION,
                    id
                );
                const snapshot = await getDoc(docRef);

                if (!snapshot.exists()) {
                    throw new Error(ERROR_MESSAGES.inexistentDocument(id));
                }

                return {
                    success: true,
                    data: [
                        mapProjectFireStoreToProjectModel(
                            snapshot.data() as ProjectFirestore,
                            id
                        ),
                    ],
                };
            }
            // else get all projects
            const projects = await getDocs(
                collection(db, FIREBASE_CONSTANTS.PROJECT_COLLECTION)
            );
            const experienceData: Project[] = [];

            if (!projects.empty) {
                projects.forEach((doc) => {
                    const data = doc.data();
                    experienceData.push(
                        mapProjectFireStoreToProjectModel(
                            data as ProjectFirestore,
                            doc.id
                        )
                    );
                });
            }

            return {
                success: true,
                data: experienceData,
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

    async saveProject(project: Project) {
        const methodName = "saveProject";
        try {
            console.log(LOGGING_HELPER.entryLog(fileName, methodName));
            const mappedProject = mapProjectToProjectFirestore(project);
            const projectCollection = collection(
                db,
                FIREBASE_CONSTANTS.PROJECT_COLLECTION
            );

            // update case
            if (project.id) {
                const docToUpdate = doc(
                    db,
                    FIREBASE_CONSTANTS.PROJECT_COLLECTION,
                    project.id
                );

                // check for existence
                const docSnapshot = await getDoc(docToUpdate);
                if (!docSnapshot.exists()) {
                    throw new Error(
                        ERROR_MESSAGES.inexistentDocument(project.id)
                    );
                }

                await updateDoc(
                    doc(db, FIREBASE_CONSTANTS.PROJECT_COLLECTION, project.id),
                    mappedProject as Record<string, any>
                );
            }
            // insert case
            else {
                await addDoc(projectCollection, mappedProject);
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

    async deleteProject(projectId: string) {
        const methodName = "deleteProject";
        try {
            console.log(LOGGING_HELPER.entryLog(fileName, methodName));
            const docToDelete = doc(
                db,
                FIREBASE_CONSTANTS.PROJECT_COLLECTION,
                projectId
            );

            // check for existence
            const docSnapshot = await getDoc(docToDelete);
            if (!docSnapshot.exists()) {
                throw new Error(ERROR_MESSAGES.inexistentDocument(projectId));
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

const mapProjectFireStoreToProjectModel = (
    project: ProjectFirestore,
    id: string
): Project => {
    return {
        id,
        title: project.title,
        description: project.description as string,
        images: project.images,
        projectDeployedUrl: project.projectDeployedUrl as string,
        projectRepositoryUrl: project.projectRepositoryUrl as string,
        startDate: project.startDate.toDate().toISOString(),
        endDate: (project.endDate as Timestamp)?.toDate().toISOString(),
    };
};

const mapProjectToProjectFirestore = (project: Project): ProjectFirestore => {
    const mappedObject: ProjectFirestore = {
        title: project.title,
        images: project.images,
        startDate: Timestamp.fromDate(new Date(project.startDate)),
    };

    if (project.description) {
        mappedObject.description = project.description;
    } else if (project.id) {
        mappedObject.description = deleteField();
    }

    if (project.projectDeployedUrl) {
        mappedObject.projectDeployedUrl = project.projectDeployedUrl;
    } else if (project.id) {
        mappedObject.projectDeployedUrl = deleteField();
    }

    if (project.projectRepositoryUrl) {
        mappedObject.projectRepositoryUrl = project.projectRepositoryUrl;
    } else if (project.id) {
        mappedObject.projectRepositoryUrl = deleteField();
    }

    if (project.endDate) {
        mappedObject.endDate = Timestamp.fromDate(new Date(project.endDate));
    } else if (project.id) {
        mappedObject.endDate = deleteField();
    }

    return mappedObject;
};
