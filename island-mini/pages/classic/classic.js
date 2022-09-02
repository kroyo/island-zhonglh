import { getLatest, getNextOrPrevious } from '../../api/classic'

Page({
  data: {
    disLeftSrc: '/images/classic/triangle.dis@left.png',
    leftSrc: '/images/classic/triangle@left.png',
    disRightSrc: '/images/classic/triangle.dis@right.png',
    rightSrc: '/images/classic/triangle@right.png',
    classic: null,
    latest: true,
    first: false,
    likeCount: 0,
    likeStatus: false
  },
  onLoad(options) {
    this.fetchLatest()
  },
  onReady() {

  },
  onShow() {

  },
  onHide() {

  },
  onUnload() {

  },
  onShareAppMessage() {
    return {
      title: '',
    };
  },
  // 获取最新一期期刊
  fetchLatest() {
    getLatest().then(res => {
      console.log('>>>getLatest', res)
      if (!res) {
        return
      }
      this.setData({
        classic: res,
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
      // 保存最新一期的index
      wx.setStorageSync('latest', res.index)
    })
  },
  // 获取下一期期刊
  onNext(){
    console.log('>>>left')
    if (this.data.latest) {
      return
    }
    this.fetchClassic('next')
  },
  // 获取上一期期刊
  onPrevious(){
    console.log('>>>right')
    if (this.data.first) {
      return
    }
    this.fetchClassic('previous')
  },
  // 获取指定index的期刊
  fetchClassic(type) {
    const nowClassicIndex = this.data.classic.index
    getNextOrPrevious(nowClassicIndex, type).then(res => {
      console.log('>>>getNextOrPrevious', res)
      const latest = wx.getStorageSync('latest')
      this.setData({
        classic: res,
        likeCount: res.fav_nums,
        likeStatus: res.like_status,
        latest: res.index === latest,
        first: res.index === 1,
      })
    })
  }
});