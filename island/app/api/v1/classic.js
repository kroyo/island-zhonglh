const Router = require('koa-router')
const { Flow } = require('../../models/flow')
const { Art } = require('../../models/art')
const { Favor } = require('@models/favor')

const { Auth } = require('../../../middlewares/auth')
const { ClassicValidator, PositiveIntegerValidator } = require('@validator')

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

// 获取上一期期刊
router.get('/:index/next', new Auth().m, async (ctx, next) => {
  // 先校验期刊id 是否正确
  const v = await new PositiveIntegerValidator().validate(ctx, {id: 'index'})

  const index = v.get('path.index')
  // 查找是否有当前index的期刊
  const flow = await Flow.findOne({
    where: {
      index: index + 1
    }
  })
  if (!flow) {
    throw new global.errs.NotFound()
  }
  const art = await Art.getData(flow.art_id, flow.type)
  const likeLatest = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid)
  art.setDataValue('index', flow.index)
  art.setDataValue('like_status', likeLatest)
  ctx.body = art
})

// 获取下一期期刊
router.get('/:index/previous', new Auth().m, async (ctx, next) => {
  // 先校验期刊id 是否正确
  const v = await new PositiveIntegerValidator().validate(ctx, {id: 'index'})

  const index = v.get('path.index')
  // 查找是否有当前index的期刊
  const flow = await Flow.findOne({
    where: {
      index: index - 1
    }
  })
  if (!flow) {
    throw new global.errs.NotFound()
  }
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