const Router = require('koa-router')
const { success } = require('../../lib/helper')

const { RegisterValidator } = require('../../validators/validator')
const { User } = require('../../models/user')
const router = new Router({
  prefix: '/v1/user'
})

// 注册 
router.post('/register', async (ctx) => {
  // 思维路径
  // 接收参数 LinValidotor
  // email password password2 
  const v = await new RegisterValidator().validate(ctx);
  // email password
  // token jwt
  // token 无意义的随机字符串
  const user = {
    email: v.get('body.email'),
    password: v.get('body.password2'),
    nickname: v.get('body.nickname')
  }
  await User.create(user)
  success()
})

module.exports = router