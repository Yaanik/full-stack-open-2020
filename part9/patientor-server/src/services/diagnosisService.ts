import diagnoses from '../../data/diagnoses'

import {Diagnosis} from "../types";

// const diagnoses: Array<Diagnose> = diagnoseData as Array<Diagnose>

const getDiagnoses = () : Diagnosis[] => {
    console.log('Fetching diagnoses')
    return diagnoses;
};

const getDiagnoseByCode = (code: string): Diagnosis => {
    const diagnosis = diagnoses.find(d => d.code === code)
    return <Diagnosis>diagnosis;
};

const addDiagnose = () => {
    return null;
};

export default {
    getDiagnoseByCode,
    getDiagnoses,
    addDiagnose
};