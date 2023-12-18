export interface ICityWeekTable {
  PoP12h: string
  MinAT: string
  MaxAT: string
  MinT: string
  MaxT: string
  Wx: string
  UVI: string
  WeatherDescription: string
}

export interface ICityWeekData {
  locationName: string
  lat: string
  lon: string
  time: string[]
  weatherElement: weatherElement[]
}

export interface weatherElement {
  description: string
  measures: string
  value: string[]
}
