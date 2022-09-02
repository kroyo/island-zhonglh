const artType = {
  MOVIE:100,
  MUSIC:200,
  SENTENCE:300,
  BOOK:400
}

const imgTypeObj = {
  100: 'movie',
  200: 'music',
  300: 'essay'
}

const mMgr = wx.getBackgroundAudioManager()

Component({
  behaviors: [],
  properties: {
    // 是否是音乐
    type: {
      type: Number,
      value: artType.MOVIE,
      observer: function(val) {
        this.setData({ 
          isMusic: val === artType.MUSIC,
          imgType: imgTypeObj[val]
        })
      }
    },
    // 期刊内容
    content: {
      type: String,
      value: ''
    },
    // 期刊图片
    img: {
      type: String,
      value: ''
    },
    src: String,
    title:String
  },
  data: {
    isMusic: false, // 是否是音乐类型
    imgType: 'essay',
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png'
  },
  lifetimes: {
    created() {

    },
    attached() {
      this.resetPlayStatus()
      this._monitorSwitch()
    },
    moved() {

    },
    detached() {
    },
  },
  methods: {
    onPlay() {
      const playing = this.data.playing
      if (playing) {
        mMgr.src = this.properties.src
        mMgr.title = this.properties.title
      }else {
        mMgr.pause()
      }
      this.setData({playing: !playing})
    },
    resetPlayStatus() {
      if (mMgr.paused) {
        this.setData({
          playing: false
        })
        return
      }
      if (mMgr.src == this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },
    _monitorSwitch: function () {
      mMgr.onPlay(() => {
        this.resetPlayStatus()
      })
      mMgr.onPause(() => {
        this.resetPlayStatus()
      })
      mMgr.onStop(() => {
        this.resetPlayStatus()
      })
      mMgr.onEnded(() => {
        this.resetPlayStatus()
      })
    }
  },
});