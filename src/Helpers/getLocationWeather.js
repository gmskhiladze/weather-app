const API_URL = "https://api.openweathermap.org/data/2.5/weather?";
const API_KEY = "&appid=d81031c463250d3d6528262b0da13632";
const API_UNIT = "&units=metric";

const getLocationWeather = (crd) => {
    return `${API_URL}lat=${crd.latitude}&lon=${crd.longitude}${API_KEY}${API_UNIT}`;
}

export default getLocationWeather;