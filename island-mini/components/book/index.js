Component({
  behaviors: [],
  properties: {
    book:Object,
    showLike:{
      type:Boolean,
      value:true
    }
  },
  data: {

  },
  lifetimes: {
    created() {

    },
    attached() {

    },
    moved() {

    },
    detached() {

    },
  },
  methods: {
    onTap(event){
      const bid = this.properties.book.id
      wx.navigateTo({
        url:`/pages/book-detail/book-detail?bid=${bid}`
      })
      // 降低了组件的通用性
      // 非常方便
      // 服务于当前的项目 项目组件
      // 
    }
  },
});