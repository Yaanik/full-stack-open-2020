import React from 'react';
import FullCountry from './FullCountry';
import ShowCountry from './ShowCountry';

const CountryList = ({countries}) => {
    if(countries.length > 0 ){
        if (countries.length > 10) {
            return (
                <div>
                    <p>Too many matches, please be more specific</p>
                </div>
            )
        } else if (10 > countries.length  && countries.length > 1 ) {
            return (
                <div>
                    <ul>
                        {countries.map((country, i) =>
                            <ShowCountry key={i} country={country} />
                        )}
                    </ul>
                </div>
            )
        } else {
            return (
                <div>
                    <FullCountry country={countries[0]} />
                </div>
            )
        }
    }else{
        return null
    }
};

export default CountryList;