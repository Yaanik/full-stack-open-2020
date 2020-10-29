import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import {TextField,  DiagnosisSelection, NumberField,} from "./FormField";
import {HealthCheckEntry, } from "../types";
import {useStateValue} from "../state";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type EntryFromValues = Omit<HealthCheckEntry, "id" | "entries">;

interface Props {
    onSubmit: (values: EntryFromValues) => void;
    onCancel: () => void;
}

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [{diagnoses}] = useStateValue();

    return (
        <Formik
            initialValues={{
                type: "HealthCheck",
                description: "",
                specialist: "",
                date: new Date().toISOString(),
                healthCheckRating: 0
            }}
            onSubmit={onSubmit}
            // validate={values => {
            //     const requiredError = "Field is required";
            //     const errors: { [field: string]: string } = {};
            //     if (!values.name) {
            //         errors.name = requiredError;
            //     }
            //     if (!values.ssn) {
            //         errors.ssn = requiredError;
            //     }
            //     if (!values.dateOfBirth) {
            //         errors.dateOfBirth = requiredError;
            //     }
            //     if (!values.occupation) {
            //         errors.occupation = requiredError;
            //     }
            //     return errors;
            // }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">

                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="Specialist"
                            placeholder="Specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <Field
                            label="Occupation"
                            placeholder="Occupation"
                            name="occupation"
                            component={TextField}
                        />
                        <DiagnosisSelection
                            diagnoses={Object.values(diagnoses)}
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                        />
                        <Field
                            label="healthCheckRating"
                            name="healthCheckRating"
                            component={NumberField}
                            min={0}
                            max={3}
                        />
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button type="button" onClick={onCancel} color="red">
                                    Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    type="submit"
                                    floated="right"
                                    color="green"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddEntryForm;
