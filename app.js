//app.js
import {
  config
} from 'config.js'
import { LoginModel } from 'models/loginModel.js'
const loginModel = new LoginModel
App({
  onLaunch: function () {
    let that = this
    this.checkUpate()
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.checkSession({
      success() {
        //session_key 未过期，并且在本生命周期一直有效
        console.log("session_key 未过期，并且在本生命周期一直有效")
      },
      fail() {
        // session_key 已经失效，需要重新执行登录流程
        console.log("session_key 已经失效")
        that.login() //重新登录
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
 
    that.getLocation()
  },
  login() {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          wx.setStorageSync('js_code', res.code)
          loginModel.doFirstLogin(res.code).then(res => {
            console.log(res.data.cus_id + ">>>>cus_idcus_id>>>")
            wx.setStorageSync('cus_id', res.data.cus_id)
          })


        } else {
          console.log('登录失败！' + res.errMsg)
        }
      },
      timeout: res => {
        console.log('登录超时' + res.errMsg)
      }
    })
  },
  getLocation() {
    //经纬度 
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        console.log(res)
        console.log("ssssss")
        console.log(latitude + "----" + longitude + '----' + speed + '----' + accuracy)
        console.log("ssssss")
        wx.setStorageSync('lat', latitude)
        wx.setStorageSync('lon', longitude)

      },
      fail: function (res) {
        console.log('拒绝定位');

      }
    })

  },
  checkUpate(){
    const updateManager = wx.getUpdateManager()
    // 检测版本更新
    updateManager.onCheckForUpdate((res)=>{
      if (res.hasUpdate){
        updateManager.onUpdateReady(()=>{
          wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用',
            success(res){
              if(res.confirm){
                updateManager.applyUpdate()
              }
            }
          })
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    defaultUrl: config.imgurl,
  }
})