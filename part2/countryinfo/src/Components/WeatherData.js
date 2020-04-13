import React from "react";

const WeatherData = ({weather}) => {
    if(weather.length !== 0) {
        return (
            <div>
                <h2>Weather in {weather.location.name}</h2>
                <p>Temperature: {weather.current.temperature}</p>
                <p><img src={weather.current.weather_icons} alt={weather.current.description}/></p>
                <p>Wind: {weather.current.wind_speed} m/s from {weather.current.wind_dir}</p>
            </div>
        )
    }else{
        return(
            <div>
                Loading data....
            </div>
        )
    }
}

export default WeatherData