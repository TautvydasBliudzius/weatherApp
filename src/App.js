import './App.css';
import NavBar from './components/NavBar/NavBar';
import Main from './components/Main/Main';
import { useState } from 'react';


function App() {
  const [selectedMoreOptions, setSelectedMoreOptions] = useState([]);
  const [dateRange, setDateRange] = useState([
    {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    }
]);


  
  return (
    <div className="App">
      <NavBar 
                dateRange={dateRange} 
                setDateRange={setDateRange}
                selectedMoreOptions={selectedMoreOptions}
                setSelectedMoreOptions={setSelectedMoreOptions}
            />
      <Main 
                dateRange={dateRange} 
                setDateRange={setDateRange}
                selectedMoreOptions={selectedMoreOptions}
                setSelectedMoreOptions={setSelectedMoreOptions}
            />
    </div>
  );
}

export default App;
