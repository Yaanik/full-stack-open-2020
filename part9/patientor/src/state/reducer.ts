import {State} from "./state";
import {Diagnosis, Patient} from "../types";

export type Action =
    | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
}
    | {
    type: "ADD_PATIENT";
    payload: Patient;
}
    | {
    type: "SET_PATIENT";
    payload: Patient;
}
    | {
    type: "SET_DIAGNOSES_LIST";
    payload: Diagnosis[];
}
    | {
    type: "ADD_ENTRY";
    payload: Patient;
};


export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_PATIENT_LIST":
            return {
                ...state,
                patients: {
                    ...action.payload.reduce(
                        (memo, patient) => ({...memo, [patient.id]: patient}),
                        {}
                    ),
                    ...state.patients
                }
            };
        case "SET_DIAGNOSES_LIST":
            return {
                ...state,
                diagnoses: {
                    ...action.payload.reduce(
                        (memo, diagnosis) => ({...memo, [diagnosis.code]: diagnosis}),
                        {}
                    ),
                    ...state.diagnoses
                }
            };
        case "ADD_PATIENT":
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.payload.id]: action.payload
                }
            };
        case "ADD_ENTRY":
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.payload.id]: action.payload
                }
            };
        case "SET_PATIENT":
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.payload.id]: action.payload
                }
            };
        default:
            return state;
    }
};

export const setDiagnosesList = (diagnoses: Diagnosis[]): Action => {
    return {
        type: "SET_DIAGNOSES_LIST",
        payload: diagnoses
    };
};

export const setPatient = (patient: Patient): Action => {
    return {
        type:"SET_PATIENT",
        payload: patient
    };
};

export const setPatientList = (patients: Patient[]): Action => {
    return{
        type:"SET_PATIENT_LIST",
        payload: patients
    };
};

export const addEntry = (patient: Patient): Action => {
    return {
        type: "ADD_ENTRY",
        payload: patient
    };
};
export const addPatient = (patient: Patient): Action => {
    return {
        type: "ADD_PATIENT",
        payload: patient
    };
};