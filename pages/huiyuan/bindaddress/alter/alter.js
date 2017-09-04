// bindaddress.js

//引入controller
const userController = require('../../../../controller/userController.js').controller

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //当前位置s
    address: '',
    province: '山东省',
    provinceId: '1502',
    city: '德州市',
    cityId: '1634',
    area: '选择区县',
    areaId: '',
    //小区名
    village: '选择小区',
    villageId: '',

    //areas
    areas:[],
    //communitys
    communitys:[],

    detailAddress: '',
    realname: wx.getStorageSync('username'),
    mobile: wx.getStorageSync('mobile')
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
   * 选择区县
   */
  selectArea: function () {
    var that = this;

    wx.navigateTo({
      url: '../picker/picker?title=3&content=' + that.data.area + '&cityId=1634'
    })
  },

  /**
   * 选择小区
   */
  selectVillage: function () {
    var that = this;

    if (that.data.areaId == '') {
      wx.showModal({
        title: '提示',
        content: '请先选择区县',
      })
      return;
    }


    wx.navigateTo({
      url: '../picker/picker?title=4&content=' + that.data.village + '&provinceId=1502&cityId=1634'
    })
  },

  /**
   * formSubmit 绑定地址
   */
  formSubmit: function (e) {
    var that = this;
    var realname = e.detail.value.realname
    if(realname==''){
      wx.showToast({
        title: '请输入被服务人姓名',
      })
      return
    }

    var province = wx.getStorageSync('province_id')
    var city = wx.getStorageSync('city_id')
    var area = that.data.areaId;
    var village = that.data.villageId;
    var address = that.data.detailAddress;

    if (area == '') {
      wx.showModal({
        title: '提示',
        content: '请先选择区县',
      })
      return;
    }

    if (village == '') {
      wx.showModal({
        title: '提示',
        content: '请先选择小区',
      })
      return;
    }

    if (address == '') {
      wx.showModal({
        title: '提示',
        content: '请输入详细地址',
      })
      return;
    }

    //若名称未修改，执行saveAddress
    if (realname == wx.getStorageSync('username')){
      userController.saveAddress(province, city, area, village, address).then(data => {
        console.log(data)

        wx.showToast({
          title: data.message,
        })
        if (data.code == 10000) {
          //返回上个页面
          wx.navigateBack({
            delta: 1
          })

          //保存用户地址
          wx.setStorageSync('province_id', that.data.provinceId)
          //城市名称city_name
          wx.setStorageSync('city_name', that.data.city)

          //区名称area_name
          wx.setStorageSync('area_name', that.data.area)
          //区县id，areaId
          wx.setStorageSync('area_id', area)
          //小区名称village_name
          wx.setStorageSync('village_name', that.data.village)
          //小区id，villageId
          wx.setStorageSync('village', village)
          //小区详细address
          wx.setStorageSync('address', address)
          // 保存物业信息
          wx.setStorageSync('propertyInfoId', that.data.property_user_id)


        }
      })
    //若名称已修改，执行savePersonalInfo
    }else{
      var nickname = wx.getStorageSync('nickname')
      var license_number = wx.getStorageSync('license_number')
      var headimg = ''

      userController.savePersonalInfo(headimg, realname, nickname, license_number
      , province, city, area, village, address).then(data=>{
        console.log(data)
        if (data.code == 10000) {
          //返回上个页面
          wx.navigateBack({
            delta: 1
          })

          //保存用户地址
          wx.setStorageSync('province_id', that.data.provinceId)
          //城市名称city_name
          wx.setStorageSync('city_name', that.data.city)

          //区名称area_name
          wx.setStorageSync('area_name', that.data.area)
          //区县id，areaId
          wx.setStorageSync('area_id', area)
          //小区名称village_name
          wx.setStorageSync('village_name', that.data.village)
          //小区id，villageId
          wx.setStorageSync('village', village)
          //小区详细address
          wx.setStorageSync('address', address)
          // 保存物业信息
          wx.setStorageSync('propertyInfoId', that.data.property_user_id)
          //保存用户名
          wx.setStorageSync('username', realname)
        }
      })
    }
    
  },

  /**
   * 地址输入监听
   */
  onAddressListener: function (event) {
    var val = event.detail.value.trim()
    this.setData({
      detailAddress: val,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    var area_name = wx.getStorageSync('area_name')
    var areaId = wx.getStorageSync('area_id')

    var village_name = wx.getStorageSync('village_name')
    var villageId = wx.getStorageSync('village')
    var address = wx.getStorageSync('address')

    that.setData({
      area: area_name,
      areaId: areaId,
      village: village_name,
      villageId: villageId,
      detailAddress: address
    })
    
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    
    //console.log('选择的省份province = ' + that.data.province)
    //获取当前位置（经纬度）
    wx.getLocation({
      success: function (res) {
        //console.log(res)

        //逆地址解析
        userController.getLocationName(res.latitude, res.longitude).then(data => {
          //console.log(data)

          that.setData({
            address: data.result.address
          })
        })
      }
    })
  },


})