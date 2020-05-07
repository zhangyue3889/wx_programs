import{HTTP} from "../utils/http-p.js"

class AddressModel extends HTTP{
  
  getareaInfo(){
    return this.request({
      url:'/area/getArea'
    })
  }
  getaddresList(userId){
  	return this.request({
      url:'/address/getAddress?userId='+userId
    })
  }
  setaddAddress(id,name,mobile,province,city,county,address,userId){
  	  return this.request({
      url: "/address/addAddress",
      method:'POST',
      data:{
        recName:name,
        recPhone:mobile,
        recProvince:province,
        recCity:city,
        recDistrict:county,
        recAddressDetail:address,
        id:id,
        userId:userId

      }

    })
  }

  setdelAddress(id){
  		return this.request({
      url:'/address/delAddress?id='+id
    })
  }
 setDefault(id,userId){
  		return this.request({
      url:'/address/setDefault?id='+id+"&userId="+userId
    })
  }
}
export {AddressModel}