const util = require('util')
const { User } = require('../models/user')
const { generateToken } = require('../../core/util')
const { Auth } = require('../../middlewares/auth')

class WXManager {
  static async codeToToken(code) {
    const url = util.format(global.config.wx.loginUrl, 
      global.config.wx.appId,
      global.config.wx.appSecret,
      code);
    const result = await axios.get(url);
    if(result.status !== 200) {
      throw new global.errs.AuthFailed('openid获取失败');
    }
    const errCode = result.data.errCode;
    if(errCode !== 0) {
      throw new global.errs.AuthFailed('openid获取失败'+ errCode);
    }

    const user = await User.getUserByOpenid(result.data.openid);
    if(!user) {
      user = await User.registerByOpenid(result.data.openid)
    }
    return generateToken(user.id, Auth.USER)
  }
}