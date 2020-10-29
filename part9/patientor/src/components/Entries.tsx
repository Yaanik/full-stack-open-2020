import React from "react";
import {Entry} from "../types";
import EntryDetails from "./EntryDetails";

const Entries: React.FC<({entries: Entry[] | undefined})> = ({entries}) => {
    if(entries?.length === 0) {
        return (
            <div>
                <h1>Entries</h1>
                <p>No entries found</p>
            </div>
        );
    }

    return(
        <div>
            <h2>Entries</h2>
            {entries?.map(entry => (
                <EntryDetails entry={entry} key={entry.id}/>
            ))}
        </div>
    );
};

export default Entries;