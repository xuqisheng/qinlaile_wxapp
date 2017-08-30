// addresslist.js
//引入controller
const userController = require('../../../controller/userController.js').controller

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList:[],
    empty:true
  },

  toEdit:function(e){
    var address = e.currentTarget.dataset.address
    var addressStr = JSON.stringify(address)
    wx.navigateTo({
      url: 'insert/insert?action=edit&address='+addressStr,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  onShow:function(){
    var that = this
    wx.showLoading({
      title: '加载中...',
    })

    userController.getAddressList().then(data => {
      console.log(data)
      wx.hideLoading()
      if (data.code == 10000) {
        var temp = data.lists;
        if (temp != undefined && temp != null && temp.length != 0) {
          that.setData({
            addressList: temp,
            empty: false
          })
        }

      } else {
        wx.showToast({
          title: data.message,
        })
      }
    })
  }

  
})