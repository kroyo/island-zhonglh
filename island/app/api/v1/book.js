const Router = require('koa-router')
const router = new Router()

router.get('/v1/book/latest', (ctx, next) => {
  // // 未知错误
  // abc
  // // 已知错误
  // if (true) {
  //   const error = new global.errs.ParameterException
  //   throw error
  // }
  ctx.body = { key: 'book' }
})

module.exports = router