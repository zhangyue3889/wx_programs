// component/pingStar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    stars: [0, 1, 2, 3, 4],
    normalSrc: '/images/icon/ys_pj_xx.png',
    selectedSrc: '/images/icon/pingjaixingxing-.png',
    halfSrc: '/images/icon/pingjaixingxing-.png',
    key: 0,//评分

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //点击右边,半颗星
    // selectLeft: function (e) {
    //   var key = e.currentTarget.dataset.key
    //   if (this.data.key == 0.5 && e.currentTarget.dataset.key == 0.5) {
    //     //只有一颗星的时候,再次点击,变为0颗
    //     key = 0;
    //   }
    //   console.log("得" + key + "分")
    //   this.setData({
    //     key: key
    //   })

    // },
    //点击左边,整颗星
    selectRight: function (e) {
  
      var key = e.currentTarget.dataset.key
      console.log("得" + key + "分")
      this.setData({
        key: key
      })

      var mystar =  { key: this.data.key, type: 'cancel' }
      this.triggerEvent('myeventstart', mystar)
    }
  

  }
})
