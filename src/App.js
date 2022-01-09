import { useState, useEffect } from "react";
import geolocation from "geolocation";

function App() {
  const [current, setCurrent] = useState({});
  const api = {
    key: process.env.REACT_APP_API_KEY,
    base: "https://api.openweathermap.org/data/2.5/",
  };
  useEffect(() => {
    geolocation.getCurrentPosition(function (err, position) {
      if (err) throw err;
      fetch(
        `${api.base}weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${api.key}`
      )
        .then((res) => res.json())
        .then((r) => {
          setCurrent(r);
        });
      //  };
    });
  }, []);

  console.log(current.name);

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    setLoading(true);
    setWeather({});
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        setQuery("");
        setLoading(false);
      })
      .catch((err) => console.log(err.cod));
  };

  const dateBuilder = (d) => {
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
  };
  const [isloading, setLoading] = useState(false);

  return (
    <div className="app-main">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-12">
            <div className="hero-text">
              <p>
                <i>
                  Sunshine is delicious, rain is refreshing, wind braces us up,
                  snow is exhilarating; there is really no such thing as bad
                  weather, only different kinds of good weather...
                </i>
                <b>John Ruskin</b>
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 col-md-6 my-3">
            <div
              className={
                typeof current.main != "undefined"
                  ? current.main.temp > 16
                    ? "app warm"
                    : "app cold"
                  : null
              }
            >
              {current.name ? (
                <div className="p-3 shadow rounded" style={{ height: "170px" }}>
                  <h6>{current.sys.country}</h6>
                  <h3 className="date">{dateBuilder(new Date())} </h3>
                  <h2 className="text-white">
                    {Math.round(current.main.temp)} <sup>0</sup>C
                  </h2>
                  <h4 className="weather">{current.weather[0].main}</h4>
                </div>
              ) : (
                <div
                  style={{ height: "170px" }}
                  className="rounded text-white loader shadow d-flex justify-content-center align-items-center fade show"
                >
                  <h4> ... Loading </h4>
                </div>
              )}
            </div>
          </div>
          <div className="col-lg-6 col-md-6 my-2">
            <div className="search-box">
              <input
                type="text"
                className="search-bar"
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                placeholder="Enter city..."
              />
              <button className="btn btn-success my-3" onClick={search}>
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="row d-flex justify-content-center">
          <div className="col-lg-12 my-3">
            <div
              className={
                typeof weather.main != "undefined"
                  ? weather.main.temp > 16
                    ? "app warm"
                    : "app cold"
                  : null
              }
            >
              <main>
                {typeof weather.main != "undefined" &&
                weather.cod !== 400 &&
                !isloading ? (
                  <div className="text-center display shadow p-3">
                    <div className="location-box">
                      <div className="location">
                        {weather.name}, {weather.sys.country}
                      </div>
                      <div className="date">{dateBuilder(new Date())} </div>
                    </div>
                    <div className="weather-box">
                      <div className="temp">
                        {Math.round(weather.main.temp)} <sup>0</sup>C
                      </div>
                      <div className="weather text-light">
                        {weather.weather[0].main}
                      </div>
                    </div>
                  </div>
                ) : isloading ? (
                  <div
                    style={{ height: "150px" }}
                    className="rounded shadow d-flex justify-content-center align-items-center fade show"
                  >
                    <p className="text-white h3">... Loading</p>
                  </div>
                ) : (
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="text-white h4">
                      Please enter a valid city name in the search box!!!
                    </div>
                  </div>
                )}

                {/* {typeof weather.main != "undefined" &&
                weather.cod !== 400 &&
                !isloading ? (
                  <div className="text-center display shadow p-3">
                    <div className="location-box">
                      <div className="location">
                        {weather.name}, {weather.sys.country}
                      </div>
                      <div className="date">{dateBuilder(new Date())} </div>
                    </div>
                    <div className="weather-box">
                      <div className="temp">
                        {Math.round(weather.main.temp)} <sup>0</sup>C
                      </div>
                      <div className="weather text-light">
                        {weather.weather[0].main}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="text-white h4">
                      Please enter a valid city name in the search box!!!
                    </div>
                  </div>
                )} */}
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
