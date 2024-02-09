import { useEffect, useState } from 'react';
import MapComponent from '../Map/MapComponent';
import { format } from 'date-fns';
import WeatherChart from '../WeatherChart/WeatherChart';
import './Main.css';

const Main = ({ selectedMoreOptions, dateRange }) => {
    const [positions, setPositions] = useState([]);
    const [chartOptions, setChartOptions] = useState([]);
    const [isValidDateRange, setIsValidDateRange] = useState(true)

    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 15);

    const minDate = new Date();
    minDate.setMonth(minDate.getMonth() - 3);

    useEffect(() => {
        if (dateRange[0].startDate < minDate || dateRange[0].endDate > maxDate) {
            setIsValidDateRange(false);
        } else {
            setIsValidDateRange(true);
            if (positions.length > 0 && dateRange && selectedMoreOptions.length > 0) {
                getWeather();
            }
        }
    }, [positions, dateRange, selectedMoreOptions]);


    const getWeather = async () => {
        Promise.all(positions.map(async (position) => {
            const { lat, lng } = position || { lat: '', lng: '' };
            const positionName = await getPositionName(lat, lng);
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,visibility&start_date=${format(dateRange[0].startDate, "yyyy-MM-dd")}&end_date=${format(dateRange[0].endDate, "yyyy-MM-dd")}`;

            return fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    const newSeries = selectedMoreOptions.map((option) => {
                        switch (option) {
                            case 'Temperature':
                                return {
                                    name: 'Temperature',
                                    data: data.hourly.temperature_2m
                                };
                            case 'Humidity':
                                return {
                                    name: 'Humidity',
                                    data: data.hourly.relative_humidity_2m
                                };
                            case 'Wind speed':
                                return {
                                    name: 'Wind speed',
                                    data: data.hourly.wind_speed_10m
                                };
                            case 'Visibility':
                                return {
                                    name: 'Visibility',
                                    data: data.hourly.visibility
                                };
                            default:
                                return null;
                        }
                    }).filter(Boolean);
                    return {
                        accessibility: {
                            enabled: false
                        },
                        title: {
                            text: `Chart: ${positionName}`
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

    const getPositionName = async (lat, lng) => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);
            const data = await response.json();
            if (data.address) {
                const city = data.address.city || data.address.town || data.address.village || data.address.hamlet || data.address.suburb || data.address.locality;
                return city || data.address.state || data.address.country;
            }
            return 'Unknown Position';
        } catch (error) {
            console.error('Error fetching position name:', error);
            return 'Unknown Position';
        }
    };


    function removeMarkerToClick() {
        setPositions([]);
        setChartOptions([]);
    }

    return (
        <div className="mainContainer">
            <MapComponent positions={positions} setPositions={setPositions} />
            {positions.length === 1 && (
                <div>
                    <button onClick={removeMarkerToClick}>Remove marker</button>
                </div>
            )}
            {positions.length > 1 && (
                <div>
                    <button onClick={removeMarkerToClick}>Remove all markers</button>
                </div>
            )}
            {isValidDateRange &&
                <>
                    {(positions.length > 0 && chartOptions.length === positions.length) && (
                        positions.map((position, index) => (
                            <div key={index}>
                                <WeatherChart options={chartOptions[index]} />
                            </div>
                        ))
                    )}
                </>
            }
        </div>
    );
};

export default Main;
