// component/getUserInfo/index.js
const app = getApp()
import { LoginModel } from '../../models/loginModel.js'

const loginModel = new LoginModel
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
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  /**
   * 组件的方法列表
   */
  methods: {


    getUserInfo: function(e) {
      let that = this
      console.log(e.detail.userInfo)
      app.globalData.userInfo = e.detail.userInfo
      //用户未授权继续保留弹窗
      if (e.detail.userInfo) {
        that.setData({
          userInfo: e.detail.userInfo,
          hasUserInfo: true,

        })
        wx.setStorageSync("hasUserInfo", "true")
        //授权信息给后台
        let nickName = e.detail.userInfo.nickName
        let headUrl = e.detail.userInfo.avatarUrl
        let userId = wx.getStorageSync('cus_id');
        loginModel.saveUserDetail(userId, nickName, headUrl).then(
          res => {
            that.getSetting()
          }
        )
      } else {
        this.setData({
          userInfo: e.detail.userInfo,
          hasUserInfo: true
        })
      }

      let parma = {
        userInfo: this.data.userInfo,
        hasUserInfo: this.data.hasUserInfo,

      }

      that.triggerEvent("getUserInfo", parma);
    },
    //授权
    getSetting() {
      let that = this
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: function(res) {
                that.setData({
                  userInfo: res.userInfo,
                  hasUserInfo: true
                })
                wx.setStorageSync("hasUserInfo", "true")
              },
              fail: res => {
                console.log(res)
                // wx.hideTabBar({})

              }
            })
          }
        }
      })
    },
  }
})