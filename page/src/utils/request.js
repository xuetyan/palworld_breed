import axios from 'axios'

const request = axios.create({
  baseURL: '/',
  timeout: 1000,
})

export function getPalData() {
  return request({
    url: 'pal'
  })
}

export function getBreedData() {
  return request({
    url: 'breed'
  })
}