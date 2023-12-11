import { useRef, useEffect, useState } from 'react'
import mapboxgl, { Map } from 'mapbox-gl'
import * as type from '../types/interface.ts'
import data from '../assets/twCounty2010.geo.json'
import { getWeatherIcon, getCityName } from '../utils/set-map.ts'
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
  //   if (map.current) return
  //   map.current = new mapboxgl.Map({
  //     container: mapContainer.current as HTMLElement,
  //     style: 'mapbox://styles/yoyo2023/clp0uor9i00c601r6cyl8g78b',
  //     center: [lng, lat],
  //     zoom: zoom,
  //   })
  // }, [JSON.stringify(_props)])

  // useEffect(() => {
  //   if (!Object.keys(_props[0]).includes('Weather')) return
  //   const resource = { ..._props }

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

  //     setMarkers([])
  //     for (const key in resource) {
  //       const className = getWeatherIcon(resource[key].Weather as string)
  //       const customMarkerElement = document.createElement('div')
  //       customMarkerElement.className = className
  //       customMarkerElement.setAttribute('city', resource[key].COUNTYNAME)

  //       const marker = new mapboxgl.Marker({ element: customMarkerElement })
  //         .setLngLat([
  //           resource[key].coordinates[0],
  //           resource[key].coordinates[1],
  //         ])
  //         .setPopup(
  //           new mapboxgl.Popup({
  //             closeOnClick: true,
  //             closeButton: false,
  //             closeOnMove: true,
  //             offset: 2,
  //             className: 'marker-city-popup',
  //           }).setHTML(
  //             `<h3>${resource[key].COUNTYNAME}</h3><p>${resource[key].Weather}</p><p>${resource[key].AirTemperature}°C</p><p>${resource[key].aqi}</p><p>${resource[key].status}</p>`
  //           )
  //         )

  //       const fn = () => {
  //         setMarkers((oldMarker) => [...oldMarker, marker as mapboxgl.Marker])
  //       }
  //       fn()
  //     }
  //   })
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
  //       EventBus.emit('city-hover', features![0].properties?.COUNTYNAME)
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
  //     EventBus.emit('city-hover', '')
  //     map.current?.setFilter('country-fills-hover', ['==', 'COUNTYNAME', ''])
  //     map.current?.setFilter('country-borders', ['==', 'COUNTYNAME', ''])
  //   })

  //   map.current!.on('click', (e) => {
  //     const features = map.current?.queryRenderedFeatures(e.point, {
  //       layers: ['country-fills'],
  //     })
  //     if (features!.length > 0) {
  //       const clickedFeature = features![0].properties
  //       let selectCity = clickedFeature!.COUNTYNAME
  //       selectCity = getCityName(selectCity)
  //       EventBus.emit('city-click', selectCity)
  //       // const mark = filter(markers, (marker) => {
  //       //   marker.getElement().style.backgroundColor = '#f5f5f5f1'
  //       //   return marker.getElement().getAttribute('city') === selectCity
  //       // })
  //     }
  //   })
  // }, [])

  return (
    <>
      <div ref={mapContainer} className="map-container" />
    </>
  )
}

export default map
