import React from "react";

const Part = (props) => {
    return (
            <li>
                <b>{props.name}</b> has {props.exercises} exercises
            </li>
    )
};

export default Part