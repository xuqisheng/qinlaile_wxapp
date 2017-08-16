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
    provinceId:'',
    city:'选择城市',
    cityId:'',
    area:'选择区县',
    areaId:'',
    //小区名
    village:'选择小区',
    villageId:'',
    //使用picker组件
    region: ['山东省', '德州市', '德城区'],

    detailAddress:''
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
   * 选择城市
   */
  selectCity: function () {
    var that = this;

    if (that.data.provinceId==''){
      wx.showModal({
        title: '提示',
        content: '请先选择省份',
      })
      return;
    }

    wx.navigateTo({
      url: 'picker/picker?title=2&content=' + that.data.city + '&provinceId=' + that.data.provinceId,
    })
  },

  
  /**
   * 选择区县
   */
  selectArea: function () {
    var that = this;

    if (that.data.provinceId == '') {
      wx.showModal({
        title: '提示',
        content: '请先选择省份',
      })
      return;
    }

    if (that.data.cityId == '') {
      wx.showModal({
        title: '提示',
        content: '请先选择城市',
      })
      return;
    }

    wx.navigateTo({
      url: 'picker/picker?title=3&content=' + that.data.area  + '&cityId=' + that.data.cityId,
    })
  },

  /**
   * 选择小区
   */
  selectVillage: function () {
    var that = this;

    if (that.data.provinceId == '') {
      wx.showModal({
        title: '提示',
        content: '请先选择省份',
      })
      return;
    }

    if (that.data.cityId == '') {
      wx.showModal({
        title: '提示',
        content: '请先选择城市',
      })
      return;
    }

    if (that.data.areaId == '') {
      wx.showModal({
        title: '提示',
        content: '请先选择区县',
      })
      return;
    }


    wx.navigateTo({
      url: 'picker/picker?title=4&content=' + that.data.village + '&provinceId=' + that.data.provinceId + '&cityId=' + that.data.cityId,
    })
  },

  /**
   * saveAddress 绑定地址
   */
  saveAddress:function(){
    var that = this;
    if (that.data.provinceId == '') {
      wx.showModal({
        title: '提示',
        content: '请先选择省份',
      })
      return;
    }

    if (that.data.cityId == '') {
      wx.showModal({
        title: '提示',
        content: '请先选择城市',
      })
      return;
    }

    if (that.data.areaId == '') {
      wx.showModal({
        title: '提示',
        content: '请先选择区县',
      })
      return;
    }

    if (that.data.villageId == '') {
      wx.showModal({
        title: '提示',
        content: '请先选择小区',
      })
      return;
    }

    if (that.data.detailAddress==''){
      wx.showModal({
        title: '提示',
        content: '请输入详细地址',
      })
      return;
    }
    userController.saveAddress(
      that.data.provinceId,
      that.data.cityId,
      that.data.areaId,
      that.data.villageId,
      that.data.detailAddress,
    ).then(data=>{
      console.log(data)

      wx.showToast({
        title: data.message,
      })
      if(data.code==10000){
        //返回上个页面
        wx.navigateBack({
          delta:1
        })

        //小区名称village_name
        wx.setStorageSync('village_name', that.data.village)
        //小区详细address
        wx.setStorageSync('address', that.data.detailAddress)
        //城市名称city_name
        wx.setStorageSync('city_name', that.data.city)
        //区名称area_name
        wx.setStorageSync('area_name', that.data.area)
        //保存用户地址
        wx.setStorageSync('province_id', that.data.provinceId)
      }
    })
  },

  /**
   * 地址输入监听
   */
  onAddressListener: function (event){
    var val = event.detail.value.trim()
    this.setData({
      detailAddress:val,
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