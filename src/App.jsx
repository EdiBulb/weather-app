import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const API_KEY = "f1a9cbd27abe2b22fd966f3723a4145b"

function App() {
  const [location, setLocation] = useState(null)
  const [weather, setWeather] = useState(null)

  // 현재 위치 가져오기
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        console.log("current location: ", lat, lon);
        setLocation({ lat, lon }); 
      },
      (err) => {
        console.error("can't find the location.", err);
      }
    );
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  // weather API request
  useEffect(() => {
    const fetchWeather = async () => {
      if (!location) return; // 위치 없으면 아무것도 안 함

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=metric`
      );

      const data = await response.json();
      console.log("weather data: ", data);
      setWeather(data);
    };

    fetchWeather();
  }, [location]); // location이 바뀔 때마다 호출됨

  return (
    <div>
      <h1>Hi, I'm Harry</h1>
      {weather ? (
        <div>
          <p>📍 {weather.name}</p>
          <p>🌡️ {weather.main.temp}°C</p>
          <p>☁️ {weather.weather[0].description}</p>
        </div>
      ) : (
        <p>Bring weather info...</p>
      )}
    </div>
  );
}

export default App;