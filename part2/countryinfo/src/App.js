import React, {useEffect, useState} from 'react';
import axios from 'axios'

//Custom components
import CountryList from "./Components/CountryList";

function App() {
   const [countries, setCountries] = useState([]);
   const [filter, setFilter] = useState('');

    useEffect(() =>{
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response =>{
                setCountries(response.data)
            })
    }, []);

   const filterCountries = (event) =>{
       setFilter(event.target.value)
   };

   //Filter
   function filterCountry(objArr, filter){
       return objArr.filter(obj => obj.name.toLowerCase().includes(filter.toLowerCase()))}

   return(
    <div>
        <div>
            Look for a country:
            <input value={filter}
                   onChange={filterCountries}
            />
        </div>
        <CountryList countries={filterCountry(countries, filter)}/>
    </div>
    )
}

export default App;


/*
* 2.12 -- DONE
* 2.13 -- DONE
* 2.14 -- DONE
* */