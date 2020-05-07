// component/customer/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    telArray:Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  attached: function() {
    // 在组件实例进入页面节点树时执行
    console.log(this.data.telArray)
    console.log("telArray")
  },
  /**
   * 组件的方法列表
   */
  methods: {
//商家电话
calltell: function () {
  var that = this
  wx.makePhoneCall({
      phoneNumber: this.data.telArray.telNum,
      success: function () {
          console.log("拨打电话成功！")
      },
      fail: function () {
          console.log("拨打电话失败！")
      }

  })
},

  }
})
