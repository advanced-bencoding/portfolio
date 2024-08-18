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