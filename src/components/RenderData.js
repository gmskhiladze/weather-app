import React from 'react';
import './RenderData.scss'

function RenderData(currentCity) {

    const date = new Date().toLocaleDateString();
    const city = currentCity.current.response.data;

    return (
        <>
            <div className={"weather-container"}>
                <div className={"weather"}>
                    <img src={`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`} alt=""/>
                    <div className={"weather-info"}>
                        <p>{Math.floor(city.main.temp)} <span>°</span></p>
                        <div className={"location"}>
                            <p>{city.name}</p>
                            <p>{date}</p>
                        </div>
                    </div>
                </div>

                <div className={"details"}>
                    <span>Wind: {city.wind.speed}</span>
                    <span>Humidity: {city.main.humidity}</span>
                    <span>Pressure: {city.main.pressure}</span>
                </div>
            </div>
        </>
    );
}

export default RenderData;