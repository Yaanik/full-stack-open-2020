import express from 'express'
import patientService from "../services/patientService";
import {toNewEntry, toNewPatient} from "../utils";

const router = express.Router();

router.get('/', (_req, res) => {
    console.log('fetching patients');
    const patientsData = patientService.getPatients();
    res.status(200).send(patientsData);
});

router.get('/:id', (req, res) => {
    console.log('fetching patient with id: ', req.params.id);
    const patient = patientService.getPatientById(req.params.id);
    if(patient){
        res.status(200).send(patient);
    } else {
        res.sendStatus(400);
    }
})

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);

        const addedPatient = patientService.addPatient(newPatient);
        res.status(200).json(addedPatient);
    } catch (e) {
        res.status(400).send(e.message)
    }
});

router.post('/:id/entries', (req, res) => {
    console.log('Adding entry')
    try{
        const newEntry = toNewEntry(req.body)
        const addedEntry = patientService.addEntry(newEntry, req.params.id)

        res.status(200).json(addedEntry)
    } catch (e) {
        res.status(400).send(e.message)
    }
});

export default router;