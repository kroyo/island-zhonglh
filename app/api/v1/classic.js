const Router = require('koa-router')
const router = new Router()

router.post('/v1/classic/latest', (ctx, next) => {
  ctx.body = { key: 'classic' }
  // 监听异常
  // 输出一段有意义的提示
  throw new Error('API Exception')
})

module.exports = router