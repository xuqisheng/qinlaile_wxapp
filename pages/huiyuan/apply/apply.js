// apply.js
//引入controller
const userController = require('../../../controller/userController.js').controller

Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList:[]
  },

  //申请
  enter:function(e){
    var _type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: 'enter/enter?typeStr='+JSON.stringify(_type),
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    var that = this
    userController.getApplyTypes().then(data=>{
      wx.hideLoading()
      if(data.code==10000){
        that.setData({
          typeList: data.typeList
        })
      }else{
        wx.showToast({
          title: data.message,
        })
      }
      console.log(data)
    })
  },

  
})