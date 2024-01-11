import { useRef, useEffect, useState } from 'react'
import { allCity } from '../assets/data'
import mapboxgl, { Map, MapMouseEvent } from 'mapbox-gl'
import * as type from '../types/common.ts'
import data from '../assets/twCounty2010.geo.json'
import {
  getWeatherIcon,
  getCityName,
  getAirClassName,
} from '../utils/helpers.ts'
import { find } from 'lodash'
import EventBus from '../utils/event-bus'

mapboxgl.accessToken =
  'pk.eyJ1IjoieW95bzIwMjMiLCJhIjoiY2xvd2dnNWR0MDR5dDJxcGl3cjAwczUwbiJ9.HPB6vtrEbhCQILNbIDqktA'

// 資料來源以 props 傳入
const map = (_props: type.INowData[]) => {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<null | Map>(null)
  const [lng] = useState<number>(123.3)
  const [lat] = useState<number>(23.8835)
  const [zoom] = useState<number>(6.6)
  const [style] = useState<string>(
    'mapbox://styles/yoyo2023/clq357vee000i01r4a67eaap1'
  )
  const [markers, setMarkers] = useState<mapboxgl.Marker[]>([])
  const [reload, setReload] = useState<boolean>(true)

  // 建立地圖實體
  useEffect(() => {
    if (map.current) {
      return
    }
    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLElement,
      style: style,
      center: [lng, lat],
      zoom: zoom,
      maxZoom: 11,
      minZoom: 5.5,
    })
  }, [_props, map.current])

  // 建立 markers 實體
  const handleSetMarker = () => {
    const resource = { ..._props }
    for (const key in resource) {
      const className = getWeatherIcon(resource[key].Weather as string)
      const customMarkerElement = document.createElement('div')
      customMarkerElement.className = className as string
      customMarkerElement.setAttribute('city', resource[key].COUNTYNAME)
      const marker = new mapboxgl.Marker({ element: customMarkerElement })
        .setLngLat([resource[key].coordinates[0], resource[key].coordinates[1]])
        .setPopup(
          new mapboxgl.Popup({
            closeOnClick: true,
            closeButton: false,
            closeOnMove: true,
            offset: 2,
            className: 'marker-city-popup',
          }).setHTML(
            `<h3>${resource[key].COUNTYNAME}</h3><p>${
              resource[key].Weather
            }</p><p>${
              resource[key].AirTemperature
            }°C</p><p class="${getAirClassName(
              resource[key].aqi as number
            )}"}>空氣品質<br>${resource[key].status}</p>`
          )
        )
      setMarkers((oldMarker) => [...oldMarker, marker as mapboxgl.Marker])
    }
  }
  useEffect(() => {
    if (!Object.keys(_props[0]).includes('aqi')) return
    handleSetMarker()
  }, [JSON.stringify(_props)])

  // 移除 marker DOM
  const handleRemoveMarkerDOM = () => {
    if (markers) {
      for (let i = 0; i < markers.length; i++) {
        markers[i].remove()
      }
    }
    setReload(false)
  }
  // 建立 marker DOM
  const handleCreateMarkerDOM = () => {
    if (markers) {
      for (let i = 0; i < markers.length; i++) {
        markers[i].addTo(map.current as Map)
      }
    }
    setReload(true)
  }
  // 渲染 or 移除 marker
  useEffect(() => {
    if (reload === true) handleCreateMarkerDOM()
    if (reload === false) handleRemoveMarkerDOM()
  }, [markers, reload])

  // load 事件
  const handleSetMapData = () => {
    map.current?.addSource('countries', {
      type: 'geojson',
      data: data as GeoJSON.FeatureCollection,
    })
    map.current?.addLayer({
      id: 'country-fills',
      type: 'fill',
      source: 'countries',
      paint: {
        'fill-color': 'transparent',
      },
    })
    map.current?.addLayer({
      id: 'country-fills-hover',
      type: 'fill',
      source: 'countries',
      layout: {},
      paint: {
        'fill-color': '#0F2D33',
        'fill-opacity': 0.4,
      },
      filter: ['==', 'COUNTYNAME', ''],
    })

    map.current?.addLayer({
      id: 'country-borders',
      type: 'line',
      source: 'countries',
      layout: {},
      paint: {
        'line-color': '#111719',
        'line-width': 1,
      },
      filter: ['==', 'COUNTYNAME', ''],
    })
  }
  const handleMousemove = (e: MapMouseEvent) => {
    const features = map.current?.queryRenderedFeatures(e.point, {
      layers: ['country-fills'],
    })

    if (features!.length > 0) {
      map.current!.getCanvas().style.cursor = 'pointer'
      map.current?.setFilter('country-fills-hover', [
        '==',
        'COUNTYNAME',
        features![0].properties?.COUNTYNAME,
      ])
      map.current?.setFilter('country-borders', [
        '==',
        'COUNTYNAME',
        features![0].properties?.COUNTYNAME,
      ])
    }
  }
  const handleMouseOut = () => {
    map.current?.setFilter('country-fills-hover', ['==', 'COUNTYNAME', ''])
    map.current?.setFilter('country-borders', ['==', 'COUNTYNAME', ''])
  }
  const handleClick = (e: MapMouseEvent) => {
    const features = map.current?.queryRenderedFeatures(e.point, {
      layers: ['country-fills'],
    })
    if (features!.length > 0) {
      try {
        const clickedFeature = features![0].properties
        let selectCity = clickedFeature!.COUNTYNAME
        selectCity = getCityName(selectCity)
        map.current?.flyTo({ center: [lng, lat], zoom: zoom })
        EventBus.emit('city-status', selectCity)
      } finally {
        map.current?.scrollZoom.disable()
        map.current?.dragPan.disable()
        map.current?.dragRotate.disable()
        map.current?.keyboard.disable()
        map.current?.touchZoomRotate.disable()
        setReload(false)
      }
    }
  }

  useEffect(() => {
    map.current?.on('style.load', () => {
      EventBus.emit('loading-change', false)
      if (map.current?.getStyle().name === 'Monochrome-copy-copy') {
        if (!map.current?.getSource('countries')) {
          handleSetMapData()
        }

        if (map.current?.getLayer('country-fills')) {
          map.current?.on('mousemove', handleMousemove)
          map.current!.on('mouseout', handleMouseOut)
          map.current!.on('click', handleClick)
        }
      }
    })

    return () => {
      map.current?.off('mousemove', handleMousemove)
      map.current?.off('mouseout', handleMouseOut)
      map.current?.off('click', handleClick)
    }
  }, [map.current])

  // 接收 town 事件
  const handleGetTown = (data: { id: string; town: string }) => {
    const cityObj = find(allCity, (item: type.ICityItem) => {
      return item.id === data.id
    })
    if (cityObj) {
      map.current?.flyTo({
        center: [cityObj.center[0], cityObj.center[1]],
        zoom: cityObj.zoom,
      })
      map.current?.setStyle(cityObj?.style)
    }
  }

  useEffect(() => {
    const subscriptionCityClose = EventBus.on('city-close', () => {
      map.current?.scrollZoom.enable()
      map.current?.dragPan.enable()
      map.current?.dragRotate.enable()
      map.current?.keyboard.enable()
      map.current?.touchZoomRotate.enable()
      setReload(true)
    })

    const subscriptionTownClose = EventBus.on('town-close', () => {
      map.current?.scrollZoom.enable()
      map.current?.dragPan.enable()
      map.current?.dragRotate.enable()
      map.current?.keyboard.enable()
      map.current?.touchZoomRotate.enable()
      map.current?.flyTo({ center: [lng, lat], zoom: zoom })
      map.current?.setStyle(style)
      setReload(true)
    })

    const subscriptionTownClick = EventBus.on('getTown-status', handleGetTown)

    return () => {
      subscriptionCityClose.off('city-close')
      subscriptionTownClose.off('town-close')
      subscriptionTownClick.off('getTown-status')
    }
  }, [])

  return (
    <>
      <div ref={mapContainer} className="map-container" />
    </>
  )
}

export default map
