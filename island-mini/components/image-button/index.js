Component({
  behaviors: [],
  options: {
    multipleSlots: true 
  },
  properties: {
    openType: {
      type: String
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
    onGetUserInfo(event){
      this.triggerEvent('getuserinfo', event.detail, {})
    }
  },
});