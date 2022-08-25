const Router = require('koa-router')

const { HotBook } = require('@models/hot-book')
const { Auth } = require('../../../middlewares/auth')

const router = new Router({
  prefix: '/v1/book'
})

router.get('/latest', (ctx, next) => {
  // // 未知错误
  // abc
  // // 已知错误
  // if (true) {
  //   const error = new global.errs.ParameterException
  //   throw error
  // }
  ctx.body = { key: 'book' }
})

// 图书基础数据 服务
router.get('/hot_list', new Auth().m, async ctx => {
  const bookList = await HotBook.getAll()
  ctx.body = bookList
})

module.exports = router