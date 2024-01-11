import { useState, useCallback, useEffect } from 'react'
import { map, find } from 'lodash'
import { allCity } from '../assets/data'
import * as type from '../types/common'
import EventBus from '../utils/event-bus'

const opitions = () => {
  const [city, setCity] = useState<string | null>()
  const [options, setOptions] = useState<string[] | null>()
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(() => event.target.value)
  }

  const handleGetCity = useCallback(
    (data: string) => {
      setSelectedOption(() => null)
      setCity(() => data)
      const cityObj = find(allCity, (item: type.ICityItem) => {
        return item.COUNTYNAME === data
      })
      setOptions(() => cityObj?.children)
    },
    [setCity, setOptions]
  )

  const handleSubmit = () => {
    EventBus.emit('loading-change', true)
    const cityObj = find(allCity, (item: type.ICityItem) => {
      return item.COUNTYNAME === city
    })
    EventBus.emit('getTown-status', { id: cityObj?.id, town: selectedOption })
  }

  const handleCleanCity = useCallback(() => {
    setCity(() => null)
  }, [city, setCity])

  useEffect(() => {
    const subscriptionClick = EventBus.on('city-status', handleGetCity)
    const subscriptionCityClose = EventBus.on('city-close', handleCleanCity)
    const subscriptionTownClose = EventBus.on('town-close', handleCleanCity)

    return () => {
      subscriptionClick.off('city-status')
      subscriptionCityClose.off('city-close')
      subscriptionTownClose.off('town-close')
      setSelectedOption(() => null)
    }
  }, [])

  return (
    <>
      {city && (
        <header>
          <div className="opition-warp">
            <div className="opitions">
              <p>選擇鄉鎮預報</p>
              <select
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
              <button className="submit" onClick={handleSubmit}>
                確定
              </button>
            </div>
          </div>
        </header>
      )}
    </>
  )
}

export default opitions
