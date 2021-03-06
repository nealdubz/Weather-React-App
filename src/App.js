import { useState } from "react";

const api = {
  key: '85dee43d6706a8b5eddc3146191d1622',
  base: 'https://api.openweathermap.org/data/2.5/'
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then(res => res.json())
        .then(result => {
          if(result.cod == "404"){
            alert(result.message);
          }else{
            console.log(result);
            setWeather(result);
            setQuery('');
          } 
        })
        .catch(e =>{ alert(e); });
    }
  }
  const dateBuilder = (d) => {
    var months = ["January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"];
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }
  return (
    <div className={(typeof weather.main != "undefined" ? (weather.main.temp > 16 ? 'app warm' : 'app'): '') } >
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
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country} </div>
              <div className="date">{dateBuilder(new Date())} </div>
            </div>
            <div className="weather-box">
              <div className="temp">
                { Math.round(weather.main.temp)}°c
              </div>
              <div className="weather">{weather.weather[0].main} </div>
            </div>
          </div>
        ): ('') }
      </main>
    </div>
  );
}

export default App;
