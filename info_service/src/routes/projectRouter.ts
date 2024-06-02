import express from "express";
import ProjectController from "../controllers/projectController";
import { ProjectService } from "../services/projectService";

const projectRoutes = express.Router();
const projectController = new ProjectController(new ProjectService());

projectRoutes
    .get("/", async (_req, res) => {
        const projectResponse = await projectController.getProject();
        res.send(projectResponse);
    })
    .get("/:projectId", async (req, res) => {
        const projectResponse = await projectController.getProject(
            req.params.projectId
        );
        return res.send(projectResponse);
    });

projectRoutes.post("/", async (req, res) => {
    const projectResponse = await projectController.saveProject({
        id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        images: req.body.images,
        projectDeployedUrl: req.body.projectDeployedUrl,
        projectRepositoryUrl: req.body.projectRepositoryUrl,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
    });
    return res.send(projectResponse);
});

projectRoutes.delete("/:projectId", async (req, res) => {
    const projectResponse = await projectController.deleteProject(
        req.params.projectId
    );
    res.send(projectResponse);
});

export default projectRoutes;
