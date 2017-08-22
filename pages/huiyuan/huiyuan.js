// pages/huiyuan/huiyuan.js

//引入controller
const userController = require('../../controller/userController.js').controller

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    _uri:app.globalData.URI,

    mid:'',

    //头像地址
    headimg: '',
    username:'',
    mobile:'',

    //小区名称
    village_name:'没有绑定小区，请绑定地址',
    //小区地址信息
    city_name:'',
    area_name:'',
    address:'',

    xq_addr:'请绑定地址',
  },

  tologin:function(){
    //跳转登录页面
    wx.navigateTo({
      url: 'login/login',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   * 类似安卓中的onResume，每次显示时候监听
   */
  onShow: function () {
    var that = this;

    that.setData({
      mid: app.globalData.mid
    })
    
    console.log('onShow:that.data.mid = ' + that.data.mid)

    if(that.data.mid){
      userController.setup(that)
    }


  },

  /**
   * 若未绑定，去往绑定页面，否则去往编辑（退出登录页面）
   * bindOrEidtAddress
   */
  bindOrEidtAddress:function(){

    //去往绑定页面
    var _url = 'bindaddress/bindaddress'

    wx.getStorage({
      key: 'village_name',
      success: function (res) {
        console.log('已绑定')
        //若已绑定,去往编辑
        if (res.data != '' && res.data != null) {
          _url = 'personal/personal'
        }

        wx.navigateTo({
          url: _url,
        })
      },
      fail:function(res){
        console.log('未绑定')
        wx.navigateTo({
          url: _url,
        })
      }
    })
  },

  /**
   * 前往个人设置页面
   */
  profile:function(){
    wx.navigateTo({
      url: 'personal/personal',
    })
  },

})