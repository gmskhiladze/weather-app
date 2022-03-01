const API_URL = "https://api.openweathermap.org/data/2.5/onecall?";
const API_KEY = "&appid=d81031c463250d3d6528262b0da13632";
const API_EXCLUDE = "&exclude=minutely,daily";
const API_UNIT = "&units=metric";

const getHourlyWeather = ({lat, lon}) => {
    return `${API_URL}lat=${lat}&lon=${lon}${API_EXCLUDE}${API_KEY}${API_UNIT}`;
}

export default getHourlyWeather;