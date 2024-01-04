import { useState, useCallback, useEffect } from 'react'
import { map, find } from 'lodash'
import { allCity } from '../assets/data'
import EventBus from '../utils/event-bus'

const opitions = () => {
  const [city, setCity] = useState<string | null>()
  const [options, setOptions] = useState<string[] | null>()
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value)
  }

  const handleGetCity = useCallback(
    (data: string) => {
      setSelectedOption(() => null)
      setCity(() => data)
      const cityObj = find(allCity, (item: any) => {
        return item.COUNTYNAME === data
      })
      setOptions(() => cityObj?.children)
    },
    [setCity, setOptions]
  )

  const handleCleanCity = useCallback(() => {
    setCity(() => null)
  }, [city, setCity])

  useEffect(() => {
    const subscriptionClick = EventBus.on('city-status', handleGetCity)
    const subscriptionClose = EventBus.on('city-close', handleCleanCity)

    return () => {
      subscriptionClick.off('city-status')
      subscriptionClose.off('city-close')
      setSelectedOption(() => null)
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
