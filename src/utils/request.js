import axios from 'axios'
import { getCookie ,removeCookie} from '../public'
import router from '../router/index'
import { Message } from 'element-ui'

const service = axios.create({
  timeout: 15000
})

// 请求拦截器
service.interceptors.request.use(config => {
  const token = getCookie('enterpriseToken')
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
}, error => {
    return Promise.reject(error)
})

// 返回拦截器
service.interceptors.response.use(config => {
  if (config.data.status == 3) {
    // Message({
    //   type: 'warning',
    //   message: config.data.message,
    //   center: true
    // })
    removeCookie("enterpriseToken")
    router.replace('/')
    return config
    // parent.location.href = '/'
  } else {
    return config
  }
}, error =>{
  return Promise.reject(error)
})
export default service
