const Router = require('koa-router')

const { RegisterValidator } = require('../../validators/validatar')
const { User } = require('../../models/user')
const router = new Router({
  prefix: '/v1/user'
})

// 注册 
router.post('/register', async (ctx) => {
  // 思维路径
  // 接收参数 LinValidotor
  // email password password2 
  const v = await new RegisterValidator().validate(ctx)
  const user = {
    email: v.get('body.email'),
    password: v.get('body.password2'),
    nickname: v.get('body.nickname')
  }
  const r = await User.create(user)
})

module.exports = router