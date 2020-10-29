import express from 'express';
import cors from "cors";
//Routers
import diagnoseRouter from './routes/diagnoses';
import patientRouter from './routes/patients';

const app = express();
app.use(cors())
const PORT = 3001;

app.use(express.json());

app.use('/api/diagnoses', diagnoseRouter)
app.use('/api/patients', patientRouter)

app.get('/api/ping', (_req, res) => {
    res.status(200).send('pong');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});