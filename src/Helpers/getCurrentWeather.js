const API_URL = "https://api.openweathermap.org/data/2.5/weather/?q=";
const API_KEY = "&appid=d81031c463250d3d6528262b0da13632";
const API_UNIT = "&units=metric";

const getCurrentWeather = (cityName) => {
    return `${API_URL}${cityName.toLowerCase()}${API_KEY}${API_UNIT}`;
}

export default getCurrentWeather;