import type { Project } from "../models/project";
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

        try {
            const projectData = await this.projectService.getProject(projectId);
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

    async saveProject(project: Project) {
        const methodName = "saveProject";
        console.log(LOGGING_HELPER.entryLog(fileName, methodName));

        try {
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

        try {
            const projectData =
                await this.projectService.deleteProject(projectId);
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
}

export default ProjectController;
