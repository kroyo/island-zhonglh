const axios = require('axios')
const util = require('util')
const { Sequelize, Model, Op } = require('sequelize')

const { sequelize } = require('../../core/db')
const { Favor } = require('./favor')

class Book extends Model {
  static async add(data) {
    return Book.create(data)
  }
  static async getDetail(id) {
    const detail = await Book.findOne({
      where: {
        id
      }
    })
    if (!detail) {
      throw new global.errs.NotFound()
    }
    console.log('>>>detail', detail)
    return detail
  }

  static async getMyFavorBookCount(uid) {
    const count = await Favor.findOne({
      where: {
        type: 400,
        uid
      }
    })
    return count
  }

  static async searchFromYuShu(q, start, count, summary = 1) {
    const url = util.format(
      global.config.yushu.keywordUrl, encodeURI(q), count, start, summary)
    const result = await axios.get(url)
    return result.data
  }
}

// 因为书籍的详情页接口已无法使用，故这里改为本地存储
Book.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  fav_nums: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  author: Sequelize.STRING,
  binding: Sequelize.STRING,
  category: Sequelize.STRING,
  image: Sequelize.STRING,
  images: Sequelize.STRING,
  isbn: Sequelize.STRING,
  pages: Sequelize.STRING,
  price: Sequelize.STRING,
  pubdate: Sequelize.STRING,
  publisher: Sequelize.STRING,
  subtitle: Sequelize.STRING,
  summary: Sequelize.STRING,
  title: Sequelize.STRING,
  translator: Sequelize.STRING
}, {
  sequelize,
  tabName: 'book'
})

module.exports = {
  Book
}