import { useEffect, useCallback, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTownWeather } from '../redux/thunks'
import { getTowntWeather, getWeatherLine } from '../utils/helpers'
import { LocationTown } from '../types/response/weather-town'
import { IWorkData } from '../types/table'
import { allCity } from '../assets/data'
import { find } from 'lodash'
import Table from '../components/chart/townTable'
import Line from '../components/chart/line'
import EventBus from '../utils/event-bus'
import * as type from '../types/common'

const weatherTownRequest = () => {
  const [cityId, setCityId] = useState<string | null>(null)
  const [town, setTown] = useState<string | null>(null)
  const [status, setStatus] = useState<boolean>(false)
  const [lineData, setLineData] = useState<type.ILineProps>({
    labels: [],
    datasets: [],
  })
  const dispatch = useDispatch()
  const weatherTown = useSelector((state: { town: LocationTown }) => state.town)

  const [threeforecast, setThreeforecast] = useState<boolean>(true)
  const [TLine, setTLine] = useState<boolean>(false)
  const threeforecastBtn = useRef<HTMLButtonElement | null>(null)
  const TLineBtn = useRef<HTMLButtonElement | null>(null)

  const handlerButton = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>): void => {
      event.preventDefault()
      setThreeforecast(() => false)
      setTLine(() => false)

      threeforecastBtn.current!.className = ''
      TLineBtn.current!.className = ''
      event.currentTarget.className = 'active'

      switch (event.currentTarget.getAttribute('data-type')) {
        case 'threeforecast':
          setThreeforecast(() => true)
          break
        case 'TLine':
          setTLine(() => true)
          break
      }
    },
    [threeforecast, setTLine]
  )

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
        setThreeforecast(() => true)
        setTLine(() => false)
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

  useEffect(() => {
    if (weatherTown.weatherElement) {
      const [, AT, T, ,] = weatherTown.weatherElement
      setLineData(() => getWeatherLine(AT, T))
    }
  }, [weatherTown])

  return (
    <>
      {status && weatherTown.weatherElement && (
        <div className="dark">
          <div className="town-container">
            <h1>{`${find(allCity, (item: type.ICityItem) => item.id === cityId)
              ?.COUNTYNAME} 
              ${town}`}</h1>
            <div className="tab-warp">
              <button
                data-type="threeforecast"
                ref={threeforecastBtn}
                onClick={handlerButton}
                className="active"
              >
                逐三小時預報
              </button>
              <button data-type="TLine" ref={TLineBtn} onClick={handlerButton}>
                溫度曲線
              </button>
            </div>
            {threeforecast && (
              <div className="table-warp">
                <Table
                  townData={
                    getTowntWeather(weatherTown.weatherElement) as IWorkData[]
                  }
                />
              </div>
            )}

            {TLine && (
              <div className="chart">
                <Line {...lineData} />
              </div>
            )}
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
          </div>
        </div>
      )}
    </>
  )
}

export default weatherTownRequest
