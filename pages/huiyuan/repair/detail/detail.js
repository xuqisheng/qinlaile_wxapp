// detail.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    _uri: app.globalData.URI,
    repair:{},
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var repairStr = options.repairStr;
    var that = this
    that.setData({
      repair: JSON.parse(repairStr)
    })

    console.log(that.data.repair)
  },

  
})