import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { BiCurrentLocation } from "react-icons/bi";

export const Today = ({ sendSearch, sendCountry }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = "2575f602a45df46638fe40ce994c29e8";

  const weatherToday = async function fetchData() {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${sendCountry}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    weatherToday()
      .then((responseData) => {
        setWeatherData(responseData);
      })
      .catch((error) => {
        setError(error);
      });
  }, [sendCountry]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleImg = (condition) => {
    return condition;
  };

  const handleClick = () => {
    sendSearch(true);
  };

  const handleDate = (timestamp) => {
    const date = new Date(timestamp * 1000);

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
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

    const dayOfWeekAbbr = daysOfWeek[date.getDay()];
    const dayOfMonth = date.getDate();
    const monthAbbr = months[date.getMonth()];

    return `${dayOfWeekAbbr}, ${dayOfMonth} ${monthAbbr}`;
  };

  return (
    <>
      <section className="today flex flex-col font-raleway w-80 h-full bg-gray-800">
        {weatherData ? (
          <div>
            <div className="mt-4 ml-4 flex flex-row">
              <button
                className="button-search-places mr-16 w-44 h-12 text-base font-semibold cursor-pointer border-none text-gray-300 bg-gray-600 shadow-md transition duration-500 hover:bg-opacity-20"
                onClick={handleClick}
              >
                Search for places
              </button>
              <button className="button-location flex justify-center items-center w-7 h-7 cursor-pointer border-none bg-gray-600 rounded-full  shadow-md transition duration-500 hover:bg-opacity-20 mr-3 mt-2">
                <BiCurrentLocation
                  style={{ color: "white", width: "100%", height: "100%" }}
                />
              </button>
            </div>

            <div className="w-28 h-28 overflow-hidden border-none rounded-md mx-auto mt-16">
              <img
                src={`assets/${weatherData.weather[0].icon}.png`}
                alt={weatherData.weather[0].description}
              />
            </div>

            <div className="div-info-weather flex flex-col items-center mt-4">
              <h1 className="h1-info-weather text-5xl text-gray-400 font-raleway  font-semibold">
                <strong className="strong-info-weather text-gray-300  font-semibold text-9xl">
                  {Math.round(weatherData.main.temp)}
                </strong>
                °C
              </h1>
              <h2 className="h2-info-weather text-gray-400 my-7 text-2xl capitalize">
                {weatherData.weather[0].description}
              </h2>
              <div className="div-date-location-info-weather flex flex-col  items-center gap-4 mt-4">
                <p className="p1-date-location-info-weather text-gray-400 items-center font-raleway font-semibold">
                  Today • {handleDate(weatherData.dt)}
                </p>
                <p className="p2-date-location-info-weather  flex flex-row my-7 text-gray-400 font-raleway font-semibold">
                  <FaLocationDot className="icon-date-location-info mx-1" />
                  {weatherData.name}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="loading-today-data flex justify-center mt-60 w-full h-50 border-10 border-solid border-gray-700 border-opacity-100  rounded-full border-t-10  animate-spinner"></div>
        )}
      </section>
    </>
  );
};

Today.propTypes = {
  sendSearch: PropTypes.func.isRequired,
  sendCountry: PropTypes.string.isRequired,
};
