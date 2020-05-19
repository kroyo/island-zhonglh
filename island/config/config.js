module.exports = {
  // prod
  environment: 'dev',
  database: {
    dbName: 'island',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'kroyoshi'
  },
  security: {
    secretKey: 'abcdefg',
    expiresIn: 60*60
  },
  wx: {
    appID: 'wx68153f26b595deb8',
    appSecret: '7f3cc382d52b0edc94b623d1dbabbe4d',
    loginUrl:'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
  }
}