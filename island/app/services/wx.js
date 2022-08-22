const util = require('util')
const axios = require('axios')

const { User } = require('../models/user')
const { generateToken } = require('../../core/util')
const { Auth } = require('../../middlewares/auth')

class WXManager {
  static async codeToToken(code) {
    const { loginUrl, appID, appSecret } = global.config.wx
    const url = util.format(loginUrl, appID, appSecret, code);
    const result = await axios.get(url);
    console.log(">>", result.data)
    if(result.status !== 200) {
      throw new global.errs.AuthFailed('openid获取失败');
    }
    const errcode = result.data.errcode;
    const errmsg = result.data.errmsg;
    if(errcode) {
      throw new global.errs.AuthFailed('openid获取失败'+ errmsg);
    }

    const user = await User.getUserByOpenid(result.data.openid);
    if(!user) {
      user = await User.registerByOpenid(result.data.openid)
    }
    return generateToken(user.id, Auth.USER)
  }
}

module.exports = {
  WXManager
}