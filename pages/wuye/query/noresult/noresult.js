// noresult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile:'',
    property_phonenum:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var mobile = options.mobile;
    var that = this;
    var property_phonenum = wx.getStorageSync('property_phonenum')
    var company_name = wx.getStorageSync('company_name')
    var village_name = wx.getStorageSync('village_name')

    that.setData({
      mobile: mobile,
      property_phonenum: property_phonenum,
      company_name: company_name,
      village_name: village_name
    })
  },

  /**
   * 拨打物业电话
   */
  call:function(e){
    var that = this
    wx.makePhoneCall({
      phoneNumber: that.data.property_phonenum,
    })
  }

  
})