import { useEffect, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTownWeather } from '../redux/thunks'
import { getTowntWeather } from '../utils/helpers'
import { LocationTown } from '../types/response/weather-town'
import { IWorkData } from '../types/table'
import Table from '../components/chart/townTable'
import EventBus from '../utils/event-bus'

const weatherTownRequest = () => {
  const [cityId, setCityId] = useState<string | null>(null)
  const [town, setTown] = useState<string | null>(null)
  const [status, setStatus] = useState<boolean>(false)
  const dispatch = useDispatch()
  const weatherTown = useSelector((state: { town: LocationTown }) => state.town)

  const getData = useCallback(
    async (cityId: string, town: string) => {
      dispatch(fetchTownWeather({ cityid: cityId, town: town }) as never)
    },
    [fetchTownWeather]
  )

  const handleGetTown = useCallback(
    (data: { id: string; town: string }) => {
      getData(data.id, data.town).then(() => {
        EventBus.emit('36hours-status', false)
        EventBus.emit('forecast-status', false)
        setStatus(true)
        setCityId(() => data.id)
        setTown(() => data.town)
      })
    },
    [setStatus, setCityId, setTown]
  )

  useEffect(() => {
    const subscriptionTownClick = EventBus.on('getTown-status', handleGetTown)
    const intervalWeather = setInterval(
      () => {
        if (cityId && town) {
          getData(cityId, town)
        }
      },
      15 * 60 * 1000
    )

    return () => {
      clearInterval(intervalWeather)
      subscriptionTownClick.off('getTown-status')
    }
  }, [])

  return (
    <>
      {status && (
        <div className="dark">
          <div className="town-container">
            <div className="city-week">
              <h1></h1>
              <div className="tab-warp"></div>
              <div className="button-warp">
                <button
                  className="default close"
                  onClick={() => {
                    EventBus.emit('town-close')
                    setStatus(false)
                  }}
                >
                  關閉
                </button>
              </div>
              <Table
                townData={
                  getTowntWeather(weatherTown.weatherElement) as IWorkData[]
                }
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default weatherTownRequest
