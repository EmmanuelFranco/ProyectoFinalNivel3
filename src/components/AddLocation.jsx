import PropTypes from 'prop-types';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AiOutlineClose, AiOutlineSearch, AiOutlineRight } from 'react-icons/ai';


export const AddLocation = ({ sendSearch, sendCountry }) => {
  const [locationAdded, setLocationAdded] = useState([
    {
      id: uuidv4(),
      city: 'London',
    },
    {
      id: uuidv4(),
      city: 'Barcelona',
    },
    {
      id: uuidv4(),
      city: 'Long Beach',
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    const newCity = inputValue.trim();

    if (newCity && !locationAdded.some((location) => location.city.toLowerCase() === newCity.toLowerCase())) {
      const newLocation = {
        id: uuidv4(),
        city: newCity.charAt(0).toUpperCase() + newCity.slice(1),
      };
      setLocationAdded([...locationAdded, newLocation]);
      setInputValue('');
    }
  };

  const handleCity = (value) => {
    sendCountry(value);
    sendSearch(false);
  };

  const handleClick = () => {
    sendSearch(false);
  };

  return (
    <>
      <section className="flex flex-col  font-raleway w-80 h-screen bg-gray-800">
  <div className="flex justify-end ">
    <AiOutlineClose
      className="text-2vw mt-5 mr-5 cursor-pointer"
      onClick={handleClick}
    />
  </div>

  <div className="flex flex-col items-center mt-5">
    <div className="flex justify-center items-center mt-5">
      <div className="flex justify-between items-center  w-44 h-12 mr-1 border border-solid border-gray-300">
        <AiOutlineSearch className="text-gray-300  text-1.5 ml-1" />
        <input
          className="w-36 h-4 text-1 border-none outline-none text-gray-700 font-raleway font-semibold leading-normal bg-transparent"
          type="text"
          placeholder="add location"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>

      <button
        onClick={handleButtonClick}
        className="w-16 h-12 bg-blue-600 text-white border-none font-raleway text-1 font-semibold leading-normal"
      >
        Search
      </button>
    </div>

    <div className="w-full h-70vh mt-10  ">
      {locationAdded.map(({ id, city }) => (
        <div
          onClick={() => handleCity(city)}
          className="w-3/4 h-10 mb-4 mx-10 flex justify-between items-center cursor-pointer group border border-solid border-transparent hover:border-gray-700"
          key={id}
        >
          <h3 className="ml-5">{city}</h3>
          <div className="mr-5 opacity-0 group-hover:opacity-100  transition-opacity ">
            <AiOutlineRight className="icon-added-city" />
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
    </>
  );
};

AddLocation.propTypes = {
  sendSearch: PropTypes.func.isRequired,
  sendCountry: PropTypes.func.isRequired,
};