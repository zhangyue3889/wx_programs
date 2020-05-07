// component/nav/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    levelList: {
      type: Object,//类型
      value: 'default value'//默认值
  },
  blockcss:String,
  currcent:Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },

  /**
   * 组件的方法列表
   */
  methods: {
    Onleve(e){
      let _that =this
     let  leveId = e.currentTarget.dataset.id
     let  index = e.currentTarget.dataset.index
      _that.setData({
        currcent:index
      })
      _that.triggerEvent("leveEvent", leveId );
    }
  }
})
