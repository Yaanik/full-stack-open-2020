import React, {useState} from 'react';
import FullCountry from "./FullCountry";

const ShowCountry = ({country}) => {
    const [showFull, setShowFull] = useState(false);

    const handleShow = () =>{
        setShowFull(!showFull)
    };

    return(
        <li>
            {country.name}
            <button onClick={handleShow}>Show</button>
            {showFull && <FullCountry country={country} />}
        </li>
)};

export default ShowCountry
