// bindaddress.js

//引入controller
const userController = require('../../../controller/userController.js').controller

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //当前位置s
    address:'',
    province:'选择省份',
    city:'选择城市',
    district:'选择区县',
    //小区名
    village:'选择小区',
    //使用picker组件
    region: ['山东省', '德州市', '德城区'],


  },

  /**
   * picker组件的绑定事件
   */
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail)
    this.setData({
      region: e.detail.value
    })
  },

  /**
   * 选择省
   */
  selectProvince:function(){
    var that = this;
    wx.navigateTo({
      url: 'picker/picker?title=1&content='+that.data.province,
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    console.log('选择的省份province = ' + that.data.province)
    //获取当前位置（经纬度）
    wx.getLocation({
      success: function (res) {
        console.log(res)
        
        //逆地址解析
        userController.getLocationName(res.latitude, res.longitude).then(data=>{
          console.log(data)

          that.setData({
            address: data.result.address
          })
        })
      }
    })
  },

 
})