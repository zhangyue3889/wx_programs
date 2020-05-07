import * as wxSearch from '../../component/wxSearch/wxSearch';
import { getStorage, setStorage } from '../../utils/util';
// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabData: {
      searchList: getStorage('searchList'),
      tabs: ['院校优先', '专业优先', '更多筛选'],
      hotsSearch: ['数学与应用数学', '信息与计算科学', '网络工程', '应用化学', '应用化学', '计算机科学与技术', '数学与应用数学', '信息与计算科学', '网络工程'], activeIndex: 0,
      sliderOffset: 0,
      sliderLeft: 0,
      searchIsHidden: true,
      searchAllShow: false,
      inputVal: '',
    },
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
  

  },
  onLoad: function (options) {
    //初始渲染-读取storage的历史记录
    wxSearch.init(this)
  },
  bindSearchAllShow: function (e) {
    wxSearch.bindSearchAllShow(e, this)
  },
  bindInputSchool: function (e) {
    wxSearch.bindInputSchool(e, this)
  },
  bindGoSearch: function (e) {
    wxSearch.bindGoSearch(e, this)
  },
  bindClearSearch: function () {
    wxSearch.updataLog(this,[])
  },
  bindGoSchool(e) {
    let val = e.currentTarget.dataset.item;
    wxSearch.goSchool(val)
  },
  bindDelLog(e) {
    wxSearch.bindDelLog(e, this)
  },
  bindShowLog(e) {
    wxSearch.bindShowLog(e, this)
  },
  bindHideLog(e) {
    wxSearch.bindHideLog(e, this)
  },
  bindSearchHidden() {
    wxSearch.bindSearchHidden(this)
  },
  //点击导航
  onMap(){
    //wx.getLocation获取当前的地理位置、速度。当用户离开小程序后，此接口无法调用
    //wx.chooseLocation打开地图选择位置
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success (res) {
        const latitude = res.latitude
        const longitude = res.longitude
        wx.openLocation({
          latitude,
          longitude,
          scale: 18
        })
      }
     })
  }
})