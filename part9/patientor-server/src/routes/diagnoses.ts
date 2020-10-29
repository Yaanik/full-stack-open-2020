import express from 'express'
import diagnosisService from "../services/diagnosisService";

const router = express.Router();

router.get('/', (_req, res) => {
    // res.send('Fetching all diagnoses!');
    res.status(200).send(diagnosisService.getDiagnoses())
});

router.get('/:code', (req, res) => {
    console.log('Fetching diagnosis =>', req.params.code)
    const diagnosis = diagnosisService.getDiagnoseByCode(req.params.code);
    if(diagnosis){
        res.status(200).send(diagnosis);
    } else {
        res.sendStatus(400);
    }
})

router.post('/', (_req, res) => {
    res.send('Saving a diary!');
});

export default router;