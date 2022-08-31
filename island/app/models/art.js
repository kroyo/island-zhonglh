const { Movie, Music, Sentence } = require('./classic')
const { ArtType } = require('../lib/enum')

class Art {
  constructor(art_id, type) {
    this.art_id = art_id
    this.type = type
  }
  // 全局静态变量
  static artTypeObj = {
    [ArtType.MOVIE]: Movie,
    [ArtType.MUSIC]: Music,
    [ArtType.SENTENCE]: Sentence
  }

  // 获取期刊详情
  async getDetail(uid) {
    const { Favor } = require('./favor')
    const art = await Art.getData(this.art_id, this.type)
    if (!art) {
      throw new global.errs.NotFound()
    }
    const like = await Favor.userLikeIt(this.art_id, this.type, uid)
    return {
      art,
      like_status: like
    }
  }

  // 根据favor表中的信息获取期刊的详细数据 - 单个
  static async getData(art_id, type, useScope = true) {
    const { Book } = require('./book')
    let art = null
    const finder = {
      where: {
        id: art_id
      }
    }
    const scope = useScope ? 'bh' : null
    if (this.artTypeObj[type]) {
      art = await this.artTypeObj[type].scope(scope).findOne(finder)
      // book独立处理
      if (ArtType.BOOK == type) {
        if (!art) {
          art = await Book.create({
            id: art_id
          })
        }
      }
    }
    return art
  }
  // 获取多个期刊的详细信息
  static async getList(arts) {
    let artList = []
    // 先根据分类做数据区分
    const artInfoObj = {}
    for (let art of arts) {
      !artInfoObj[art.type] && (artInfoObj[art.type] = [])
      artInfoObj[art.type].push(art.art_id)
    }

    //各个分类遍历
    for (const key in artInfoObj) {
      if (artInfoObj[key]) {
        artList = [...artList, ...(await Art.getArtListByType(key, artInfoObj[key]))]
      }
    }
    return artList
  }

  static async getArtListByType(type, artIds) {
    let arts = []
    const finder = {
      where: {
        id: artIds
      }
    }
    const scope = 'bh'
    if (this.artTypeObj[type]) {
      arts = await this.artTypeObj[type].scope(scope).findAll(finder)
    }
    return arts
  }
}

module.exports = {
  Art
}