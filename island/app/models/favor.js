const { sequelize } = require('../../core/db')
const { Sequelize, Model, Op } = require('sequelize')
const { Art } = require('./art')
const { ArtType } = require('../lib/enum')

class Favor extends Model {
  // 业务表
  // 点赞
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
      const art = await Art.getData(art_id, type, false)
      await art.increment('fav_nums', { by: 1, transaction: t})
    })
  }
  // 取消点赞
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
      const art = await Art.getData(art_id, type, false)
      await art.decrement('fav_nums', { by: 1, transaction: t})
    })
  }
  // 判断这个期刊是否有点赞
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

  static async getBookFavor(uid, bookId) {
    const favorNums = await Favor.count({
      where: {
        art_id: bookId,
        type: ArtType.BOOK
      }
    })
    const myFavor = await Favor.findOne({
      where: {
        art_id: bookId,
        uid,
        type: 400
      }
    })
    return {
      fav_nums: favorNums,
      like_status: myFavor ? 1 : 0
    }
  }

  // 获取我喜欢的所有期刊
  static async getMyClassicFavor(uid) {
    const arts = await Favor.findAll({
      where: {
        uid,
        type: {
          [Op.not]: ArtType.BOOK
        }
      }
    })

    if (!arts) {
      throw new global.errs.NotFound()
    }

    return await Art.getList(arts)
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