import axios from "axios"

const service = axios.create({
  baseURL: process.env.NODE_MODE === 'development' ? '/' : 'https://activity-api.iyingdi.com', // api 的 base_url
})

service.interceptors.request.use(
  (config) => {
    config.headers["Activity-Id"] = "palworld"
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

export default service
