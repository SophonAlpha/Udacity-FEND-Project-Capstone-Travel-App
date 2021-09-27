// This 'regenerator-runtime' import was added because of this error
//     "ReferenceError: regeneratorRuntime is not defined"
// Recommended solution: https://stackoverflow.com/questions/42535270/regeneratorruntime-is-not-defined-when-running-jest-test
import 'regenerator-runtime/runtime'

import fetchMock from 'jest-fetch-mock'

fetchMock.enableMocks()
const request = require('supertest')
const path = require('path')
const app = require(path.resolve(__dirname, '../server/app'))
import * as testData from './app.test.data'
import { expectedLocation } from './app.test.data'

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
      // TODO: Check out Lodash _.isEqual(value, other) to simplify code below.
      expect(responseObj[0].lng).toEqual(testData.expectedLocation.lng)
      expect(responseObj[0].lat).toEqual(testData.expectedLocation.lat)
      expect(responseObj[0].name).toEqual(testData.expectedLocation.name)
      expect(responseObj[0].adminName1).toEqual(testData.expectedLocation.adminName1)
      expect(responseObj[0].countryName).toEqual(testData.expectedLocation.countryName)
      expect(responseObj[0].countryCode).toEqual(testData.expectedLocation.countryCode)
    })
})

test('GET /analyse', async () => {
  fetch.once(JSON.stringify(testData.testAnalyse))
  const response = await request(app)
    .post('/analyse')
    .send({ text: 'dummy' })
    .catch(err => done(err))
  expect(response.statusCode).toBe(200)
  expect(response.text).toContain(JSON.stringify(testData.testAnalyse))
})
