import { HTTP } from "../utils/http-p.js"
const app = getApp()
class WxPayModel extends HTTP {
    Paying(param, orderId) {
        console.log(JSON.stringify(param) + ">>>param>>>")
        let that = this
        wx.requestPayment({
            timeStamp: param.timeStamp, //记住，这边的timeStamp一定要是字符串类型的，不然会报错，我这边在java后端包装成了字符串类型了
            nonceStr: param.nonceStr,
            package: param.package,
            signType: 'MD5',
            paySign: param.paySign,
            success: function (event) {
                // success
                console.log(event);
                console.log("支付成功1");

            },
            fail: function (error) {
                // fail
                console.log("支付失败")
                that.payNotSuccess(param.orderId).then(res => {
                    if (res.success == true) {
                        // todo 支付失败回调动作

                    }
                })
            },
            complete: function () {
                console.log("pay complete")
            }
        });
    }
    ///onlypay/index?total_fee=&orderId=&userId=
    onlypay(total_fee, orderId, userId) {
        let that = this
        return that.request({
            url: "/onlypay/index",
            method: 'POST',
            data: {
                total_fee: total_fee,
                orderId: orderId,
                userId: userId,
            }
        })
    }

    //支付失败和取消支付接口/pay/payNotSuccess？orderId=
    payNotSuccess(orderId) {
        let that = this
        return that.request({
            url: "/onlypay/payNotSuccess?orderid=" + orderId
        })
    }
 
}

export { WxPayModel }
//页面中如何使用.js
//import {WxPayModel} from '../../models/wxPay.js'
//const wxPayModel = new WxPayModel
//wxPayModel.doPay(res.data)