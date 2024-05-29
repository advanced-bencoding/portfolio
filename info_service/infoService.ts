import express from 'express';
import experienceRoutes from './src/routes/experienceRouter';
import { routingErrorHandling } from './src/utilities/middleware';
import type { Result } from './src/models/result';

const PORT = process.env.PORT;
const app = express();

// middleware
app.use(express.json());
app.use(routingErrorHandling);

// routes
app.use('/experience', experienceRoutes);

app.get('/', (_req, res) => {
    res.send('Hello World');
});

// fallback
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.all('/*', (req, res, _next) => {
    res.send({
        success: false,
        message: `Invalid action or URL: '${req.method}' for '${req.url}'.`,
    } satisfies Result);
});

// start
app.listen(PORT, () => {
    console.log('Server started.');
});
