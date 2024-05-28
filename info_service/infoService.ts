import express from 'express';
import experienceRoutes from './src/routes/experienceRouter';

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use('/experience', experienceRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log('Server started.');
});
