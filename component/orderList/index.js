// component/orderList/index.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    orderList: {
      type: Object,//类型
      value: 'default value'//默认值
  },
  },

  /**
   * 组件的初始数据
   */
  data: {
    defaultUrl: app.globalData.defaultUrl
},
attached: function (optopns) {
  
},

  /**
   * 组件的方法列表
   */
  methods: {
    btnOrder(e){
      let that =this
      let OrderId =  e.currentTarget.dataset.id  
      let orderstate =  e.currentTarget.dataset.state  
      let myEventOption ={
        OrderId:OrderId,
        orderstate:orderstate
      }
    
      this.triggerEvent("choosebtnOrder", myEventOption );
    },
    Onevaluate(e){
      let that =this
      let orderId =  e.currentTarget.dataset.id      
       let myEventOption ={
        orderId:orderId,
       
      }
    
      this.triggerEvent("Onevaluate", myEventOption );
    }
  }
})
