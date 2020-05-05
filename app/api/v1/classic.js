const Router = require('koa-router')
const router = new Router()

// const { HttpException, ParameterException } = require('../../../core/http-exception')
const { PositiveIntergerValidator } = require('../../validators/validator')

router.post('/v1/:id/classic/latest', async (ctx, next) => {
  const path = ctx.params
  const query = ctx.request.query
  const headers = ctx.request.header
  const body = ctx.request.body
  
  // LinValidatar
  const v = await new PositiveIntergerValidator().validate(ctx);
  const id = v.get('body.b.e.x', parsed=false);
  ctx.body = 'success';
  // if(true){
  //   // 动态  面向对象方式  一个类
  //   // const error = new HttpException('为什么错误', 10001, 400)
  //   const error = new ParameterException()
  //   throw error
  // }
  // ctx.body = {
  //   key: 'classic'
  // }
  // throw new Error('API Exception')
  // 监听异常
  // 输出一段有意义的提示
})

module.exports = router