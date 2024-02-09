import { useState } from 'react'
import { Today } from './components/Today.jsx'
import { AddLocation } from './components/AddLocation.jsx'
import { WeatherWeek } from './components/WeatherWeek.jsx'


function App () {
  const [isSearching, setIsSearching] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState('London')

  return (
    <>
      <section className='app  md:flex-col lg:flex-row w-full max-w-[1440px] sm:flex sm:m-4'>
        {isSearching ? (
          <AddLocation sendCountry={setSelectedCountry} sendSearch={setIsSearching} />
        ) : (
          <>
            <Today sendCountry={selectedCountry} sendSearch={setIsSearching} />
            {(!isSearching || window.innerWidth >= 768) && <WeatherWeek sendCountry={selectedCountry} />}
          </>
        )}
      </section>
    </>
  )
}

export default App