const Router = require('koa-router')
const { PositiveIntergerValidator } = require('../../validators/validator')

const { Auth } = require('../../../middlewares/auth')

const router = new Router({
  prefix: '/v1/classic'
})

router.get('/latest', new Auth().m, async (ctx, next) => {
  // 权限
  ctx.body = ctx.auth;
})

module.exports = router