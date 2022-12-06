import React, { useState } from 'react';
// import {FaSun} from 'react-icons/fa';
// import {FaMoon} from 'react-icons/fa';
import './App.css';
const api = {
  key: "50910ea9ef6c6343b624804a1461fb66",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
   const timeBuilder=(t)=>{
    const time = t.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return time;
   }
  //  const getDay=(t)=>{
  //   const hour = t.getHours();
  //   if(hour<17 && hour>5)
  //     return <FaSun/>;
  //   else 
  //     return <FaMoon/>;
  //  }
  return (
    <div className={(weather.main ) ? ((weather.main.temp > 16) ? 'app summer' : 'app') : 'bg1'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        { weather.main? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
            {/* <div className="date">{timeBuilder(new Date())}<p>{getDay(new Date())} </p></div>  */}
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°C
              <p className='par'>{weather.main.temp_max}°C/{weather.main.temp_min}°C</p>
            </div>
            <div className="weather">{weather.weather[0].main}</div>
            <p className='bold'>{weather.weather[0].description}</p>
          </div>
          <div className="bottom">
        <div className="feels">
          {weather.main ? <p className='bold'>{weather.main.feels_like.toFixed()}°C</p> : null}
          <p>Feels Like</p>
        </div>
        <div className="humidity">
          {weather.main ? <p className='bold'>{weather.main.humidity}%</p> : null}
          <p>Humidity</p>
        </div>
        <div className="wind">
          {weather.wind ? <p className='bold'>{weather.wind.speed.toFixed()} Kmph</p> : null}
          <p>Wind Speed</p>
        </div>
      </div>
        </div>
       
        ) : ('')}
      </main>
    </div>
  );
}

export default App;