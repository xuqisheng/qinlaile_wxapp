// contact.js
//引入controller
const userController = require('../../../controller/userController.js').controller
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{},
    _uri:app.globalData.URI,
  },


  //拨打电话
  call:function(){
    var mobile = this.data.info.hotline
    console.log('mobile:'+mobile)
    wx.makePhoneCall({
      phoneNumber: mobile,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    wx.showLoading({
      title: '加载中...',
    })
    userController.contactUs().then(data=>{
      wx.hideLoading()
      console.log(data)
      if(data.code==10000){
        that.setData({
          info:data
        })
      }else{
        wx.showToast({
          title: data.message,
        })
      }
    })
  },
  
})