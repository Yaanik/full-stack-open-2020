import patients from '../../data/patients';

import {
    Entry,
    HealthCheckEntry,
    HospitalEntry,
    NewEntry,
    NewPatient,
    NonSensitivePatient,
    OccupationalHealthcareEntry,
    Patient
} from "../types";

const getPatients = () : Patient[] => {
    return patients;
}

const getNonSensitivePatientData = () : Array<NonSensitivePatient> => {
    return patients.map(({id, name, dateOfBirth, occupation,gender,}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const getPatientById = (id: string) : Patient | undefined => {

    // return patients.find(p => p.id === id);
    const patient = patients.find(p => p.id === id);
    // @ts-ignore sa
    if(patient.entries == null && patient !== 'undefined'){
        return {...patient, entries: []} as Patient
    }
    return patient;
};

const addEntry = (entry: NewEntry, id: string) : Entry  => {
    const newEntry = {
        ...entry,
        id: 'id'
    }

    patients.map(p => (p.id === id ? p.entries.push(<HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry>newEntry) : p))
    console.log('New entry added => ', newEntry)
    return <HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry>newEntry;
}

const addPatient = (patient: NewPatient) : Patient =>{
    const newPatient = {
        ...patient,
        id: 'id'
    };

    console.log('New patient added => ', newPatient)
    patients.push(newPatient);
    return newPatient;
};

export default {
    getPatients,
    addPatient,
    getNonSensitivePatientData,
    getPatientById,
    addEntry
};