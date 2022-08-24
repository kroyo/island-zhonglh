
const Router = require('koa-router')
const { LikeValidator } = require('../../validators/validator')
const { Favor } = require('../../models/favor')

const { Auth } = require('../../../middlewares/auth')
const { success } = require('../../lib/helper')

const router = new Router({
  prefix: '/v1/like' 
})

// 点赞期刊
//  Class constructor LikeValidator cannot be invoked without 'new'
router.post('/', new Auth().m, async (ctx, next) => {
  const v = await new LikeValidator().validate(ctx, {id: 'art_id'})
  await Favor.like(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid)
  success()
})

// 取消点赞
router.post('/cancel', new Auth().m, async (ctx, next) => {
  const v = await new LikeValidator().validate(ctx, {id: 'art_id'})
  await Favor.dislike(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid)
  success()
})

//  

module.exports = router