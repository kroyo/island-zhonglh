const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')
const { Art } = require('./art')

class Favor extends Model {
  // 业务表
  static async like(art_id, type, uid) {
    // 1. 添加记录
    // 2.classic fav_nums
    const favor = await Favor.findOne({
      where: {
        art_id,
        type,
        uid
      }
    })
    // 判断当前用户是否有对这个期刊点过赞
    if (favor) {
      throw new global.errs.LikeError()
    }
    return sequelize.transaction(async t => {
      await Favor.create({
        art_id,
        type,
        uid
      }, {transaction: t})
      const art = await Art.getData(art_id, type)
      await art.increment('fav_nums', { by: 1, transaction: t})
    })
  }
  static async dislike(art_id, type, uid) {
    const favor = await Favor.findOne({
      where: {
        art_id,
        type,
        uid
      }
    })
    // 判断当前用户是否有对这个期刊点过赞
    if (!favor) {
      throw new global.errs.DislikeError()
    }
    return sequelize.transaction(async t => {
      // force: false 软删除  true: 物理删除
      await favor.destroy({
        force:true, 
        transaction: t
      })
      const art = await Art.getData(art_id, type)
      await art.decrement('fav_nums', { by: 1, transaction: t})
    })
  }
  static async userLikeIt(art_id, type, uid) {
    const favor = await Favor.findOne({
      where: {
        uid,
        art_id,
        type,
      }
    })
    return favor ? true : false
  }
}

Favor.init({
  uid: Sequelize.INTEGER,
  art_id: Sequelize.INTEGER,
  type: Sequelize.INTEGER
}, {
  sequelize,
  tabName: 'favor'
})

module.exports = {
  Favor
}