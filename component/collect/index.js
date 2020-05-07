// component/collect/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isSaveShop: {
      type: String,//类型
      value: 'default value'//默认值
    }

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

    //点击收藏按钮
    bindcollect() {
      let that = this
      if (that.data.isSaveShop == 0) {
        that.saveStoreRecord()
      } else {
        that.updateStoreRecord()
      }
      that.triggerEvent('eventcollect', that.data.isSaveShop)
    },
    //收藏

    saveStoreRecord: function (e) {
      let that = this
      that.setData({
        isSaveShop: 1,
      })
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        duration: 2000
      })
      let userId = wx.getStorageSync("cus_id")
      //如何调用接口
      // detailsmodel.saveStoreRecord(userId, shopId).then(
      //     res => {
      //         console.log(res)
      //         if(res.data===true){
      //             that.setData({
      //                 isSaveShop:0,
      //             })
      //             wx.showToast({
      //                 title: '收藏成功',
      //                 icon: 'success',
      //                 duration: 2000
      //             })
      //         }else {
      //             wx.showModal({
      //                 title: '提示',
      //                 content: '收藏失败，请重新尝试',
      //                 success(res) {
      //                     if (res.confirm) {
      //                         console.log('用户点击确定')
      //                     } else if (res.cancel) {
      //                         console.log('用户点击取消')
      //                     }
      //                 }
      //             })
      //         }

      //     }
      // )
    },
    //取消收藏
    updateStoreRecord: function (e) {
      let that = this
     
      that.setData({
        isSaveShop: 0,
      })
      wx.showToast({
        title: '取消收藏成功',
        icon: 'success',
        duration: 2000
      })
      let userId = wx.getStorageSync("cus_id")
      //     detailsmodel.updateStoreRecord(userId, shopId).then(
      //         res => {
      //             console.log(res)
      //             if(res.data===true){
      //                 that.setData({
      //                     isSaveShop:1,
      //                 })
      //                 wx.showToast({
      //                     title: '取消收藏成功',
      //                     icon: 'success',
      //                     duration: 2000
      //                 })
      //             }else {
      //                 wx.showModal({
      //                     title: '提示',
      //                     content: '收藏失败，请重新尝试',
      //                     success(res) {
      //                         if (res.confirm) {
      //                             console.log('用户点击确定')
      //                         } else if (res.cancel) {
      //                             console.log('用户点击取消')
      //                         }
      //                     }
      //                 })
      //             }
      //         }
      //     )

     }
    }
  })
