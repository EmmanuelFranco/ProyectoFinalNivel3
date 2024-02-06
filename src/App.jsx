import { useState } from 'react'
import { Today } from "./components/Today"



function App() {
  const [isSearching, setIsSearching] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState('London')

  return (
    <>
            <Today sendCountry={selectedCountry} sendSearch={setIsSearching} />
            {(!isSearching || window.innerWidth >= 768) && <WeatherWeek sendCountry={selectedCountry} />}
          </>
  )
}

export default App
