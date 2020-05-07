// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {id:33,is_groupbuy:"1",goods_price:0.01,crttime:"2019-09-17 22:53:39",goods_name:"【买1发7罐】牛肉干 内蒙古超干手撕风干牛肉干 正宗小零食特产",preview_img:"d47966fdc6a146aa95928589275ef0de.png"},
      {id:32,is_groupbuy:"1",goods_price:0.01,crttime:"2019-09-17 22:41:42",goods_name:"网红中秋零食大礼包女生一箱整小吃吃的休闲小食品空投箱散装自选",preview_img:"1823df3e0c91418a9ff452e56de5824d.png"},
      {id:30,is_groupbuy:"0",goods_price:0.10,crttime:"2019-09-17 22:17:58",goods_name:"知味观绿豆糕盒装杭州特产桂花绿豆饼糕点好吃的传统美食抹茶零食",preview_img:"b699961f8cd248ea97bbf6641ba482eb.png"},
      {id:33,is_groupbuy:"1",goods_price:0.01,crttime:"2019-09-17 22:53:39",goods_name:"【买1发7罐】牛肉干 内蒙古超干手撕风干牛肉干 正宗小零食特产",preview_img:"d47966fdc6a146aa95928589275ef0de.png"},
      {id:32,is_groupbuy:"1",goods_price:0.01,crttime:"2019-09-17 22:41:42",goods_name:"网红中秋零食大礼包女生一箱整小吃吃的休闲小食品空投箱散装自选",preview_img:"1823df3e0c91418a9ff452e56de5824d.png"},
      {id:30,is_groupbuy:"0",goods_price:0.10,crttime:"2019-09-17 22:17:58",goods_name:"知味观绿豆糕盒装杭州特产桂花绿豆饼糕点好吃的传统美食抹茶零食",preview_img:"b699961f8cd248ea97bbf6641ba482eb.png"},
      {id:33,is_groupbuy:"1",goods_price:0.01,crttime:"2019-09-17 22:53:39",goods_name:"【买1发7罐】牛肉干 内蒙古超干手撕风干牛肉干 正宗小零食特产",preview_img:"d47966fdc6a146aa95928589275ef0de.png"},
      {id:32,is_groupbuy:"1",goods_price:0.01,crttime:"2019-09-17 22:41:42",goods_name:"网红中秋零食大礼包女生一箱整小吃吃的休闲小食品空投箱散装自选",preview_img:"1823df3e0c91418a9ff452e56de5824d.png"},
      {id:30,is_groupbuy:"0",goods_price:0.10,crttime:"2019-09-17 22:17:58",goods_name:"知味观绿豆糕盒装杭州特产桂花绿豆饼糕点好吃的传统美食抹茶零食",preview_img:"b699961f8cd248ea97bbf6641ba482eb.png"},
      {id:33,is_groupbuy:"1",goods_price:0.01,crttime:"2019-09-17 22:53:39",goods_name:"【买1发7罐】牛肉干 内蒙古超干手撕风干牛肉干 正宗小零食特产",preview_img:"d47966fdc6a146aa95928589275ef0de.png"},
      {id:32,is_groupbuy:"1",goods_price:0.01,crttime:"2019-09-17 22:41:42",goods_name:"网红中秋零食大礼包女生一箱整小吃吃的休闲小食品空投箱散装自选",preview_img:"1823df3e0c91418a9ff452e56de5824d.png"},
      {id:30,is_groupbuy:"0",goods_price:0.10,crttime:"2019-09-17 22:17:58",goods_name:"知味观绿豆糕盒装杭州特产桂花绿豆饼糕点好吃的传统美食抹茶零食",preview_img:"b699961f8cd248ea97bbf6641ba482eb.png"}
    ]
  },
  //获取产品列表
  getList(){
    let that = this
    if (that.data.hasmoreData == false) {
      that.setData({
        hiddenloading: true,
        pageloading: true
      })
      return;
    } 
    //调用接口赋值total，rows   
    wx.hideLoading()
    let total
    let rows
    that._multipage(total,rows,this.data.list,this.data.pageSize,this.data.pageNum)

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
      })
      if (total <= 0 || pageNum * pageSize >=total) {
        that.setData({
          hasmoreData: false,
          hiddenloading: true
        })
      
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that =this
    let pageNum=that.data.pageNum
    that.setData({  
      hiddenloading: false,  
      hasmoreData:true,
    })
    that.getList(pageNum)
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
  //下拉刷新
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
     this.onLoad();
     setTimeout(function(){
         wx.hideNavigationBarLoading();
         wx.stopPullDownRefresh();
     },2000)
  },
  onReachBottom: function () {
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})