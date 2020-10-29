import React from 'react';
import {Entry} from "../types";
import {useStateValue} from "../state";
import {Card, Icon} from "semantic-ui-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars

// const HospitalEntry: React.FC<({entry: Entry})> = ({entry}) => {

const OccupationalHealthcareEntry: React.FC<({entry: Entry})> = ({entry}) => {
    return(
        <Card fluid color='green'>
            <Card.Content>
                <Card.Header>{entry.date} by {entry.specialist}</Card.Header>
                <Card.Description>
                    {entry.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                Sick leave from {"employerName" in entry ? entry.employerName : null}:
                <p>{"sickLeave" in entry ? `FROM: ${entry.sickLeave?.startDate}` : null} </p>
                <p>{"sickLeave" in entry ? `TO: ${entry.sickLeave?.endDate}` : null} </p>
            </Card.Content>
        </Card>
    );
};

const HealthCheckEntry: React.FC<({entry: Entry})> = ({entry}) => {
    const healthCheckRating = (entry: Entry) => {
        if("healthCheckRating" in entry && entry.healthCheckRating){
            switch(entry.healthCheckRating){
                case 0:
                    return 'green';
                case 1:
                    return 'yellow';
                case 2:
                    return 'orange';
                case 3:
                    return "red";
                default:
                    return 'blue';
            }
        }
    };

    return(
        <Card fluid color='green'>
            <Card.Content>
                <Card.Header>{entry.date} by {entry.specialist}</Card.Header>
                <Card.Description>
                    {entry.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Icon name='heart' color={healthCheckRating(entry)} />
            </Card.Content>
        </Card>
    );
};

const HospitalEntry: React.FC<({entry: Entry})> = ({entry}) => {

    const [{diagnoses}] = useStateValue();

    const getDiagnosisDescription = (diagnosis: string) => {
        const diag = Object.values(diagnoses).find(d => d.code === diagnosis);
        if(diag !== undefined){
            return diag.name;
        }
    };

    return(
        <Card fluid color='green'>
            <Card.Content>
                <Card.Header>{entry.date} by {entry.specialist}</Card.Header>
                <Card.Description>
                    {entry.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                {
                    entry.diagnosisCodes?.map((diagnosis, i) => (
                        <ul key={i}>
                            {diagnosis} --- {getDiagnosisDescription(diagnosis)}
                        </ul>
                    ))}
            </Card.Content>
        </Card>
    );
};


// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const EntryDetails: React.FC<({entry: Entry})> = ({entry}) => {
    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };

    switch(entry.type) {
        case "Hospital":
            return <HospitalEntry entry={entry}/>;
        case "HealthCheck":
            return <HealthCheckEntry entry={entry} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntry entry={entry} />;
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;