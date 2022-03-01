import React, {useCallback, useEffect, useState} from 'react';
import './App.scss';
import UserInputs from "./components/UserInputs";
import RenderData from "./components/RenderData";
import getCurrentWeather from "./Helpers/getCurrentWeather";
import getData from "./Helpers/getData";
import getHourlyWeather from "./Helpers/getHourlyWeather";
import RenderHourlyData from "./components/RenderHourlyData";
import getLocationWeather from "./Helpers/getLocationWeather";
import RenderLocationData from "./components/RenderLocationData";

function App() {

    const [error, setError] = useState(null);
    const [cityName, setCityName] = useState("");
    const [isReady, setIsReady] = useState(false);

    const [weather, setWeather] = useState({});
    const [hourlyWeather, setHourlyWeather] = useState({});
    const [weatherIsReady, setWeatherIsReady] = useState(false);

    const [locationWeather, setLocationWeather] = useState({});
    const [locationIsReady, setLocationIsReady] = useState(false);

    const currentLocation = () => {
        const options = {
            enableHighAccuracy: true,
            timeout: 3000,
            maximumAge: 0
        };

        const success = (pos) => {
            let crd = pos.coords;

            try {
                getData(getLocationWeather(crd)).then((response) => {
                    setLocationWeather((prevState) => {
                        return {
                            ...prevState,
                            response
                        }
                    });
                    setLocationIsReady(true);
                });
            } catch (error) {
                setError(error);
            }
        }

        const error = (err) => {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        navigator.geolocation.getCurrentPosition(success, error, options);
    }

    useEffect(() => {
        currentLocation();
    }, []);


    const searchCity = useCallback(async (cityName) => {
        setLocationWeather({});
        setLocationIsReady(false);
        setCityName(cityName);
        setIsReady(true);

        try {
            getData(getCurrentWeather(cityName)).then((response) => {
                setWeather((prevState) => {
                    return {
                        ...prevState,
                        response
                    }
                });
                setWeatherIsReady(true);
            });
        } catch (error) {
            setError(error);
        }


        setCityName("");
    }, [isReady, cityName]);

    useEffect(() => {
        if (locationIsReady){
            getData(getHourlyWeather({lat: locationWeather.response.data.coord.lat, lon: locationWeather.response.data.coord.lon})).then((response) => {
                setHourlyWeather((prevState) => {
                    return {
                        ...prevState,
                        response
                    }
                });
            });
            setWeatherIsReady(false);
        }

        if (weatherIsReady){
            getData(getHourlyWeather({lat: weather.response.data.coord.lat, lon: weather.response.data.coord.lon})).then((response) => {
                setHourlyWeather((prevState) => {
                    return {
                        ...prevState,
                        response
                    }
                });
            });
            setWeatherIsReady(false);
        }
    }, [weatherIsReady, locationIsReady]);


    return (
        <div className="App">
            <UserInputs searchCity={searchCity}/>
            { isReady && Object.keys(weather).length !== 0 && <RenderData current={weather} />}
            { locationIsReady && Object.keys(locationWeather).length !== 0 && <RenderLocationData locationData={locationWeather}/>}
            { Object.keys(weather).length !== 0 && Object.keys(hourlyWeather).length !== 0 && <RenderHourlyData hourly={hourlyWeather}/>}
            { Object.keys(locationWeather).length !== 0 && Object.keys(hourlyWeather).length !== 0 && <RenderHourlyData hourly={hourlyWeather}/>}
            { error != null && <p>Error: {error}</p>}
        </div>
    );
}

export default App;
