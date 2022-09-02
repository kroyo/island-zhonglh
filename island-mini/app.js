// app.js
import { verify } from './api/token'
App({
  onLaunch() {
    // 登录 获取验证token
    verify()
  },
  globalData: {
    userInfo: null
  }
})
