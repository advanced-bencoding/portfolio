import type { Project } from "../models/project";
import type { Result } from "../models/result";

export interface IProjectService {
    getProject: (id?: string) => Promise<Result>;
    saveProject: (project: Project) => Promise<Result>;
    deleteProject: (projectId: string) => Promise<Result>;
}
