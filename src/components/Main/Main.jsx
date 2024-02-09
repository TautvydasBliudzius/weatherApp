import { useEffect, useState } from 'react';
import MapComponent from '../Map/MapComponent';
import { format } from 'date-fns';
import WeatherChart from '../WeatherChart/WeatherChart';
import './Main.css';

const Main = ({ selectedMoreOptions, dateRange }) => {
    const [positions, setPositions] = useState([]);
    const [chartOptions, setChartOptions] = useState([]);

    useEffect(() => {
        console.log(chartOptions)
        if (positions.length > 0 && dateRange && selectedMoreOptions.length > 0) {
            getWeather();
        }
    }, [positions, dateRange, selectedMoreOptions]);
    

    const getWeather = () => {
        Promise.all(positions.map((position) => {
            const { lat, lng } = position || { lat: '', lng: '' };
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,visibility&start_date=${format(dateRange[0].startDate, "yyyy-MM-dd")}&end_date=${format(dateRange[0].endDate, "yyyy-MM-dd")}`;
    
            return fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    const newSeries = selectedMoreOptions.map((option) => {
                        switch (option) {
                            case 'Temperatura':
                                return {
                                    name: 'Temperature',
                                    data: data.hourly.temperature_2m
                                };
                            case 'Drėgmė':
                                return {
                                    name: 'Humidity',
                                    data: data.hourly.relative_humidity_2m
                                };
                            case 'Vėjo greitis':
                                return {
                                    name: 'Wind speed',
                                    data: data.hourly.wind_speed_10m
                                };
                            case 'Matomumas':
                                return {
                                    name: 'Visibility',
                                    data: data.hourly.visibility
                                };
                            default:
                                return null;
                        }
                    }).filter(Boolean);
    
                    return {
                        title: {
                            text: `Chart: ${lat}, ${lng}`
                        },
                        series: newSeries
                    };
                })
                .catch((error) => {
                    console.error('Error fetching weather data:', error);
                    return null;
                });
        })).then((results) => {
            setChartOptions(results.filter((result) => result !== null));
        });
    };

    function removeMarkerToClick() {
        setPositions([]);
        setChartOptions([]);
    }

    return (
        <div className="mainContainer">
            <MapComponent positions={positions} setPositions={setPositions} />
            {positions.length > 0 && selectedMoreOptions.length > 0 && (
                <div>
                    <button onClick={removeMarkerToClick}>Remove all markers</button>
                </div>
            )}
            {(positions.length > 0 && selectedMoreOptions.length > 0) && (
                positions.map((position, index) => (
                    <div key={index}>
                        <WeatherChart options={chartOptions[index]} />
                    </div>
                ))
            )}
        </div>
    );
};

export default Main;
