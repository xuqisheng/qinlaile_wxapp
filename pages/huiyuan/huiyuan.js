// pages/huiyuan/huiyuan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _login:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'token',
      success: function(res) {
        console.log(res.data);
        console.log('用户已登录')

      },
      fail:function(){
        console.log('用户未登录')//去登录页面
        wx.setNavigationBarTitle({
          title: '登录',
        })
        that.setData({
          _login:false
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var res = wx.getStorageInfoSync()
    console.log(res.keys)
    console.log(res.currentSize)
    console.log(res.limitSize)
  },

  
})