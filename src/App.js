import './App.css';
import NavBar from './components/NavBar/NavBar';
import Main from './components/Main/Main';
import Introduction from './components/Introduction/Introduction';
import Login from './components/Login/Login';
import { useState } from 'react';


function App() {
  const [user, setUser] = useState(null)
  const [selectedMoreOptions, setSelectedMoreOptions] = useState([]);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="App">
      {!user && <Login onLogin={handleLogin} />}
      {user && (
        <>
          <NavBar
            dateRange={dateRange}
            setDateRange={setDateRange}
            selectedMoreOptions={selectedMoreOptions}
            setSelectedMoreOptions={setSelectedMoreOptions}
            logout={handleLogout}
          />
          <Introduction />
          <Main
            dateRange={dateRange}
            setDateRange={setDateRange}
            selectedMoreOptions={selectedMoreOptions}
            setSelectedMoreOptions={setSelectedMoreOptions}
          />
        </>
      )}

    </div>
  );
}

export default App;
