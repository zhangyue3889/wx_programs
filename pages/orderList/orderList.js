// pages/list/list.js

const app = getApp()
let userId = wx.getStorageSync("cus_id")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navlist:[
      {
      id:0,
      category_name:'全部'
    },
    {
      id:1,
      category_name:'未使用'
    },
    {
      id:2,
      category_name:'待评价'
    },
  ],
  total: 0,
  pageNum: 1,
  pageSize: 10,
  hasmoreData: true,
  hiddenloading: true,
  defaultUrl: "",
  list:[   
  ],
  orderState:"",
  onLoad:false

  },


    //分页计算
  _multipage(total, rows,list,pageSize,pageNum) {
  
    let that = this
    var newlist = list
    for (let i = 0; i < rows.length; i++) {
      newlist.push(rows[i])
    }
    if (total) {
      that.setData({
        list: newlist, 
        pageNum:pageNum+1,  
        onLoad:true     
      })    
      if (total <= 0 || pageNum * pageSize >=total) {
        that.setData({
          hasmoreData: false,
          hiddenloading: true
         
        })
      
      }

    }
  },

   //订单列表
   getOrderInfo(orderState,page){
    let that = this
    if (that.data.hasmoreData == false) {
      that.setData({
        hiddenloading: true,
        pageloading: true
      })
      return;
    } 
    //调用接口赋值total，rows OrderModel.getlist(userId,orderState,page) 
    wx.hideLoading()
    let total=4
    let rows=[{shop_id:1,good_type:2,order_state:0,pay_time:"2019-09-18 16:10:43",total_price:0.98,good_id:2,order_no:"Y20190918161038771645",good_img:"906cfe02d15249b6867635b83c84de9d.jpg",id:198,good_name:"【测试-请勿下单】一小分火锅双人套餐（请勿下单）",good_count:1,end_time:null,create_time:"2019-09-18 16:10:38",user_id:155},
    {shop_id:1,good_type:2,order_state:1,pay_time:"2019-09-18 16:10:43",total_price:0.98,good_id:2,order_no:"Y20190918161038771645",good_img:"906cfe02d15249b6867635b83c84de9d.jpg",id:198,good_name:"【测试-请勿下单】一小分火锅双人套餐（请勿下单）",good_count:1,end_time:null,create_time:"2019-09-18 16:10:38",user_id:155},
    {shop_id:1,good_type:2,order_state:2,pay_time:"2019-09-18 16:10:43",total_price:0.98,good_id:2,order_no:"Y20190918161038771645",good_img:"906cfe02d15249b6867635b83c84de9d.jpg",id:198,good_name:"【测试-请勿下单】一小分火锅双人套餐（请勿下单）",good_count:1,end_time:null,create_time:"2019-09-18 16:10:38",user_id:155},
    {shop_id:1,good_type:2,order_state:3,pay_time:"2019-09-18 16:10:43",total_price:0.98,good_id:2,order_no:"Y20190918161038771645",good_img:"906cfe02d15249b6867635b83c84de9d.jpg",id:198,good_name:"【测试-请勿下单】一小分火锅双人套餐（请勿下单）",good_count:1,end_time:null,create_time:"2019-09-18 16:10:38",user_id:155},
    {shop_id:1,good_type:2,order_state:4,pay_time:"2019-09-18 16:10:43",total_price:0.98,good_id:2,order_no:"Y20190918161038771645",good_img:"906cfe02d15249b6867635b83c84de9d.jpg",id:198,good_name:"【测试-请勿下单】一小分火锅双人套餐（请勿下单）",good_count:1,end_time:null,create_time:"2019-09-18 16:10:38",user_id:155}
  ]
    that._multipage(total,rows,this.data.list,this.data.pageSize,this.data.pageNum)

  },

//点击菜单导航
onleve(e){
  let _that =this
  let orderState = e.detail
  _that.setData({
    hasmoreData: true,
    hiddenloading: true,
    orderState:orderState,
    pageNum: 1,
    list:[]
    
  })
  _that.getOrderInfo(orderState, _that.data.pageNum)
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading()  
    wx.hideShareMenu()
    let _that =this
    let orderState = options.orderState?options.orderState:""
    _that.setData({
      orderState:orderState,
      currcent:""?"":orderState
    })

  },
  //订单详情
  choosebtnOrder(e){
    let _that =this
    let OrderId = e.detail.OrderId
    let orderstate = e.detail.orderstate    
    wx.navigateTo({ 
      url: '/pages/order/order?orderId=' +OrderId+"&orderstate="+orderstate     
       
    })
  },
  //去评价
  Onevaluate(e){
    let _that =this
    let orderId = e.detail.orderId
    wx.navigateTo({
      url: "/pages/feedService/feedService?&orderId=" + orderId
   })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideLoading();

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let _that =this
    _that.setData({
      list :[],
      hasmoreData : true,
      pageNum:1
  })
    let orderState =_that.data.orderState
    _that.getOrderInfo(orderState, _that.data.pageNum)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

 //上拉刷新
	onPullDownRefresh: function() {
    wx.showNavigationBarLoading();
     this.onLoad();
     setTimeout(function(){
         wx.hideNavigationBarLoading();
         wx.stopPullDownRefresh();
     },2000)

},

/**
* 页面上拉触底事件的处理函数
*/
onReachBottom: function() {
  let that = this  
  let total = that.data.total
  let currtotal = that.data.list.length
  let pageNum=that.data.pageNum
  if (total > currtotal) {
    console.log('进入')
    that.setData({  
      hiddenloading: false,  
      hasmoreData:true,
    })
    that.getList(pageNum)
  } else {
    console.log('没有更多数据')
    that.setData({
      hiddenloading: true,
      hasmoreData: false
    })
  }
},


onShareAppMessage: function() {

}
})