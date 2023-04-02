import React, {useEffect, useState} from "react";
import ReactWeather, { useOpenWeather } from 'react-open-weather';
import Styles from './styles.module.scss'
import axios from "axios";

const Weather = () => {
    const [cord, setCord] = useState({lat: '48.137154', lon: '11.576124'});
    const [city, setCity] = useState('');


    const getData = async()=>{
        axios.defaults.withCredentials = true;
        const res = await axios.get('https://geolocation-db.com/json/')
        setCity(res.data.city)
    }

    useEffect(()=>{
        getData();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position)=>{
                setCord({
                    lat: String(position.coords.latitude),
                    lon: String(position.coords.longitude)
                })
            }, ()=>{});
        }
    },[])

    const { data, isLoading, errorMessage } = useOpenWeather({
        key: 'a17b9ed6b2864587b949636e3c950dcc',
        lat: cord.lat,
        lon: cord.lon,
        lang: 'en',
        unit: 'metric', // values are (metric, standard, imperial)
    });
    return (
        <section className={`${Styles.container}`}>
            <ReactWeather
                isLoading={isLoading}
                errorMessage={errorMessage}
                data={data}
                lang="en"
                locationLabel={city}
                unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
                showForecast
            />
        </section>
    );
};

export default Weather;