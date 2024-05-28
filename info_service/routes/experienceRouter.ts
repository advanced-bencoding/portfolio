import express from 'express';
import ExperienceController from '../controllers/experienceController';
import ExperienceService from '../services/experienceService';

const experienceRoutes = express.Router();
const experienceController = new ExperienceController(new ExperienceService());

experienceRoutes.get('/', async (req, res) => {
    const experienceResult = await experienceController.getExperience();
    res.send(experienceResult);
});

export default experienceRoutes;