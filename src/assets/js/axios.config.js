// ##axios封装
import axios from 'axios'
import { Toast } from 'vant'
import qs from 'qs'
import store from '@/store/index'
import { loginOut } from './index'
const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'https://ld04.a8315.com/' : 'https://ld04.a8315.com/',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  timeout: 10000
})// 设置请求头A
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  if (config.method === 'post' && (config.url.indexOf('tpl/lottery/donation') < 0 && config.url.indexOf('tpl/user/info') < 0 && config.url.indexOf('tpl/user/mail') < 0)) {
    const message = ''
    Toast.loading({
      duration: 0,
      message: message,
      forbidClick: true,
      loadingType: 'spinner'
    })
  }

  return config
}, function (error) {
  return Promise.reject(error)
})
// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  if (response.data.msg === 'token失效' || response.data.msg === 'token过期') {
    Toast.fail('登录已过期,请重新登录!')
    loginOut()
    return response
  }
  if (response.config.method === 'post' && (response.config.url.indexOf('tpl/lottery/donation') < 0 && response.config.url.indexOf('tpl/user/info') < 0 && response.config.url.indexOf('tpl/user/mail') < 0)) {
    Toast.clear()
    if (response.config.url.indexOf('tpl/user/vod_find') < 0 && response.config.url.indexOf('tpl/user/vod_duihuan') < 0 && !response.data.sign) {
      Toast.fail(response.data.msg)
    }
  }
  return response
}, function (error) {
  console.log(error)
  Toast.fail('链接超时,请刷新页面')
  return Promise.reject(error)
})
export const api = {
  get (url, data = {}, token) {
    if (token) {
      data.token = store.state.token
      return instance.get(url, {
        params: data
      })
    } else {
      return instance.get(url, {
        params: data
      })
    }
  },
  post (url, data = {}, token) {
    if (token) {
      if (data) {
        data.token = store.state.token
      }
      return instance.post(url, qs.stringify(data))
    } else {
      return instance.post(url, qs.stringify(data))
    }
  }
}
