import {
    config
} from '../../config.js'
const app = getApp()

let userId = wx.getStorageSync("cus_id")

let goodId
let orderId
let shopId
let goodType
Page({

    /**
     * 页面的初始数据
     */
    data: {
        TextAreaNum: 0,
        pics: [],
        paths: '',
        content: '',
        porlist: [],
        recommendScore: "",
        orderTit: {},
        defaultUrl: "",
    },
    bindTextAreaNum(e) {
        let that = this
        that.setData({
            TextAreaNum: e.detail.value.length
        })

    },
    //获取点星
    getmystart(e) {
        let _that = this
        _that.setData({
            recommendScore: e.detail.key
        })
    },
    //获取上传图片路径
    getPicpath(e){
        let _that = this
        console.log("获取上传图片路径")
        console.log(e.detail)
        _that.setData({
            pics: e.detail
        })   
    },
    //校验信息
    formSubmit: function (e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
        console.log(this.data.pics)
        let that = this
       
        let recommendScore = that.data.recommendScore
        // let content = encodeURI(encodeURI(e.detail.value.describe))
         //特殊字符加密传入后台
        let content = encodeURI(e.detail.value.describe)
        console.log(content)
        // let imgList=that.paths
        that.setData({
            recommendScore: recommendScore,
            content: content
        })
        let pics = this.data.pics
        if (recommendScore == '') {
            wx.showModal({
                title: "提示",
                content: '请选择推荐指数',
            })
        } else if (content == '') {
            wx.showModal({
                title: "提示",
                content: '请填写描述',
            })
        } else {
            if (pics.length > 0) {
                wx.showToast({
                    title: '正在上传...',
                    icon: 'loading',
                    mask: true,
                    duration: 1000
                })
                that.uploadimg({
                    url: 'https://www.yiheduofuwu.com/xcx-rest/file/fileUpload', //这里是你图片上传的接口
                    path: pics //这里是选取的图片的地址数组
                }, content, recommendScore);
            } else {
               that.saveFile(content, recommendScore)
           
            }

        }


    },
//保存评价
    saveFile(content, recommendScore) {
        //userId,content,contactInfo,imgList
        let that = this
        let imgList = that.data.paths
        let userId = wx.getStorageSync('cus_id');
        fileModel.commitEvaluate(userId, recommendScore, content, goodId, imgList,shopId,goodType,orderId).then(res => {
            if (res.success == true) {
                wx.showToast({
                    title: '成功',
                    icon: 'success',
                    duration: 5000,
                    success(res) {
                        wx.reLaunch({
                            url: '/pages/index/index',
                        })
                    }
                })
            } else {
                wx.showModal({
                    title: "提示",
                    content: res.data,
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let _that = this
        _that.setData({
            defaultUrl: app.globalData.defaultUrl
        })
        orderId = _that.options.orderId ? _that.options.orderId : "8"
        _that.getOrderInfo()
        console.log(options)
    },
    //多张图片上传
    uploadimg: function (data, content, recommendScore) {
        let that = this
        console.log('>>data>>>0' + data)
        let i = data.i ? data.i : 0, //当前上传的哪张图片
            success = data.success ? data.success : 0, //上个数
            fail = data.fail ? data.fail : 0; //上传失败的个数
        wx.uploadFile({
            url: data.url,
            filePath: data.path[i],
            name: 'file', //这里根据自己的实际情况改
            formData: null, //这里是上传图片时一起上传的数据
            success: (resp) => {
                success++; //图片上传成功，图片上传成功的变量+1
                console.log(resp.data)
                let data = JSON.parse(resp.data)
                if (data.success == false) {
                    wx.showModal({
                        title: "提示",
                        content: data.message,
                    })
                } else {
                    var paths = that.data.paths;
                    var imgsrc = data.data;
                    paths = paths + "," + imgsrc;
                    that.setData({
                        paths: paths
                    });
                }

            },
            fail: (res) => {
                fail++; //图片上传失败，图片上传失败的变量+1
                console.log('fail:' + i + "fail:" + fail);
            },
            complete: () => {
                console.log(i + "i");
                i++; //这个图片执行完上传后，开始上传下一张
                if (i == data.path.length) { //当图片传完时，停止调用
                    console.log('执行完毕');
                    console.log('成功：' + success + " 失败：" + fail);
                    this.saveFile(content, recommendScore);
                    console.log(">>pathskkkk>>" + this.data.paths)

                } else { //若图片还没有传完，则继续调用函数
                    console.log(i + "i");
                    data.i = i;
                    data.success = success;
                    data.fail = fail;
                    that.uploadimg(data, content, recommendScore);
                }

            }
        })
    },
//根据订单号获取订单详情
    getOrderInfo: function () {
        let that = this
        ordermodel.getOrderInfo(orderId).then(res => {
            console.log(res)
            if (res.success === true) {
                let orderTitlist = that.data.orderTit
                let orderItemlist = that.data.orderItem
                let orderState = that.data.orderState
                orderTitlist.goodImg = res.data.goodImg
                orderTitlist.goodName = res.data.goodName
                orderTitlist.endTime = res.data.shopName
                        shopId=res.data.shopId
                        goodId=res.data.goodId
                goodType=res.data.goodType
                that.setData({
                    orderTit: orderTitlist,
                })
            }
        })
    },

})