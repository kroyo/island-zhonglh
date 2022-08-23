const Router = require('koa-router')
const { Flow } = require('../../models/flow')
const { Art } = require('../../models/art')
const { Favor } = require('@models/favor')

const { Auth } = require('../../../middlewares/auth')
const { ClassicValidator } = require('@validator')

const router = new Router({
  prefix: '/v1/classic' 
})

// 获取最新期刊
router.get('/latest', new Auth().m, async (ctx, next) => {
  const flow = await Flow.findOne({
    order: [
      ['index', 'DESC']
    ]
  })
  const art = await Art.getData(flow.art_id, flow.type)
  const likeLatest = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid)
  art.setDataValue('index', flow.index)
  art.setDataValue('like_status', likeLatest)
  ctx.body = art
})

// 获取指定期刊详情
router.get('/:type/:id/favor', new Auth().m, async (ctx, next) => {
  // 校验参数
  const v = await new ClassicValidator().validate(ctx)

  const id = v.get('path.id')
  const type = parseInt(v.get('path.type'))

  const art = await Art.getData(id, type)
  if (!art) {
    throw new global.errs.NotFound()
  }

  const like = await Favor.userLikeIt(id,type,ctx.auth.uid)
  ctx.body = {
    fav_nums: like.fav_nums,
    like_status: like
  }
})

module.exports = router