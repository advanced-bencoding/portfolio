import express from "express";
import { MyInfoController } from "../controllers/myInfoController";
import { MyInfoService } from "../services/myInfoService";
import type { UrlInfo } from "../models/myInfo";

export const myInfoRoutes = express.Router();
const myInfoController = new MyInfoController(new MyInfoService());

myInfoRoutes.get("/", async (req, res) => {
    const myInfoResult = await myInfoController.getMyInfo();
    res.send(myInfoResult);
});

myInfoRoutes.post("/", async (req, res) => {
    const myInfoResult = await myInfoController.saveMyInfo({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        dateOfBirth: req.body.dateOfBirth,
        mobileNumber: req.body.mobileNumber,
        summary: req.body.summary,
        urls: req.body.urls.map(
            (item: any) =>
                ({
                    label: item.label,
                    url: item.url,
                }) satisfies UrlInfo
        ),
        skills: req.body.skills,
        hobbies: req.body.hobbies
    });
    res.send(myInfoResult);
});
