import { ExperienceType } from './enum';

export interface Experience {
    role: string;
    place: string;
    description?: string;
    startDate: string;
    endDate?: string;
    type: ExperienceType;
}
