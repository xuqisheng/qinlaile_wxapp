// team.js
//引入controller
const userController = require('../../../controller/userController.js').controller
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _uri: app.globalData.URI,
    pics:[],
    info: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    userController.getTeamInfo().then(data=>{
      // console.log(data)
      wx.hideLoading()
      
      var info = app.convertHtmlToText(data.info)
      if(data.code==10000){
        that.setData({
          pics:data.pics,
          info:info,
        })
      }else{
        wx.showToast({
          title: data.message,
        })
      }
    })
  },

  
})