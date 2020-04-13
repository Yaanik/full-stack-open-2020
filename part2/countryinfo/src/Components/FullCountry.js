import React from 'react'
import ShowWeather from "./ShowWeather";

const FullCountry = ({country}) => {
    return(
        <div>
            <h1>{country.name}</h1>
            <div>Capital: {country.capital}</div>
            <div>Population: {country.population} people</div>
            <h2>Languages</h2>
            <ul>
                {country.languages.map((lang, i) =>
                <li key={i}>
                    {lang.name}
                </li>)}
            </ul>
            <div>
                <h2>Flag</h2>
                <img src={country.flag} alt={country.name} width='200px'/>
            </div>
            <div>
                <ShowWeather country={country}/>
            </div>
        </div>
    )
};

export default FullCountry