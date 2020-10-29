import React from 'react';
import {Course} from "../types";

const Total: React.FC<{courses: Course[]}> = ({courses}) => {
    const total = courses.reduce((acc, cur) => acc + cur.exerciseCount, 0)

    return (
        <h2>Total number of exercises: {total}</h2>
);
}

export default Total