import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { RiNavigationFill } from "react-icons/ri";

export const WeatherWeek = ({ sendCountry }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [degrees, setDegrees] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = "2575f602a45df46638fe40ce994c29e8";

  const weatherWeek = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${sendCountry}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      return data;
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    weatherWeek()
      .then((responseData) => {
        setWeatherData(responseData);
        setError(null);
      })
      .catch((error) => {
        setError(error);
      });
  }, [sendCountry]);

  const handleDegrees = (grade) => {
    if (grade) {
      setDegrees(true);
    } else {
      setDegrees(false);
    }
  };

  const handleImg = (condition) => {
    return `https://openweathermap.org/img/wn/${condition}.png`;
  };

  const getFiveDays = () => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();
    const fiveDays = [];

    for (let i = 1; i <= 5; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);
      const dayOfWeek = daysOfWeek[nextDay.getDay()];
      const date = nextDay.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
      });
      fiveDays.push(`${dayOfWeek}, ${date}`);
    }

    return fiveDays;
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <section className="lg:mx-32  flex flex-col w-full">
        {weatherData ? (
          <div className="div-content-weather-week flex flex-col w-60vw mt-6 ">
            
              <div className="div-degrees w-60vw flex justify-end mb-4 gap-1vw mr-5 ">
                <button
                  className="button-degrees text-center w-7 h-7 text-xs font-raleway font-semibold text-white bg-gray-800 rounded-full border-none cursor-pointer transition duration-500 hover:text-gray-900 hover:bg-white"
                  onClick={() => handleDegrees(true)}
                >
                  °C
                </button>
                <button
                  className="button-degrees text-center w-7 h-7 ml-3 text-xs font-raleway font-semibold text-white bg-gray-800 rounded-full border-none cursor-pointer transition duration-500 hover:text-gray-900 hover:bg-white"
                  onClick={() => handleDegrees(false)}
                >
                  °F
                </button>
              </div>
             
            <div
              className={`div-weather-week-info lg:flex px-1  justify-between w-60vw mb-4 sm:items-center 
              mx-auto p-12 md:p-0  grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-7`}
            >
              {weatherData.list.slice(0, 5).map((forecast, index) => (
                <div
                  className="div-day-weather-info bg-gray-800 w-32 flex flex-col items-center justify-center lg:m-auto sm:my-14 "
                  key={index}
                >
                  <p className="p-div-day-weather-info">
                    {index === 0 ? "Tomorrow" : getFiveDays()[index]}
                  </p>
                  <img
                    className="img-weather-info w-12 h-12"
                    src={`assets/${forecast.weather[0].icon}.png`}
                    alt={forecast.weather[0].description}
                  />
                  <div className="div-day-degrees-info flex flex-row">
                    <p className="p-div-day-degrees-info mr-8">
                      {degrees
                        ? Math.round(forecast.main.temp_max)
                        : Math.round((forecast.main.temp_max * 9) / 5 + 32)}
                      <strong className="strong-div-day-degrees-info">
                        °{degrees ? "C" : "F"}
                      </strong>
                    </p>
                    <p className="p-div-day-degrees-info">
                      {degrees
                        ? Math.round(forecast.main.temp_min)
                        : Math.round((forecast.main.temp_min * 9) / 5 + 32)}
                      <strong className="strong-div-day-degrees-info">
                        °{degrees ? "C" : "F"}
                      </strong>
                    </p>
                  </div>
                  <div className="div-wind-status flex flex-row my-4">
                    <div className="div-icon-wind-status">
                      <RiNavigationFill
                        className="icon-wind-status"
                        style={{ transform: `rotate(${forecast.wind.deg}deg)` }}
                      />
                    </div>
                    <p className="p-wsw-wind-status">{forecast.wind.deg}°</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mx-4  sm:flex-col">
              <h2>Today’s Highlights</h2>

              <div className="div-tag-day-weather-info mb-4 mx:4 flex flex-col lg:flex-row w-full auto gap-2vw mt-4 ">
                <div className="div-tag-day-weather1 p-2 mr-4 my-4 flex flex-col justify-around items-center  bg-gray-800 w-full">
                  <p className="p-wind-status m-3">Wind Status</p>
                  <h2 className="h2-wind-status text-5xl">
                    <strong className="strong-wind-status">
                      {weatherData.list[0].wind.speed}
                    </strong>
                    {degrees ? "m/s" : "mph"}
                  </h2>
                  <div className="div-wind-status flex flex-row my-4">
                    <div className="div-icon-wind-status flex items-center justify-center mr-2 w-7 h-7 text-xs font-raleway font-semibold text-white bg-gray-500 rounded-full border-none cursor-pointer transition duration-500">
                      <RiNavigationFill
                        className="icon-wind-status w-5 h-5 "
                        style={{
                          transform: `rotate(${weatherData.list[0].wind.deg}deg)`,
                        }}
                      />
                    </div>
                    <p className="p-wsw-wind-status">
                      {weatherData.list[0].wind.deg}°
                    </p>
                  </div>
                </div>
                <div className="div-tag-day-weather1 p-2 flex my-4 w-full flex-col justify-around items-center bg-gray-800 ">
                  <p className="p-humidity">Humidity</p>
                  <h2 className="h2-humidity text-5xl">
                    {weatherData.list[0].main.humidity}%
                  </h2>
                  <div className="div-rod-humidity">
                    <div className="div-percentage-humidity flex flex-row">
                      <p className=" ">0</p>
                      <p className=" mx-11">50</p>
                      <p className=" ">100</p>
                    </div>
                    <div className="div1-percentage-bar-humidity  h-1 bg-gray-600 animate__animated animate__fadeInLeft animate__delay-1s w-full">
                      <div
                        className="div2-percentage-bar-humidity h-full bg-yellow-400"
                        style={{
                          width: `${weatherData.list[0].main.humidity}%`,
                        }}
                      />
                    </div>
                    <p className="p-percentage-humidity ml-auto flex justify-end items-center">
                      %
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row w-full auto gap-2vw mt-4 ">
                <div className="div-tag-day-weather2 w-full h-1/3 mr-4 p-2 mb-8  flex flex-col auto grid-cols-auto auto gap-2vw  justify-around items-center bg-gray-800">
                  <p className="p-tag-day-weather2">Visibility</p>
                  <h2 className="h2-tag-day-weather2 my-3">
                    <strong className="strong-tag-day-weather2 text-5xl">
                      {Math.round(weatherData.list[0].visibility / 1000)}
                    </strong>{" "}
                    km
                  </h2>
                </div>
                <div className="div-tag-day-weather2 h-1/3 w-full  p-2 flex flex-col justify-around items-center bg-gray-800">
                  <p className="p-tag-day-weather2">Air Pressure</p>
                  <h2 className="h2-tag-day-weather2 my-3">
                    <strong className="strong-tag-day-weather2 text-5xl">
                      {Math.round(weatherData.list[0].main.pressure)}
                    </strong>{" "}
                    hPa
                  </h2>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="loading-data flex justify-center mt-40vh ml-30vw w-100 h-100 border-20 border-solid border-indigo-900 border-opacity-100 border-white rounded-full border-t-20 border-white animate-spinner"></div>
        )}
      </section>
    </>
  );
};

WeatherWeek.propTypes = {
  sendCountry: PropTypes.string.isRequired,
};
