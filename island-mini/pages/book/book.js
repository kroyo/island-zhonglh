import { getHotList } from '../../api/book'
Page({
  data: {
    books: [],
    searching:false,
    more:''
  },
  onLoad(options) {
    getHotList().then(res => {
      this.setData({
        books: res
      })
    })
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
});