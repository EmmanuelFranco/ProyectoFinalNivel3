import { useState } from 'react'
import { Today } from './components/Today.jsx'
import { AddLocation } from './components/AddLocation.jsx'
import { WeatherWeek } from './components/WeatherWeek.jsx'


function App () {
  const [isSearching, setIsSearching] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState('London')

  return (
    <>
      <section className='app flex flex-row'>
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