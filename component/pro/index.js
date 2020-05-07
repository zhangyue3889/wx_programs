// component/pro/index.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    productList:Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    defaultUrl: app.globalData.defaultUrl,
   
  },
  ready:function(){
  console.log("产品组件")
},
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
