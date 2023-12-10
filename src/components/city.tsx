import { useEffect, useState } from 'react'
import City36hrs from '../containers/weather36hrsRequest.tsx'
import EventBus from '../utils/event-bus'
import { getCityName } from '../utils/set-map.ts'

const city = () => {
  const [cityhover, setCityHover] = useState<string>('')

  useEffect(() => {
    const subscriptionHover = EventBus.on('city-hover', (data) => {
      setCityHover(data)
    })

    return () => {
      subscriptionHover.off('city-hover')
    }
  }, [])
  return (
    <>
      {cityhover && (
        <div className="city-container">
          <h1>{getCityName(cityhover)}</h1>
          <p>點擊城市看詳細</p>
        </div>
      )}

      <City36hrs />
    </>
  )
}

export default city
