import { useRef, useEffect, useState } from 'react'
import mapboxgl, { Map } from 'mapbox-gl'
import * as type from '../types/interface.ts'
import data from '../assets/twCounty2010.geo.json'
import {
  getWeatherIcon,
  getCityName,
  getAirClassName,
} from '../utils/set-map.ts'
import { forEach } from 'lodash'
import EventBus from '../utils/event-bus'

// mapboxgl.accessToken =
//   'pk.eyJ1IjoieW95bzIwMjMiLCJhIjoiY2xvd2dnNWR0MDR5dDJxcGl3cjAwczUwbiJ9.HPB6vtrEbhCQILNbIDqktA'

// 資料來源以 props 傳入
const map = (_props: type.INowData[]) => {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<null | Map>(null)
  const [lng] = useState<number>(123.3)
  const [lat] = useState<number>(23.8835)
  const [zoom] = useState<number>(6.6)
  const [markers, setMarkers] = useState<mapboxgl.Marker[]>([])

  // useEffect(() => {
  //   if (map.current) {
  //     EventBus.emit('loading-change', false)
  //     return
  //   }
  //   map.current = new mapboxgl.Map({
  //     container: mapContainer.current as HTMLElement,
  //     style: 'mapbox://styles/yoyo2023/clq357vee000i01r4a67eaap1',
  //     center: [lng, lat],
  //     zoom: zoom,
  //   })

  //   map.current!.on('load', () => {
  //     if (!map.current?.getSource('countries')) {
  //       map.current?.addSource('countries', {
  //         type: 'geojson',
  //         data: data as GeoJSON.FeatureCollection,
  //       })
  //       map.current?.addLayer({
  //         id: 'country-fills',
  //         type: 'fill',
  //         source: 'countries',
  //         paint: {
  //           'fill-color': 'transparent',
  //         },
  //       })
  //       map.current?.addLayer({
  //         id: 'country-fills-hover',
  //         type: 'fill',
  //         source: 'countries',
  //         layout: {},
  //         paint: {
  //           'fill-color': '#0F2D33',
  //           'fill-opacity': 0.4,
  //         },
  //         filter: ['==', 'COUNTYNAME', ''],
  //       })

  //       map.current?.addLayer({
  //         id: 'country-borders',
  //         type: 'line',
  //         source: 'countries',
  //         layout: {},
  //         paint: {
  //           'line-color': '#111719',
  //           'line-width': 1,
  //         },
  //         filter: ['==', 'COUNTYNAME', ''],
  //       })
  //     }
  //   })
  // }, [JSON.stringify(_props)])

  // useEffect(() => {
  //   if (!Object.keys(_props[0]).includes('aqi')) return

  //   const resource = { ..._props }

  //   for (const key in resource) {
  //     const className = getWeatherIcon(resource[key].Weather as string)
  //     const customMarkerElement = document.createElement('div')
  //     customMarkerElement.className = className
  //     customMarkerElement.setAttribute('city', resource[key].COUNTYNAME)
  //     const marker = new mapboxgl.Marker({ element: customMarkerElement })
  //       .setLngLat([resource[key].coordinates[0], resource[key].coordinates[1]])
  //       .setPopup(
  //         new mapboxgl.Popup({
  //           closeOnClick: true,
  //           closeButton: false,
  //           closeOnMove: true,
  //           offset: 2,
  //           className: 'marker-city-popup',
  //         }).setHTML(
  //           `<h3>${resource[key].COUNTYNAME}</h3><p>${
  //             resource[key].Weather
  //           }</p><p>${
  //             resource[key].AirTemperature
  //           }°C</p><p class="${getAirClassName(
  //             resource[key].aqi as number
  //           )}"}>空氣品質<br>${resource[key].status}</p>`
  //         )
  //       )
  //     setMarkers((oldMarker) => [...oldMarker, marker as mapboxgl.Marker])
  //   }
  // }, [JSON.stringify(_props)])

  // useEffect(() => {
  //   if (markers.length > 0) {
  //     forEach(markers, (mark) => {
  //       mark.addTo(map.current as Map)
  //     })
  //   }
  // }, [markers])

  // useEffect(() => {
  //   map.current?.on('mousemove', (e) => {
  //     const features = map.current?.queryRenderedFeatures(e.point, {
  //       layers: ['country-fills'],
  //     })

  //     if (features!.length > 0) {
  //       map.current!.getCanvas().style.cursor = 'pointer'
  //       map.current?.setFilter('country-fills-hover', [
  //         '==',
  //         'COUNTYNAME',
  //         features![0].properties?.COUNTYNAME,
  //       ])
  //       map.current?.setFilter('country-borders', [
  //         '==',
  //         'COUNTYNAME',
  //         features![0].properties?.COUNTYNAME,
  //       ])
  //     }
  //   })

  //   map.current!.on('mouseout', () => {
  //     map.current?.setFilter('country-fills-hover', ['==', 'COUNTYNAME', ''])
  //     map.current?.setFilter('country-borders', ['==', 'COUNTYNAME', ''])
  //   })

  //   map.current!.on('click', (e) => {
  //     const features = map.current?.queryRenderedFeatures(e.point, {
  //       layers: ['country-fills'],
  //     })
  //     if (features!.length > 0) {
  //       try {
  //         const clickedFeature = features![0].properties
  //         let selectCity = clickedFeature!.COUNTYNAME
  //         selectCity = getCityName(selectCity)
  //         map.current?.flyTo({ center: [lng, lat], zoom: zoom })
  //         EventBus.emit('city-click', selectCity)
  //       } finally {
  //         map.current?.scrollZoom.disable()
  //         map.current?.dragPan.disable()
  //         map.current?.dragRotate.disable()
  //         map.current?.keyboard.disable()
  //         map.current?.touchZoomRotate.disable()
  //       }
  //     }
  //   })

  //   const subscriptionClose = EventBus.on('city-close', () => {
  //     map.current?.scrollZoom.enable()
  //     map.current?.dragPan.enable()
  //     map.current?.dragRotate.enable()
  //     map.current?.keyboard.enable()
  //     map.current?.touchZoomRotate.enable()
  //   })
  //   return () => {
  //     subscriptionClose.off('city-click')
  //   }
  // }, [])

  return (
    <>
      <div ref={mapContainer} className="map-container" />
    </>
  )
}

export default map
