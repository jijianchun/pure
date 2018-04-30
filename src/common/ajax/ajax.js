import axios from 'axios'
import router from '@/router/index'

// 添加请求拦截器
axios.interceptors.request.use(config => {
  if (config.method === 'get' || config.method === 'delete' || config.method === 'post') {
    config.params = config.data
  }
  return config
}, error => {
  // 对请求错误做些什么
  alert(error)
  return Promise.reject(error)
})
function checkStatus (res) {
  if (res && (res.status === 200 || res.status === 304 || res.status === 400)) {
    var hasResult = res.hasOwnProperty('result')
    var returnVal = hasResult === true ? res.result : res
    return returnVal
  }
  return res
}

export default {
  ajax (url, method, params) {
    return new Promise((resolve, reject) => {
      axios({
        url: url,
        method: method,
        data: params
      })
        .then(response => {
          let res = checkStatus(response.data)
          let hasStatus = res.status
          switch (hasStatus) {
            case 401:
              router.push({path: 'error401'})
              break
            case 403:
              router.push({path: 'error403'})
              break
            /* case 500:
              // router.push({path: 'error500'})
              break */
            default:
              resolve(res)
              break
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
