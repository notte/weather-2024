export interface IWeekItem {
  day: string
  [key: string]: string | string[]
}

export interface IWeatherWeekData {
  day: string
  locationName: string
  MaxAT: string[][]
  MinAT: string[][]
  MaxT: string[][]
  MinT: string[][]
  Wx: string[][]
  UVI: string[]
}
