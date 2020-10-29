import React from 'react';
import {CoursePart} from "../types";


const Part: React.FC<{coursePart: CoursePart}> = ({coursePart}) => {
    const assertNever = (value: never) : never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        )
    }

    switch(coursePart.name){
        case 'Fundamentals': {
            return (
                <div>
                    <h3>{coursePart.name}</h3>
                    <p>{coursePart.description}</p>
                    <p>{coursePart.exerciseCount}</p>
                </div>
            )
        }
        case 'Using props to pass data': {
            return (
                <div>
                    <h3>{coursePart.name}</h3>
                    <p>{coursePart.exerciseCount}</p>
                    <p>{coursePart.groupProjectCount}</p>
                </div>
            )
        }
        case 'Deeper type usage': {
            return (
                <div>
                    <h3>{coursePart.name}</h3>
                    <p>{coursePart.description}</p>
                    <p>{coursePart.exerciseCount}</p>
                    <p>{coursePart.exerciseSubmissionLink}</p>
                </div>
            )
        }
        default:
            return assertNever(coursePart)
    }
}

export default Part