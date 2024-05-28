import express from 'express';
import ExperienceService from '../services/experienceService';
import ExperienceController from '../controllers/experienceController';

const experienceRoutes = express.Router();
const experienceController = new ExperienceController(new ExperienceService());

experienceRoutes.get('/', async (req, res) => {
    const experienceResult = await experienceController.getExperience();
    res.send(experienceResult);
});

export default experienceRoutes;