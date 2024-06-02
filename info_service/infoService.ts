import express from "express";
import experienceRoutes from "./src/routes/experienceRouter";
import {
    requestLogger,
    routingErrorHandling,
} from "./src/utilities/middleware";
import type { Result } from "./src/models/result";
import { ERROR_MESSAGES } from "./src/utilities/errorMessages";
import projectRoutes from "./src/routes/projectRouter";

const PORT = process.env.PORT;
const app = express();

// middleware
app.use(express.json());
app.use(requestLogger);
app.use(routingErrorHandling);

// routes
app.use("/experience", experienceRoutes);
app.use("/project", projectRoutes);

// fallback
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.all("/*", (req, res, _next) => {
    const errorMessage = ERROR_MESSAGES.invalidMethodOrUrl(req);
    console.error(errorMessage);
    res.send({
        success: false,
        message: errorMessage,
    } satisfies Result);
});

// start
app.listen(PORT, () => {
    console.log("Server started.");
});
