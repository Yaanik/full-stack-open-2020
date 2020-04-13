import React from "react";
import Part from './Part';
import Total from './Total';

const Content = ({parts}) => {

    return(
        <div>
            <ul>
                {parts.map(part => <Part name={part.name} exercises={part.exercises} key={part.id}/>)}
            </ul>
            <div>
                <Total exercises={parts.map(part => part.exercises)} />
            </div>
        </div>
    )
};

export default Content