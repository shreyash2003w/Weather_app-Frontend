import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [selectedCities, setSelectedCities] = useState('');
  const [weatherResults, setWeatherResults] = useState(null);

  const handleCityChange = (event) => {
    setSelectedCities(event.target.value);
  };

  const getWeather = async () => {
    try {
      const response = await fetch('http://localhost:5000/getWeather', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cities: selectedCities.split(',') }),
      });

      const data = await response.json();
      setWeatherResults(data.weather);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title text-center">Weather App</h1>
          <div className="form-group">
            <label htmlFor="cityInput">Select cities (comma-separated): </label>
            <input
              type="text"
              id="cityInput"
              className="form-control"
              placeholder="e.g., Toronto, Mumbai, London"
              value={selectedCities}
              onChange={handleCityChange}
            />
          </div>
          <button className="btn btn-primary mt-2" onClick={getWeather}>
            Get Weather
          </button>

          {weatherResults && (
            <div className="mt-4">
              <h2 className="text-center">Weather Results</h2>
              <ul className="list-group">
                {Object.entries(weatherResults).map(([city, temperature]) => (
                  <li key={city} className="list-group-item">
                    {`${city}: ${temperature}`}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
