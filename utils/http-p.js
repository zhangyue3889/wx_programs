import {
  config
} from '../config.js'
const tips = {
  1: '网络异常出现错误',
}
class HTTP {
  request({url, data = {}, method = 'GET'}){
   return  new Promise((resolve,reject)=>{
     this._request(url,resolve,reject,data,method)
    }).catch(err=>{
      reject(err)
      console.log("请求失败了",err)
      })

  }
  _request(url, resolve,reject,data={}, method='GET') {
    wx.showLoading({ title: "加载中",mask:true})
    wx.request({
      url: config.api_base_url + url,
      method: method,
      data: data,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        wx.hideLoading();
      	if(res.success===false){
      		 wx.showModal({
						title:"提示",
						content: res.message,
				 	})
      	}else{
	      	 const code = res.statusCode.toString()
	        if (code.startsWith('2')) {
	          resolve(res.data)
	        } else {
	          reject()
	          const error_code = res.data.error_code
	          this._show_error(error_code)
	        }
      	}

      },
      fail: (err) => {
        reject()
        this._show_error(1)
      },
      complete: function (res) {
        wx.hideLoading();
       }
    })
  }
  _show_error(error_code) {
    if (!error_code) {
      error_code = 1
    }
    const tip = tips[error_code]
    wx.showToast({
      title: tip?tip:tips[1],
      icon: 'none',
      duration: 2000
    })
  }
}
export {
  HTTP
}