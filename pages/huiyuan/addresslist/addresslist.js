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
    empty:true,
    mode:''
  },

  /**
   * 操作
   */
  action:function(e){
    var that = this
    var address = e.currentTarget.dataset.address
    if(that.data.mode=='view'){
      var addressStr = JSON.stringify(address)
      wx.navigateTo({
        url: 'insert/insert?action=edit&address=' + addressStr,
      })
    }else{
      //选定地址
      var pages = getCurrentPages()
      var prevPage = pages[pages.length - 1]  //当前界面
      var prevPage = pages[pages.length - 2]  //上一个页面

      prevPage.setData({
        address: address
      })
      wx.navigateBack({})
    }
    
  },

  /**
   * 插入地址
   */
  insert:function(){
    var that = this
    if (that.data.mode =='select'){
      console.log('redirectTo')
      wx.redirectTo({
        url: 'insert/insert?action=buy',
      })
    }else{
      console.log('navigateTo')
      wx.navigateTo({
        url: 'insert/insert?action=insert',
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var mode = options.mode
    console.log(mode)

    var that = this
    that.setData({
      mode:mode
    })
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
          for(let i=0;i<temp.legnth;i++){
            var address = temp[i]
            if(address.is_default==1){
              wx.setStorageSync('default_address', address.addr)
            }
          }
          that.setData({
            addressList: temp,
            empty: false
          })
        }

      } else {
        // wx.showToast({
        //   title: data.message,
        // })
        console.log('没有收货地址')
      }
    })
  }

  
})