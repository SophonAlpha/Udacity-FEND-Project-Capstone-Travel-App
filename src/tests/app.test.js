// This 'regenerator-runtime' import was added because of this error
//     "ReferenceError: regeneratorRuntime is not defined"
// Recommended solution: https://stackoverflow.com/questions/42535270/regeneratorruntime-is-not-defined-when-running-jest-test
import 'regenerator-runtime/runtime'

import fetchMock from 'jest-fetch-mock'

fetchMock.enableMocks()
const _ = require('lodash')
const request = require('supertest')
const path = require('path')
const app = require(path.resolve(__dirname, '../server/app'))
import * as testData from './app.test.data'
import { expectedLocation, testCurrentWeather } from './app.test.data'

const axios = require('axios')
jest.mock('axios')

beforeEach(() => {
  fetch.mockClear()
})

test('GET /', () => {
  return request(app)
    .get('/')
    .then(response => {
      expect(response.statusCode).toBe(200)
      expect(response.text).toContain('<title>Your Travel Planner</title>')
    })
})

test('GET /location', () => {
  axios.get.mockResolvedValue(testData.testLocation)
  return request(app)
    .get('/location')
    .query({ url: 'dummy' })
    .then(response => {
      expect(response.statusCode).toBe(200)
      const responseObj = JSON.parse(response.text)
      _.isEqual(responseObj[0], testData.expectedLocation)
    })
})

test('GET /currentWeather', () => {
  axios.get.mockResolvedValue(testData.testCurrentWeather)
  return request(app)
    .get('/currentWeather')
    .query({ url: 'dummy' })
    .then(response => {
      expect(response.statusCode).toBe(200)
      const responseObj = JSON.parse(response.text)
      _.isEqual(responseObj[0], testData.expectedCurrentWeather)
    })
})

test('GET /weatherForecast', () => {
  axios.get.mockResolvedValue(testData.testWeatherForecast)
  return request(app)
    .get('/weatherForecast')
    .query({ url: 'dummy' })
    .then(response => {
      expect(response.statusCode).toBe(200)
      const responseObj = JSON.parse(response.text)
      _.isEqual(responseObj, testData.expectedWeatherForecast.data)
    })
})

test('GET /locationImage', () => {
  axios.get.mockResolvedValue(testData.testLocationImage)
  return request(app)
    .get('/locationImage')
    .query({ url: 'dummy' })
    .then(response => {
      expect(response.statusCode).toBe(200)
      const responseObj = JSON.parse(response.text)
      _.isEqual(responseObj, testData.expectedLocationImage.data)
    })
})
