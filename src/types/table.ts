export interface ICityWeekTable {
  PoP12h: string
  T: string[]
  AT: string[]
  Wx: string
  UVI: string
  WeatherDescription: string
}

export interface ICityWeekData {
  locationName: string
  element: string
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

export interface ICityDay {
  day: string
  MaxT: string[]
  MaxAT: string[]
  MinT: string[]
  MinAT: string[]
  Wx: string[]
  UVI: string[]
  WeatherDescription?: string[]
}

export interface IWeekItem {
  day: string
  [key: string]: string | string[]
}
