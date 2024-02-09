import React, { useState, useRef } from "react";
import temperatureIcon from "../../images/temperature-icon.png";
import humidityIcon from "../../images/humidity-icon.png";
import windIcon from "../../images/wind-icon.png";
import visibilityIcon from "../../images/visibility-icon.png"
import "./MoreFilter.css";

const MoreFilter = ({ selectedMoreOptions, setSelectedMoreOptions}) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const catMenu = useRef(null);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const closeOpenDropDown = (e) => {
    if (isDropdownVisible && !catMenu.current?.contains(e.target)) {
      setDropdownVisible(false);
    }
  };
  document.addEventListener("mousedown", closeOpenDropDown);

  const options = [
    {
      value: "Temperature",
      label: "Temperature",
      image: temperatureIcon,
    },
    {
      value: "Humidity",
      label: "Humidity",
      image: humidityIcon,
    },
    {
      value: "Wind speed",
      label: "Wind speed",
      image: windIcon,
    },
    {
      value: "Visibility",
      label: "Visibility",
      image: visibilityIcon
    }
  ];

  const handleOptionChange = (event) => {
    const optionValue = event.target.value;

    if (selectedMoreOptions.includes(optionValue)) {
      setSelectedMoreOptions(
        selectedMoreOptions.filter((value) => value !== optionValue)
      );
    } else {
      setSelectedMoreOptions([...selectedMoreOptions, optionValue]);
    }
  }


  return (
    <div className="dropdown" ref={catMenu}>
      <button onClick={toggleDropdown} className="dropbtn">
        <div>
          <div id="moreText">Select options</div>
          <div className="selectedOptions">
            {selectedMoreOptions.join(", ")}
          </div>
        </div>
        {selectedMoreOptions.length !== 0 && (
          <div className="closeBtn" onClick={() => setSelectedMoreOptions([])}>
            X
          </div>
        )}
        {selectedMoreOptions.length === 0 && !isDropdownVisible && (
          <div className="closeBtn" onClick={() => setSelectedMoreOptions([])}>
            <i className="arrowDown"></i>
          </div>
        )}
        {selectedMoreOptions.length === 0 && isDropdownVisible && (
          <div className="closeBtn" onClick={() => setSelectedMoreOptions([])}>
            <i className="arrowUp"></i>
          </div>
        )}
      </button>

      {isDropdownVisible && (
        <div className="ddMenu" >
          {options.map((option) => (
            <label key={option.value} className="ddMenuItem">
              <input
                type="checkbox"
                value={option.value}
                checked={selectedMoreOptions.includes(option.value)}
                onChange={handleOptionChange}
              />
              <img src={option.image} alt={option.label} />
              {option.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MoreFilter;
