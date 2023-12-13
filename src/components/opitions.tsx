import { useState, useCallback } from 'react'
import { map } from 'lodash'

const opitions = () => {
  const options = ['選項一', '選項二', '選項三', '選項四']
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  function success(location: GeolocationPosition) {
    console.log(location)
  }
  function error(error: GeolocationPositionError) {
    console.log(error)
    // localStorage.setItem('latitude', String([taipeiStation[1]]))
    // localStorage.setItem('longitude', String(taipeiStation[0]))
  }

  // navigator.geolocation.getCurrentPosition(success, error, {
  //   enableHighAccuracy: true,
  // })

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value)
  }

  const getUserPosition = useCallback(() => {
    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
    })
  }, [])
  return (
    <>
      <div className="opitions">
        <button className="position" onClick={getUserPosition}>
          定位城市
        </button>
        <select
          id="dropdown"
          onChange={handleOptionChange}
          value={selectedOption || ''}
        >
          <option value="" disabled>
            請選擇
          </option>
          {map(options, (option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}

export default opitions
