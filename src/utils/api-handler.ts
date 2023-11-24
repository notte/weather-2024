import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { requestFail, responseFail } from './error-handler'
import * as status from '../types/enum'
import * as type from '../types/interface'
import { useState } from 'react'

const weatherToken = 'CWA-E05A3C78-2C28-4258-9FDD-137E9CCC104F'
const weatherURL = 'https://opendata.cwa.gov.tw/api/v1/rest/datastore/'

const airToken = '0c5c6a61-f263-468e-b7d9-85ca9bb8d9b4'
const airURL = 'https://data.moenv.gov.tw/api/v2/'

let config: AxiosRequestConfig = {
  responseType: 'json',
  method: 'GET',
}

// const [config, setConfig] = useState<AxiosRequestConfig>({
//   responseType: 'json',
//   method: 'GET',
// })

const air = status.APIStatus.air
const weather = status.APIStatus.weather

function handler() {
  return async (requestConfig: type.IRequestConfig): Promise<AxiosResponse> => {
    if (requestConfig.type === air) {
      config = {
        ...config,
        baseURL: airURL,
        url: requestConfig.url,
        params: { ...requestConfig.params, api_key: airToken },
      }
      //   setConfig((config) => ({
      //     ...config,
      //     baseURL: airURL,
      //     url: requestConfig.url,
      //     params: { ...requestConfig.params, api_key: airToken },
      //   }))
    }

    if (requestConfig.type === weather) {
      config = {
        ...config,
        baseURL: weatherURL,
        url: requestConfig.url,
        params: { ...requestConfig.params, Authorization: weatherToken },
      }
      //   setConfig((config) => ({
      //     ...config,
      //     baseURL: weatherURL,
      //     url: requestConfig.url,
      //     params: { ...requestConfig.params, Authorization: weatherToken },
      //   }))
    }

    const instance = axios.create()

    instance.interceptors.request.use(
      (config) => {
        return config
      },
      (error) => {
        requestFail(error)
      }
    )
    instance.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        responseFail(error)
      }
    )

    let result

    try {
      result = await instance.request(config)
      return Promise.resolve(result)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

// async function handler(type: Status.APIStatus): Promise<AxiosResponse> {
//   if (type === air) {
//     setConfig((config) => ({
//       ...config,
//       headers: { api_key: airToken },
//       baseURL: airURL,
//     }))
//   }

//   if (type === weather) {
//     setConfig((config) => ({
//       ...config,
//       headers: { Authorization: weatherToken },
//       baseURL: weatherURL,
//     }))
//   }
//   const instance = axios.create()

//   instance.interceptors.request.use(
//     (config) => {
//       return config
//     },
//     (error) => {
//       requestFail(error)
//     }
//   )
//   instance.interceptors.response.use(
//     (response) => {
//       return response
//     },
//     (error) => {
//       responseFail(error)
//     }
//   )

//   let result

//   try {
//     result = await instance.request(config)
//     return Promise.resolve(result)
//   } catch (error) {
//     return Promise.reject(error)
//   }
// }

const APIhandler = handler()

export default APIhandler
