import React from 'react';
import "./RenderHourlyData.scss"

function RenderHourlyData(hourly) {

    const time = (dateString) => {
        return new Date(dateString*1e3).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }
    let items = hourly.hourly.response.data.hourly;

    return (
        <div className={"item-container"}>
            {items.map((el, i) => {
                return (
                    <div key={i} className={"items"}>
                        <span>{time(el.dt)}</span>
                        <img src={`http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`} alt="weather_icon"/>
                        <span>{Math.floor(el.temp)}</span>
                        <span>{el.weather[0].description}</span>
                    </div>
                )
            })}
        </div>
    );
}

export default RenderHourlyData;