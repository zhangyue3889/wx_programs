
var show = false;
var item = {};

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		item: {
			show: show
		},
		total: 2,
		empty: false,
		posting: false,
		customItem: '全部',
		addressList: [
			{
				id:"1",
				rec_name :"张三",
				rec_phone:"18900363326",
				address_detail :"安徽省合肥市蜀山区井岗镇CBC拓基广场B座1901 -1906室",
				is_default:"current",
				rec_province:"背景",
				rec_city:"上海",
				rec_district:"蜀山"
				   
			},
			{
				id:"21",
				rec_name :"张2",
				rec_phone:"18900363326",
				address_detail :"安徽省合肥市蜀山区井岗镇CBC拓基广场B座1901 -1906室",
				is_default:"",
				rec_province:"安徽",
				rec_city:"合肥",
				rec_district:"蜀山"
				   
			},
		],
		transportIndex: 0,
		name: '',
		phone: '',
		valueaddress: '',
		updataid: '',
		id:'',
		region: ['安徽', '合肥', '蜀山'],
		
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {  
		
		
		wx.hideShareMenu()
		let that = this
		console.log(this.data.userId+">>userId>>")
		that._onload()
	},
	  onShow: function () {
		that._onload()
  },
	_onload() {
		wx.showLoading()
	let userId = wx.getStorageSync('userId')
		// addressModel.getaddresList(userId).then(res => {	
		// if(res.data.length > 0) {
		// 	console.log(res.data.length)
		// 	this.setData({
		// 		empty: false,
		// 		addressList: res.data
		// 	})	
		// }else{
		// this.setData({			
		// 	empty: true,			
		// })
		// }
	
		// })
		wx.hideLoading()
  		
	},
	onPitch(e) {

	},

	onWrite(e) {
		this.setData({
			posting: true,
			name: "",
			phone: "",
			valueaddress: "",
			updataid:"",
		})
	},
	delAddress(e) {   
		var addressList = this.data.addressList
		var that = this
		var itemId = e.currentTarget.dataset.id	
    let userId = wx.getStorageSync('userId')
		wx.showModal({
			content: '确定删除地址',
			confirmColor: '#FF554A',
			cancelColor: '#7C7C7C',
			success(res) {
				// if(res.confirm) {					
				// addressModel.setdelAddress(itemId,userId)
				// 	.then(res=>{
				// 		addressModel.getaddresList(userId)
				// 		.then(res=>{
				// 			console.log(res.data.length)
				// 		if (res.data.length >  0) {    
				// 				that.setData({     
				// 					addressList:res.data ,									  
				// 				})
				// 			} 
				// 			else  {    
				// 				that.setData({     
				// 					addressList:addressList,
				// 					empty: true,
				// 				})
				// 			}
				// 		})					
			
				// 	})
		
				// 	//addressList.splice(e.currentTarget.dataset.id,  1)  
			

				// }
			}
		})

	},
	onClose(e) {
		this.setData({
			posting: false,
			updataid:""
		})
	},
	bindRegionChange: function(e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			region: e.detail.value
		})
	},

	onReady: function(e) {
		var that = this

	},

	onShow: function() {

	},



	//更新顶部展示的数据
	updateShowData: function(e) {
		item = this.data.item;
		this.setData({
			province: item.provinces[item.value[0]].name,
			city: item.citys[item.value[1]].name,
			county: item.countys[item.value[2]].name
		});
	},
	saveAddress: function(e) {
		var warn = "";
		var that = this;
		var flag = false;
		var name = e.detail.value.consignee
		var mobile = e.detail.value.mobile
		var province = this.data.province
		var city = this.data.city
		var county = this.data.county
		var address = e.detail.value.address

		if(name == "") {
			warn = "请填写您的姓名！";
		} else if(mobile == "") {
			warn = "请填写您的手机号！";
		} else if(!(/^1(3|4|5|7|8)\d{9}$/.test(mobile))) {
			warn = "手机号格式不正确";
		} else if(address == "") {
			warn = "请输入您的具体地址";

		} else {
			flag = true;
			console.log(id + 'name' + name + 'mobile' + province + 'province' + city + 'city' + county + 'county' + address + 'address')
			var id = this.data.updataid
			let userId = wx.getStorageSync('userId')
			console.log(this.data.updataid+">>this.data.updataid>>")
			// addressModel.setaddAddress(id, name, mobile, province, city, county, address,userId)
			// 	.then(res => {
			// 		console.log(res)
			// 	if(id){
			// 		wx.showToast({
			// 			title: '修改地址成功',
			// 			icon: 'none'
			// 		})
			// 		id=""
			// 		}else{
			// 			wx.showToast({
			// 			title: '地址添加成功',
			// 			icon: 'none'
			// 		})
					
			// 		}
			// 	let userId = wx.getStorageSync('userId')
			// 		addressModel.getaddresList(userId).then(res => {
			// 			this.setData({
			// 				empty: false,
			// 				addressList: res.data,
			// 				posting: false,
							
			// 			})
			// 		})
			// 	})

			// var arr = wx.getStorageSync('addressList') || []
			//console.log("arr,{}", arr)
			// let addressList = {
			//   consignee: consignee,
			//   mobile: mobile,
			//   address: provinceName + address,

			//   }
			//  arr.push(addressList);
			//   wx.setStorageSync('addressList', arr)
			//  wx.navigateBack({

			// })
		}
		if(flag == false) {
			wx.showModal({
				title: '提示',
				content: warn
			})
		}

	},

	onEditor(e) {
		var id = e.currentTarget.dataset.id
			var rec_name = e.currentTarget.dataset.name
		var rec_phone = e.currentTarget.dataset.phone
		var rec_province = e.currentTarget.dataset.province
		var rec_city = e.currentTarget.dataset.city
		var rec_county = e.currentTarget.dataset.county
		var address_detail = e.currentTarget.dataset.address
		let region=[]
		region.push(rec_province)
		region.push(rec_city)
		region.push(rec_county)
		this.setData({
			posting: true,
			region:region,
			name: rec_name,
			phone: rec_phone,
			valueaddress: address_detail,
			updataid: id
		})
		console.log(this.data.valueaddress+"adasdas"+e.currentTarget.dataset)
		console.log(e.currentTarget.dataset)
	},
	onDefalut(e) {
		let itemId = e.currentTarget.dataset.id
		let is_default = "addressList[" + itemId + "].is_default"
		let addresstArr = this.data.addressList
		let userId = wx.getStorageSync('userId')
		// addressModel.setDefault(itemId,userId).then(res=>{	
		// 		let userId = wx.getStorageSync('userId')
		// 			addressModel.getaddresList(userId).then(res=>{
		// 				console.log(res.data)
		// 				this.setData({
		// 					addressList:res.data  
		// 				})
		// 			})
		// })			
	},
onBack: function(e) {
    let that =this
		let pages = getCurrentPages()
		let prevPage = pages[pages.length - 2]
		let itemId = e.currentTarget.dataset.id
		let index =e.currentTarget.dataset.index
		console.log(that.data.addressorder+">>>addressIdback>>")
			let userId = wx.getStorageSync('userId')
	  //      addressModel.setDefault(itemId,userId).then(res=>{	
		// 			addressModel.getaddresList(userId).then(res=>{
		// 				console.log(res.data+">>onback>>")				
		// 				prevPage.setData({
		// 				id: index,
		// 				posting: false,
		// 				address:that.data.addressList[index].address_detail,
		// 				post:res.data,
		// 				addressorder:that.data.addressList[index],
		// 				addressId:that.data.addressList[index].id
			
		// 			})
		// 			})
		// })


		wx.navigateBack({
			delta: 1
		})
	},
	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})