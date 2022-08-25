const { Sequelize, Model, Op } = require('sequelize')
const { sequelize } = require('../../core/db')

const { Favor } = require('./favor')
const { ArtType } = require('../lib/enum')

class HotBook extends Model {
  static async getAll() {
    const scope = 'bh'
    const books = await HotBook.scope(scope).findAll({
      order: ['index']
    })
    const ids = books.map(book => book.id)

    const favors = await Favor.findAll({
      where: {
        art_id: {
          [Op.in]: ids
        },
        type: ArtType.BOOK
      },
      group:['art_id'],
      attributes:['art_id', [Sequelize.fn('COUNT','*'),'count']]
    })
    books.forEach(book=>{
      HotBook._getEachBookStatus(book, favors)
    })
    return books
  }

  static async _getEachBookStatus(book, favors) {
    let count = 0
    favors.forEach(favor => {
      if (favor.art_id == book.id) {
        count = favor.get('count')
      }
    })
    book.setDataValue('fav_nums', count)
    return book
  }
}

HotBook.init({
  index: Sequelize.INTEGER,
  image: Sequelize.STRING,
  author: Sequelize.STRING,
  title: Sequelize.STRING
}, {
  sequelize,
  tabName: 'hot_book'
})

module.exports = {
  HotBook
}