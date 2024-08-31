type ExperienceType = "work" | "education";

export interface Experience {
    id?: string;
    role: string;
    place: string;
    description?: string;
    startDate: string; // iso string
    endDate?: string; // iso string
    type: ExperienceType;
}