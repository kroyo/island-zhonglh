import { config } from '../config'

const tokenUrl = config.apiBaseUrl + 'token'
const verifyUrl = config.apiBaseUrl + 'token/verify'

// 获取token
export const getToken = () => {
  wx.login({
    success: (res) => {
      if(res.code) {
        wx.request({
          url: tokenUrl,
          method: 'POST',
          data: {
            account: res.code,
            type: 100
          },
          success: (res) => {
            console.log(res.data)
            const code = res.statusCode.toString();
            if(code.startsWith('2')) {
              wx.setStorageSync('token', res.data.token)
            }
          }
        })
      }
    }
  })
}

// 验证token
export const verifyToken = (token) => {
  wx.request({
    url: verifyUrl,
    method: 'POST',
    data: {
      token
    },
    success: res => {
      console.log(res.data)
      const valid = res.data.isValid
      if (!valid) {
        getToken()
      }
    }
  })
}

export const verify = () => {
  let token = wx.getStorageSync('token');
  if (!token) {
    getToken();
  } else {
    verifyToken(token);
  }
}