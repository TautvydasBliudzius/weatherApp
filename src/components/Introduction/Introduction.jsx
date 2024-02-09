import React from 'react';
import './Introduction.css'; // Import the CSS file for styling

const Introduction = () => {
    return (
        <div className="introductionContainer">
            <h2 className="introductionTitle">Welcome to Weather App!</h2>
            <div className="introductionContent">
                <p>
                    Weather app allows you to explore weather data including temperature, humidity, wind speed, and visibility for any selected location and time range around the world.
                </p>
                <p>
                    <h3>To get started</h3>
                    <h4>Select options</h4>
                    Navigate to the navbar where you can select the weather options you'd like to see on the charts. You can choose from temperature, humidity, wind speed, and visibility. Feel free to select multiple options to view them together on the charts.
                </p>
                <p>
                    <h4>Select date range</h4>
                    Next, select your desired date range. Keep in mind that the date cannot be earlier than 3 months from the current day or later than 15 days from the current day.
                </p>
                <p>
                    <h4>Choose a location</h4>
                    To choose a location, simply double click on the map with your left mouse button. This will set the location for which you want to view the weather data. To remove a marker, simply click on it and then press the remove button. You can also remove all markers at once by clicking the button below the map.
                </p>
                <p>
                    <h4>Enjoy results</h4>
                    Once you've made your selections, scroll to the bottom of the page to view the charts displaying the weather data for your chosen location and time range.
                </p>
            </div>
        </div>
    );
}

export default Introduction;
