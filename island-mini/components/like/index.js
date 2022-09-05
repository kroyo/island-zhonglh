Component({
  behaviors: [],
  properties: {
    like: {
      type: Boolean,
      value: false
    },
    count: {
      type: Number,
      value: 0
    }
  },
  data: {
    yesSrc: 'images/like.png',
    noSrc: 'images/like@dis.png'
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
    onLike() {
      let { like, count } = this.properties
      count = like ? count - 1 : count + 1
      this.setData({
        count,
        like: !like
      })
      this.triggerEvent('like', { behavior: !like ? 'like' : 'cancel' })
    }
  },
});