// create.js
//引入controller
const serviceController = require('../../../../controller/serviceController.js').controller;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    repairType:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var repairType = options.repairType
    that.setData({
      repairType: repairType
    })
    console.log('create repairType:' + repairType)
    if(repairType=='public'){
      wx.setNavigationBarTitle({
        title: '公共报修',
      })
    }else{
      wx.setNavigationBarTitle({
        title: '个人报修',
      })
      var detailAddress = wx.getStorageSync('province_name') + wx.getStorageSync('city_name')
        + wx.getStorageSync('area_name') + wx.getStorageSync('village_name') + wx.getStorageSync('address');
      that.setData({
        mobile: wx.getStorageSync('mobile'),
        address: detailAddress
      })
    }
  },

  formSubmit:function(e){
    var that = this;
    var desc = e.detail.value.desc.trim()
    if (desc == '') {
      wx.showToast({
        title: '问题描述不能为空',
      })
      return
    }
    //TODO base64转码
    var image = ''
    


    if (that.data.repairType=='public'){
      serviceController.repairSubmit(desc, image).then(data => {
        that.process(data)
      })
    }else{
      //个人提交
      var address = e.detail.value.address.trim()
      var mobile = e.detail.value.mobile.trim()
      if (address == '') {
        wx.showToast({
          title: '服务地址不能为空',
        })
        return
      }
      if (mobile == '') {
        wx.showToast({
          title: '联系电话不能为空',
        })
        return
      }

      serviceController.personalRepairSubmit(desc, image, address, mobile).then(data=>{
        that.process(data)
      })

    }
    
    
  },

  process(data){
    console.log(data)

    if (data.code == 10000) {
      // wx.showToast({
      //   title: '报修成功',
      // })
      wx.redirectTo({
        url: '../../../huiyuan/repair/repair',
      })
    } else {
      wx.showToast({
        title: data.message,
      })
    }
  },

  // 选择图片
  chooseImage:function(){

  }

  
})