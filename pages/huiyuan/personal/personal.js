// personal.js
var app = getApp()

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
  
  },

  /**
   * 退出登录
   */
  logout:function(){
    wx.showModal({
      title: '提示',
      content:'退出当前账号，该账号相关的数据将被删除',
      success: function (res) {
        if (res.confirm) {
          //清除本地存储中的所有数据
          wx.clearStorage();
          //console.log('app.globalData.mid = ' + app.globalData.mid)
          //修改内存中的值
          app.globalData.mid=''
          //console.log('app.globalData.mid = ' + app.globalData.mid)
          //跳转到首页
          wx.switchTab({
            url: '/pages/index/index'
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
})