// component/uploadImg/index.js
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
    pics: [],
    paths: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {

    upload: function (e) {
      var that = this,
          pics = this.data.pics;
      wx.chooseImage({
          count: 3 - pics.length, // 最多可以选择的图片张数，默认9
          sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
          sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
          success: function (res) {
              var imgsrc = res.tempFilePaths;
              pics = pics.concat(imgsrc);
              that.setData({
                  pics: pics
              });
            
              that.triggerEvent('eventpicpath', pics)
          },
          fail: function () {
              // fail
          },
          complete: function () {
              // complete
          }
      })

  },
  previewImage: function (e) {
      var current = e.target.dataset.src
      wx.previewImage({
          current: current,
          urls: this.data.pics
      })
  },
  // 删除图片
  deleteImage(event) {
      //获取数据绑定的data-id的数据
      const nowIndex = event.currentTarget.dataset.id
      console.log(nowIndex + ">>>nowIndex>>>")
      let that = this
      let images = that.data.pics
      images.splice(nowIndex, 1)
      that.setData({
          pics: images
      })
  },
  }
})
