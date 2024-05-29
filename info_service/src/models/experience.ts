import type { Timestamp } from "firebase/firestore/lite";
import type { ExperienceType } from "./enum";

export interface Experience {
    id?: string;
    role: string;
    place: string;
    description?: string;
    startDate: string; // iso string
    endDate?: string; // iso string
    type: ExperienceType;
}

export interface ExperienceFirestore {
    role: string;
    place: string;
    description?: string;
    startDate: Timestamp;
    endDate?: Timestamp;
    type: number;
}
