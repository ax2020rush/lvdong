// import router from '../../router'
import store from '../../store'
import router from '../../router'
import Clipboard from 'clipboard'
import { Toast } from 'vant'
export function onClickLeft () {
  history.back()
} // 返回上一页
export function TimeFormat (time) {
  const o = parseInt(time / 3600) // 小时
  const m = parseInt(time / 60 % 60)// 分
  const s = Math.ceil(time % 60) // 秒
  if (time <= 0) {
    return '00:00:00'
  }
  return (o < 10 ? '0' + o : o) + ':' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s)
}// 秒转化为时分秒
export function formatDate (dates) {
  var date = new Date(dates * 1000)
  var YY = date.getFullYear() + '-'
  var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
  var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
  return YY + MM + DD + ' ' + hh + mm + ss
}
export async function loginOut (name = null) {
  if (store.state.token) {
    localStorage.clear()
    sessionStorage.clear()
    store.commit('UPDATEINFO', null)
    store.commit('UPDATETOKEN', null)
    setTimeout(e => (loginOut()), 500)
  } else {
    router.push('/login')
  }
}
export function openLottery (arr) {
  if (arr) {
    const s = arr.reduce((a, b) => parseInt(a) + parseInt(b))
    return [s > 10 ? '福' : '禄', s % 2 === 0 ? '喜' : '寿']
  } else {
    return ['--', '--']
  }
}
export function choose (arr, size) {
  var allResult = [];

  (function fn (arr, size, result) {
    var arrLen = arr.length
    if (size > arrLen) {
      return
    }
    if (size === arrLen) {
      allResult.push([].concat(result, arr))
    } else {
      for (var i = 0; i < arrLen; i++) {
        var newResult = [].concat(result)
        newResult.push(arr[i])

        if (size === 1) {
          allResult.push(newResult)
        } else {
          var newArr = [].concat(arr)
          newArr.splice(0, i + 1)
          fn(newArr, size - 1, newResult)
        }
      }
    }
  })(arr, size, [])

  return allResult
}
export function copy (e, text, message) {
  const clipboard = new Clipboard(e.target, { text: () => text })
  clipboard.on('success', e => {
    // 释放内存
    Toast.success(message)

    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy()
  })
  clipboard.on('error', e => {
    // 不支持复制
    // 释放内存
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy()
  })
  clipboard.onClick(e)
}
