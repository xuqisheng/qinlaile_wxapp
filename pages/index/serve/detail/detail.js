// detail.js

//引入controller
const serviceController = require('../../../../controller/serviceController.js').controller;

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    var that = this
    wx.showLoading({
      title: '详情加载中...',
    })
    serviceController.getWorkerDetail(id).then(data=>{
      wx.hideLoading()
      console.log(data)
      wx.setNavigationBarTitle({
        title: data.workerInfo.name,
      })
    })
  },

  
})