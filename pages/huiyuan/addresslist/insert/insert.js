// insert.js
//引入controller
const userController = require('../../../../controller/userController.js').controller

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    area:'选择区县',
    action:'edit',
    area_id: '',
    areas:[],
    showPopupwindow:false,
    update:false,
    detail:'',
    //当前地址
    current:'',
    locationInfo:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var action = options.action
    var title = '新增收货地址'
    if(action=='edit'){
      title = '编辑收货地址'
      var address = JSON.parse(options.address)
      that.setData({
        address: address,
        area_id:address.area_id
      })
    }

    that.setData({
      action: action
    })
    wx.setNavigationBarTitle({
      title: title,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    //获取当前位置（经纬度）
    wx.getLocation({
      success: function (res) {
        console.log(res)

        //逆地址解析
        userController.getLocationName(res.latitude, res.longitude).then(data => {
          console.log(data)

          that.setData({
            current: data.result.address,
            locationInfo: data.result.address_component
          })
        })
      }
    })
  },

  //切换至当前位置
  switchNow:function(){
    var that = this
    if (that.data.current!=''){
      that.setData({
        update:true,
        area: that.data.locationInfo.district,
        detail: that.data.locationInfo.street_number,
        //默认德城区
        area_id:'1636'
      })
    }
  },

  /**
   * 提交
   */
  formSubmit:function(e){
    var that = this
    var consignee = e.detail.value.consignee.trim()
    var mobile = e.detail.value.mobile.trim()
    var is_default = e.detail.value.is_default
    var detail = e.detail.value.detail.trim()

    // console.log('consignee = ' + consignee)
    // console.log('is_default = ' + is_default)

    if (consignee==''){
      wx.showToast({
        title: '请输入收件人姓名',
      })
      return
    }

    if (mobile == '') {
      wx.showToast({
        title: '请输入收件人电话',
      })
      return
    }

    if (detail == '') {
      wx.showToast({
        title: '请输入详细地址',
      })
      return
    }

    that.setData({
      detail:detail
    })

    if (that.data.area_id==''){
      wx.showToast({
        title: '请选择区县',
      })
      return
    }


    //山东省1502
    var province_id = wx.getStorageSync('province_id')
    //德州市
    var city_id = '1634';

    // userController.requestCity(province_id).then(data => {
    //   console.log(data)
    // })

    

    if(that.data.action=='edit'){
      userController.updateAddress(that.data.address.id, consignee, mobile, province_id, city_id, that.data.area_id,that.data.detail, is_default).then(data => {
        that.process(data)
      })
    }else{
      userController.insertAddress(consignee, mobile, province_id, city_id, that.data.area_id, that.data.detail, is_default).then(data=>{
        that.process(data)
      })
    }
  },

  process(data){
    console.log(data)
    if (data.code == 10000) {
      wx.navigateBack({
        delta:1
      });
    } else {
      wx.showToast({
        title: data.message,
      })
    }
  },

  /**
   * 选择区县
   */
  selectArea:function(){
    var city_id = '1634';
    var that = this
    if(that.data.areas.length==0){
      userController.requestArea(city_id).then(data => {
        console.log(data)
        if (data.code==10000){
          that.setData({
            areas: data.areas,
            showPopupwindow: true
          })
        }else{
          wx.showToast({
            title: data.message,
          })
        }
      })
    }else{
      that.setData({
        showPopupwindow: true
      })
    } 
  },

  //隐藏弹窗
  hidePopupwindow: function () {
    this.setData({
      showPopupwindow: false
    })
  },

  
  // 点击某个区县
  onAreaClick:function(e){
    var that = this
    var area = e.currentTarget.dataset.area
    var area_id = area.id
    if (area_id != that.data.area_id){
      // that.data.address.area_name = area.name
      that.setData({
        area: area.name,
        area_id: area_id,
        update:true
      })


      //半秒后隐藏
      setTimeout(function(){
        that.setData({
          showPopupwindow: false
        })
      },500)
    }else{
      that.setData({
        showPopupwindow: false
      })
    }
  }

  
})