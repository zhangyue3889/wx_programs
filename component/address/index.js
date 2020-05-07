// component/address/index.js
var model = require('../../models/area/area.js')
var show = false;
var item = {};
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    address:Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    province: '',
		city: '',
    county: '',
    item: {
			show: show
		},
  },
  attached: function (e) {
 
    var that = this
    model.updateAreaData(that, 0, e);
    that.setData({
      province:that.data.address.province,
      city:that.data.address.city,
      county:that.data.address.county
    })
    
  },
  /**
   * 组件的方法列表
   */
  methods: {
	//点击选择城市按钮显示picker-view
	translate: function(e) {
		model.animationEvents(this, 0, true, 400);
  },
  //隐藏picker-view
	hiddenFloatView: function(e) {
		console.log("id = " + e.target.dataset.id)
		model.animationEvents(this, 200, false, 400);
		//点击确定按钮更新数据(id=444是背后透明蒙版 id=555是取消按钮)
		if(e.target.dataset.id == 666) {
			this.updateShowData()
		}
	},
	//滑动事件
	bindChange: function(e) {
		model.updateAreaData(this, 1, e);
		//如果想滑动的时候不实时更新，只点确定的时候更新，注释掉下面这行代码即可。
		this.updateShowData()
  },
  	//更新顶部展示的数据
	updateShowData: function(e) {
		item = this.data.item;
		this.setData({
			province: item.provinces[item.value[0]].name,
			city: item.citys[item.value[1]].name,
			county: item.countys[item.value[2]].name
    });
    let parma ={
      province:item.provinces[item.value[0]].name,
      city: item.citys[item.value[1]].name,
			county: item.countys[item.value[2]].name
    }
    this.triggerEvent("getAddres", parma);
	},
  }
})
