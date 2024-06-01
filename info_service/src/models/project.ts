import type { FieldValue, Timestamp } from "firebase/firestore/lite";
import joi from "joi";

export interface Project {
    id?: string;
    title: string;
    description?: string;
    images: string[];
    projectDeployedUrl?: string;
    projectRepositoryUrl?: string;
    startDate: string; // iso string
    endDate?: string; // iso string
}

export const ProjectSchema = joi.object({
    id: joi.string(),
    title: joi.string().required(),
    description: joi.string(),
    images: joi.array<string>().required(),
    projectDeployedUrl: joi.string().uri(),
    projectRepositoryUrl: joi.string().uri(),
    startDate: joi.string().isoDate().required(),
    endDate: joi.string().isoDate(),
});

export interface ProjectFirestore {
    title: string;
    description?: FieldValue | string;
    images: string[];
    projectDeployedUrl?: FieldValue | string;
    projectRepositoryUrl?: FieldValue | string;
    startDate: Timestamp;
    endDate?: FieldValue | Timestamp;
}
