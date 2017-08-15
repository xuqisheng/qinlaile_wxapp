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

    _login:false,
    //用户登录信息
    mobile: '',
    code: '',
    counter: '获取验证码',
    btnCodeDisabled:false,

    //头像地址
    headimg: '',
    username:'',
    mobile:''
  },

  /**
   * 生命周期函数--监听页面显示
   * 类似安卓中的onResume，每次显示时候监听
   */
  onShow: function () {
    //console.log('onShow')

    var that = this;
    wx.getStorage({
      key: 'mid',
      success: function (res) {
        console.log(res.data);
        console.log('用户已登录')
        wx.setNavigationBarTitle({
          title: '会员',
        })
        that.setData({
          _login: true
        })

        //若用户已登录，设置用户资料
        userController.setup(that);
      },
      fail: function () {
        console.log('用户未登录')//去登录页面
        wx.setNavigationBarTitle({
          title: '登录',
        })
        that.setData({
          _login: false
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

  /**
   * 登录表单提交
   */
  loginSubmit: function () {
    userController.loginSubmit(this)
  },

  /**
   * QQ登录
   */
  qqLogin:function(){
    //跳转到首页
    
  },

  /**
   * 获取登录验证码
   */
  getLoginCode: function () {
    userController.getLoginCode(this);
  },

  /**
   * 手机号码输入完成
   * 使用bindblur绑定，获取输入的内容,type为text时，也可通过bindconfirm，
   */
  mobileConfirm: function (event) {
    var val = event.detail.value.trim()
    console.log('手机号 = ' + val)
    this.setData({
      mobile: val
    })
  },

  /**
   * 验证码
   */
  codeConfirm: function (event) {
    var val = event.detail.value.trim()
    console.log('验证码 = ' + val)
    this.setData({
      code: val
    })
  },
    
})