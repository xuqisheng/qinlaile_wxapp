// detail.js
var app = getApp();
const util = require('../../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    _uri: app.globalData.URI,
    repair:{},
    
  },

  /**
   * 拨打电话
   */
  call:function(e){
    var that = this
    // var mobile = e.currentTarget.dataset.mobile
    wx.makePhoneCall({
      phoneNumber: that.data.repair.property_tel,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var repairStr = options.repairStr;
    var that = this
    // reply_time
    var repair = JSON.parse(repairStr)
    repair['reply_time_format'] = util.timestampToDate(repair.reply_time)

    that.setData({
      repair: repair
    })

    console.log(that.data.repair)
  },

  
})