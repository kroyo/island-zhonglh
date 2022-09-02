
import { Base64 } from 'js-base64'
import { config } from '../config.js'
import { getToken } from '../api/token'

const tips = {
  1: '抱歉，出现了一个错误',
  1005: 'appkey无效，请前往www.7yue.pro申请',
}
class HTTP {
  request({ url, data = {}, method = 'GET' }) {
    return new Promise((resolve, reject)  => {
      this._request(url, resolve, reject, data, method)
    })
  }
  _request(url, resolve, reject, data = {}, method = 'GET', noRefetch = false) {
    wx.request({
      url: config.apiBaseUrl + url,
      data,
      header: {
        'content-type': 'application/json',
        Authorization: this._encode()
      },
      method,
      success: (res) => {
        console.log('>>>http', res)
        const code = res.statusCode.toString()
        if (code.startsWith('2')) {
          resolve(res.data)
        } else {
          if (code == '403') {
            if (!noRefetch) {
              this._refetch(
                url,
                resolve,
                reject,
                data,
                method
              )
            }
          } else {
            reject()
            const error_code = res.data.error_code
            this._show_error(error_code)
          }
        }
      },
      fail: (res) => {
        reject()
        this._show_error(1)
      },
      complete: (res) => {},
    })
  }
  _show_error(error_code) {
    if (!error_code) {
      error_code = 1
    }
    const tip = tips[error_code]
    wx.showToast({
      title: tip ? tip : tips[1],
      icon: 'none',
      duration: 2000
    })
  }
  _refetch(...param) {
    getToken((token) => {
      this._request(...param, true);
    });
  }
  _encode() {
    const token = wx.getStorageSync('token')
    const base64 = Base64.encode(token+':')
    return 'Basic ' + base64 
  }
}

export { HTTP }