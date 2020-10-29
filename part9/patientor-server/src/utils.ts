import {
    NewPatient,
    Gender,
    HospitalEntry,
    HealthCheckEntry,
    OccupationalHealthcareEntry,
    HealthCheckRating,
} from "./types";

export const toNewEntry = (object: any) : Omit<HospitalEntry, "id"> | Omit<OccupationalHealthcareEntry, "id"> | Omit<HealthCheckEntry, "id"> => {
    switch(object.type){
        case "HealthCheck":
            console.log('healthcheck')
            return toNewHealthcheckEntry(object)
        case "OccupationalHealthcare":
            console.log('occ')
            return toNewOccupationalHealthcareEntry(object)
        case "Hospital":
            console.log('hosp')
            return toNewHospitalEntry(object)
        default:
            throw new Error('Incorrect or missing input: ' + object)
    }
}

export const toNewHealthcheckEntry = (object: any): Omit<HealthCheckEntry, 'id'>  => {
    return{
        type: "HealthCheck",
        date: parseDate(object.date),
        description: parseString(object.description),
        diagnosisCodes: parseCodes(object.diagnosisCodes),
        healthCheckRating: parseHealthcheckRating(object.healthCheckRating),
        specialist: parseString(object.specialist),
    }
};

export const toNewOccupationalHealthcareEntry = (object: any): Omit<OccupationalHealthcareEntry, 'id'> => {
    return {
        type: "OccupationalHealthcare",
        date: parseDate(object.date),
        description: parseDescription(object.description),
        diagnosisCodes: parseCodes(object.diagnosisCodes),
        employerName: parseDescription(object.employerName),
        sickLeave: parseSickLeave(object.sickLeave),
        specialist: parseDescription(object.specialist),
    }
};

export const toNewHospitalEntry = (object: any): Omit<HospitalEntry, 'id'> =>{
    return {
        type: "Hospital",
        date: parseDate(object.date),
        description: parseDescription(object.description),
        diagnosisCodes: parseCodes(object.diagnosisCodes),
        discharge: parseDischarge(object.discharge),
        specialist: parseDescription(object.specialist),
    }
};

export const toNewPatient = (object: any): NewPatient => {
    return {
        dateOfBirth: parseDate(object.dateOfBirth),
        gender: parseGender(object.gender),
        name: parseString(object.name),
        occupation: parseString(object.occupation),
        ssn: parseString(object.ssn),
        entries: object.entries
    };
};

const parseCodes = (codes: any) : string[] | undefined => {
    if(!codes){
        return undefined;
    }
    return codes;
};

const parseSickLeave = (sickLeave: any) : {startDate: string, endDate: string | undefined} | undefined => {
    if(!sickLeave){
        return undefined
    }
    if(!sickLeave.startDate){
        throw new Error('SICKLEAVE: Incorrect or missing comment: ' + sickLeave)
    }
    return sickLeave;
}

const parseDischarge = (discharge: any) : {date: string, criteria: string} | undefined => {
    if(!discharge){
        return undefined
    }
    if (!discharge.date || !isDate(discharge.date) || !discharge.criteria || !isString(discharge.criteria)){
        throw new Error('DISCHARGE: Incorrect or missing comment: ' + discharge)
    }
    return discharge;
};

const parseDescription = (desc: any): string => {
    console.log('Desc => ', desc)
    console.log(isString(desc))
    if(!desc || !isString(desc)){
        throw new Error('DESCRIPTION: Incorrect or missing input: ' + desc)
    }
    return desc;
}

const parseString = (text: any): string => {
    if(!text || !isString(text)){
        throw new Error('STRING: Incorrect or missing input: ' + text)
    }
    return text;
}

const parseDate = (date: any): string => {
    if(!date || !isString(date) || !isDate(date)) {
        throw new Error('DATE: Incorrect or missing date: ' + date)
    }
    return date;
}

const parseHealthcheckRating = (rating: any) : HealthCheckRating => {
    if(!rating || !isHealthcheckRating(rating)){
        throw new Error('RATING: Incorrect or missing comment: ' + rating)
    }
    return rating;
};

const parseGender = (gender: any) : Gender => {
    if(!gender! || !isGender(gender)){
        throw new Error('GENDER: Incorrect or missing gender: ' + gender);
    }
    return gender;
}

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
}

const isHealthcheckRating = (rating: any): rating is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(rating);
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
}

const isGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender)
}
