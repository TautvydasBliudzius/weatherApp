import React, { useEffect, useRef, useState } from "react";
import MoreFilter from '../MoreFilter/MoreFilter'
import logo from '../../images/meteo-logo.png'
import { DateRange } from 'react-date-range'
import './NavBar.css'

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';


const NavBar = ({ dateRange, setDateRange, selectedMoreOptions, setSelectedMoreOptions, logout }) => {
    const [openDate, setOpenDate] = useState(false);

    const dateRangeRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dateRangeRef.current && !dateRangeRef.current.contains(event.target)) {
                setOpenDate(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 15);

    const minDate = new Date();
    minDate.setMonth(minDate.getMonth() - 3);

    return (
        <div className="navBarContainer">
            <img src={logo} alt="logo" />
            <div className="dateRangeContainer" ref={dateRangeRef}>
                {dateRange[0].startDate < minDate && <div className="notError">You cannot select a date earlier than three months from now</div>}
                {dateRange[0].endDate > maxDate && <div className="notError">You cannot select a date later than fifteen days from now</div>}
                <div>Select date</div>
                <input
                    type="text"
                    placeholder={`${dateRange[0].startDate.toLocaleDateString()} - ${dateRange[0].endDate.toLocaleDateString()}`}
                    onClick={() => setOpenDate(!openDate)}
                    className="headerDateInputText"
                />

                {openDate &&
                    <div className="dateInputContainer">
                        <DateRange
                            editableDateInputs={true}
                            onChange={item => setDateRange([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={dateRange}
                            className="dateInput"
                        />
                    </div>
                }

            </div>
            <div className="moreAndLogOut">
            <MoreFilter
                selectedMoreOptions={selectedMoreOptions}
                setSelectedMoreOptions={setSelectedMoreOptions}
            />
            <button onClick={logout}>Log Out</button>
            </div>
        </div>
    );
};

export default NavBar;