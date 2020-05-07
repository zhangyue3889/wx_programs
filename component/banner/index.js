// component/banner/index.js
const app = getApp()

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        bannerImgList: {
            type: Array,
            value: []
        },
        
    },

    /**
     * 组件的初始数据
     */
    data: {
        defaultUrl:app.globalData.defaultUrl,
    },
    attached: function (optopns) {
     
    },

    /**
     * 组件的方法列表
     */
    methods: {
        //点击banner 跳转其他页面
        goPage: function(e) {
            let url = e.currentTarget.dataset.url
            console.log(url + ">>>url")
            wx.navigateTo({
              url: url
            })
          },
    }
})
