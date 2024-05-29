import type { FieldValue, Timestamp } from "firebase/firestore/lite";
import type { ExperienceType } from "./enum";
import joi from "joi";

export interface Experience {
    id?: string;
    role: string;
    place: string;
    description?: string;
    startDate: string; // iso string
    endDate?: string; // iso string
    type: ExperienceType;
}

export const ExperienceSchema = joi.object({
    id: joi.string(),
    role: joi.string().required(),
    place: joi.string().required(),
    description: joi.string(),
    startDate: joi.string().required(),
    endDate: joi.string(),
    type: joi.number().strict().integer().min(0).max(2),
});

export interface ExperienceFirestore {
    role: string;
    place: string;
    description?: FieldValue | string;
    startDate: Timestamp;
    endDate?: FieldValue | Timestamp;
    type: number;
}
