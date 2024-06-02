import { ProjectSchema, type Project } from "../models/project";
import { LOGGING_HELPER } from "../services/logging";
import type { IProjectService } from "../services/projectService";

const fileName = "projectController.ts";

class ProjectController {
    private projectService: IProjectService;
    constructor(projectService: IProjectService) {
        this.projectService = projectService;
    }

    async getProject(projectId?: string) {
        const methodName = "getProject";
        console.log(LOGGING_HELPER.entryLog(fileName, methodName));

        const projectData = await this.projectService.getProject(projectId);

        console.log(LOGGING_HELPER.exitLog(fileName, methodName));
        return projectData;
    }

    async saveProject(project: Project) {
        const methodName = "saveProject";
        console.log(LOGGING_HELPER.entryLog(fileName, methodName));

        try {
            // validate request object
            const validationResult = ProjectSchema.validate(project, {
                abortEarly: false,
            });

            if (validationResult.error !== undefined) {
                throw new Error(
                    validationResult.error.details
                        .map((detail) => detail.message)
                        .join(", ")
                );
            }
            const projectData = await this.projectService.saveProject(project);
            return projectData;
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
        console.log(LOGGING_HELPER.entryLog(fileName, methodName));

        const projectData = await this.projectService.deleteProject(projectId);

        console.log(LOGGING_HELPER.exitLog(fileName, methodName));
        return projectData;
    }
}

export default ProjectController;
