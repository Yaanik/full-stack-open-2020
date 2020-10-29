import React from 'react';
import {CoursePart} from "../types";
import Part from "./Part";

const Content: React.FC<{courses: CoursePart[]}> = ({courses}) => {

        return(
            <div>
                {courses.map(course => {
                    return <Part coursePart={course}/>
                })}
            </div>
        )
}

export default Content