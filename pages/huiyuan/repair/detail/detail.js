// detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    repair:{},
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var repairStr = options.repairStr;
    var that = this
    that.setData({
      repair: JSON.parse(repair)
    })
  },

  
})