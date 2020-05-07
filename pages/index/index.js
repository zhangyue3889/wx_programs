//index.js
//获取应用实例
const app = getApp()
import { LoginModel } from '../../models/loginModel.js'

const loginModel = new LoginModel
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    pageload: false,
    couponlist: [
      {
        couponAmount: 2,
        couponName: "两元代金券（通用）",
        validDate: "2019-10-03",
        userScore: 3,
        couponId: 2,
        fullReducAmount: 5,
        exchangeScore: 20
      },
      {
        couponAmount: 2,
        couponName: "两元代金券（通用）",
        validDate: "2019-10-03",
        userScore: 3,
        couponId: 2,
        fullReducAmount: 5,
        exchangeScore: 20
      },
    ],
    bannerImgList: [
      {
        id: 22,
        path: "f8de173f343a4a5781305b3bea78c1e5.jpg",
        add_time: "2019-06-17 13:33:34",
        type: "1",
        url: "/pages/tweetdetail/tweetdetail?tweetsListId=25"
      },
      {
        id: 22,
        path: "f8de173f343a4a5781305b3bea78c1e5.jpg",
        add_time: "2019-06-17 13:33:34",
        type: "1",
        url: "/pages/tweetdetail/tweetdetail?tweetsListId=25"
      },
    ],
    telArray: {
      telNum: "17755142812",
      telImg: "../../images/icon/ys_spxqdh.png",
    },
    messagelist: [{
      content: "您的订单已支付成功，请到指定门店领取商品。",
      id: 220,
      crttime: "2019-09-23 11:35:15",
      userid: 213
    },
    {
      content: "您的订单已支付成功，请到指定门店领取商品。",
      id: 220,
      crttime: "2019-09-23 11:35:15",
      userid: 213
    }
    ],
    address: {
      province: '安徽省',
      city: '合肥合肥',
      county: '蜀山区',
    },
    region: ['广东省', '广州市', '海珠区'],
    isSaveShop: 0,
    Length: 4,        //输入框个数
    isFocus: true,    //聚焦
    Value: "",        //输入的内容



  },

  onLoad: function () {
    let that = this
    that.getPerson()

  },
  //登录授权
  getPerson() {
    let that = this
    let userid = wx.getStorageSync('cus_id');
    loginModel.isHaveHeader(userid).then(res => {
      that.setData({
        pageload: true
      })
      if (res.data == true) {
        console.log("1")
        wx.setStorageSync("hasUserInfo", "true")
        that.setData({
          hasUserInfo: wx.getStorageSync("hasUserInfo") ? wx.getStorageSync("hasUserInfo") : false
        })
      } else {
        that.Authorized()
        wx.removeStorageSync("hasUserInfo")
        console.log(wx.getStorageSync("hasUserInfo") + ">>>sss")
        that.setData({
          hasUserInfo: false
        })

      }
    })
  },
  Authorized() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  //从子组件获取用户信息
  getUserInfo: function (e) {
    let that = this
    that.setData({
      hasUserInfo: e.detail.hasUserInfo,

    })

  },
  //从子组件获取选择的省市区
  getAddres: function (e) {
    let that = this
    console.log(e.detail)
    console.log('从子组件获取选择的省市区')
    that.setData({
      address: e.detail,

    })
  },
  //自定义选择城市
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  //Oncollect獲取狀態
  Oncollect(e) {
    let that = this
    this.setData({
      isSaveShop: e.detail
    })
  },
  //核销扫码
  onscanCode(e) {
    let _that = this
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        let path = res.path    
        if (path.indexOf("scene=orderno")) {
          staffId = arr[1]
          _that.setData({
            staffId: staffId
          })
          console.log(staffId + ">>>staffId")
          if (staffId) {
            //跳转订单详情页进行销核
          } else {
            wx.showToast({
              title: "无效的二维码",
              icon: 'none',
              duration: 2000

            })
          }
        }
      },
      fail: (res) => {
        console.log(res + ">>失败")
      }

    })

  },
  Focus(e) {
    var that = this;
    console.log(e.detail.value);
    var inputValue = e.detail.value;
    that.setData({
        Value: inputValue,
    })
},
Tap() {
    var that = this;
    that.setData({
        isFocus: true,
    })
},
})
