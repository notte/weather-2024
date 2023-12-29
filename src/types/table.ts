export interface IWeekItem {
  day: string
  [key: string]: string | string[]
}

export interface IWorkData {
  [key: string]: { [key: string]: string[] | string }
}

export interface IWeatherWeekData {
  [key: string]: { [key: string]: string[] } | string
}

export interface ITemperature {
  [key: string]: { [key: string]: string }
}

export interface IWx {
  [key: string]: { [key: string]: string }
}
