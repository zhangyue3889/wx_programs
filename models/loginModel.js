import {
    HTTP
} from "../utils/http-p.js"

class LoginModel extends HTTP {
    //首次登陆
    doFirstLogin(js_code) {
        return this.request({
            url: "/akman-rest/appCus/doFirstLogin?js_code=" + js_code
        })
    }
//判断是否数据库已有头像
isHaveHeader(cusId) {
    return this.request({
        url: "/akman-rest/appCus/isHaveHeader?cusId=" + cusId
    })
}
//保存昵称和头像
    saveUserDetail(userId, nickName, headUrl) {
        return this.request({
            url: "/akman-rest/appCus/saveNameAndUrl?cusId="+userId+"&nickName="+nickName+"&headUrl="+headUrl
        })
    }


}

export {
  LoginModel
}