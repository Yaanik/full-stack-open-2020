import React, {useEffect, useState} from 'react'
import axios from 'axios'
import WeatherData from "./WeatherData";



const ShowWeather = ({country}) => {
    const api_key = process.env.REACT_APP_WEATHER_API;
    const [weather, setWeather] = useState([]);

    useEffect(() =>{
        axios
            .get(`http://api.weatherstack.com/current?
            access_key=${api_key}&query=London`)
            .then(response =>{
                setWeather(response.data)
            })
    }, [country.capital, api_key]);

        return(
            <div>
                <WeatherData weather={weather} />
            </div>
        )
};

export default ShowWeather

