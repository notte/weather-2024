import { useState, useCallback, useEffect } from 'react'
import { map } from 'lodash'
import { allCity } from '../assets/data'
import EventBus from '../utils/event-bus'

const opitions = () => {
  const [city, setCity] = useState<string>()
  const options = ['選項一', '選項二', '選項三', '選項四']
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value)
  }

  useEffect(() => {
    const subscriptionClick = EventBus.on('city-status', (data) => {
      setCity(() => data)
    })

    return () => {
      subscriptionClick.off('city-status')
    }
  }, [])

  return (
    <>
      {city && (
        <div className="opitions">
          <p>選擇鄉鎮預報</p>
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
      )}
    </>
  )
}

export default opitions
