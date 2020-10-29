import React from "react";
import axios from "axios";
import { Button } from "semantic-ui-react";
import {Gender, Patient} from "../types";

import {Icon} from "semantic-ui-react";
import {useParams} from "react-router-dom";
import {setPatient, useStateValue, addEntry} from "../state";
import {apiBaseUrl} from "../constants";
import Entries from "../components/Entries";
import {EntryFromValues} from "../AddPatientModal/AddEntryForm";
import AddHealthCheckEntryForm from "../AddEntryModal/AddHealthCheckEntryForm";

const PatientFullInfo: React.FC = () => {
    const [{patients,}, dispatch] = useStateValue();
    const {id} = useParams<{id: string}>();
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);

    const openModal = (): void => {
        console.log('Open modal');
        setModalOpen(true);
    };

    const closeModal = (): void => {
        console.log('Close modal');
        setModalOpen(false);
    };

    React.useEffect(() => {
        const fetchPatient = async () => {
            try{
                if(!Object.values(patients).some(patient => patient.id === id)){
                    const {data: patientFromApi} = await axios.get<Patient>(
                        `${apiBaseUrl}/patients/${id}`
                    );
                    // dispatch({type: "SET_PATIENT", payload: patientFromApi});
                    dispatch(setPatient(patientFromApi));
                    console.log('fetching the patient');
                }
            } catch (e){
                console.log('Error fetching a patient => ', e);
            }
        };
        fetchPatient();
    }, [dispatch]);

    const submitNewEntry = async (values: EntryFromValues) => {
        try{
            const {data : newEntry } = await axios.post<Patient>(
                `${apiBaseUrl}/patients/${id}/entries`,
                values
            );
            dispatch(addEntry(newEntry));
            closeModal();
        } catch (e) {
            console.error(e.response.data);

        }
    };

    const patient: Patient | undefined = Object.values(patients).find(patient => patient.id === id);

    const selectGenderIcon = (gender: Gender): JSX.Element => {
        switch(gender){
            case Gender.Female:
                return <Icon name="female"/>;
            case Gender.Male:
                return <Icon name="male" />;
            case Gender.Other:
                return <Icon name="other gender" />;
            default:
                return <Icon name="genderless" />;
        }
    };

    if(!patient){
        console.log('Loading patient?');
        return <div>Fetching patient...</div>;
    }
    console.log(modalOpen);
    return (
        <div className="App">
            {modalOpen && <AddHealthCheckEntryForm
                onSubmit={submitNewEntry}
                onCancel={closeModal}
            />}
            <Button onClick={() => openModal()}>Add new entry</Button>
            <h1>{patient?.name} {selectGenderIcon(patient.gender)}</h1>
            <p>ssn: {patient.ssn}</p>
            <p>Occupation: {patient?.occupation}</p>
            <p>Date of birth: {patient?.dateOfBirth}</p>
            <Entries entries={patient.entries} />
        </div>
    );
};

export default PatientFullInfo;
