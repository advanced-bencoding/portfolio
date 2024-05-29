import express from 'express';
import ExperienceService from '../services/experienceService';
import ExperienceController from '../controllers/experienceController';

const experienceRoutes = express.Router();
const experienceController = new ExperienceController(new ExperienceService());

experienceRoutes.get('/', async (req, res) => {
    const experienceResult = await experienceController.getExperience();
    res.send(experienceResult);
});

experienceRoutes.post('/', async (req, res) => {
    const saveExperienceResult = await experienceController.saveExperience({
        id: req.body.id,
        place: req.body.place,
        role: req.body.role,
        description: req.body.description,
        type: req.body.type,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
    });
    res.send(saveExperienceResult);
});

experienceRoutes.delete('/:experienceId', async (req, res) => {
    const deleteExperienceResult = await experienceController.deleteExperience(
        req.params.experienceId
    );
    res.send(deleteExperienceResult);
});

export default experienceRoutes;
