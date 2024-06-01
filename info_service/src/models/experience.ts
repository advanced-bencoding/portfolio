import type { FieldValue, Timestamp } from "firebase/firestore/lite";
import joi from "joi";
import { EXPERIENCE_TYPES, type ExperienceType } from "./types";

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
    startDate: joi.string().isoDate().required(),
    endDate: joi.string().isoDate(),
    type: joi.string().equal(EXPERIENCE_TYPES.WORK, EXPERIENCE_TYPES.EDUCATION),
});

export interface ExperienceFirestore {
    role: string;
    place: string;
    description?: FieldValue | string;
    startDate: Timestamp;
    endDate?: FieldValue | Timestamp;
    type: ExperienceType;
}
