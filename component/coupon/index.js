// component/coupon/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    CouponDto:Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  attached: function() {
    // 在组件实例进入页面节点树时执行
    console.log(this.data.CouponDto)
    console.log("CouponDto")
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
