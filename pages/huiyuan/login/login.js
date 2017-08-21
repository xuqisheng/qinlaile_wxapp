// login.js

//引入controller
const userController = require('../../../controller/userController.js').controller

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //用户登录信息
    mobile: '',
    code: '',
    counter: '获取验证码',
    btnCodeDisabled: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 登录表单提交
   */
  loginSubmit: function (e) {
    //获取表单中的数据
    var _mobile = e.detail.value.mobile
    var _code = e.detail.value.code

    console.log('_mobile = ' + _mobile)
    if (_mobile.length == 0 || _code.length == 0) {
      wx.showModal({
        title: '提示',
        content: '手机号或验证码不能为空',
      })
      return
    }

    userController.loginSubmit(_mobile, _code)
  },

  /**重置表单 */
  formReset: function () {
    this.setData({
      mobile: '',
      code: ''
    })
  },

  /**
   * QQ登录
   */
  qqLogin: function () {
    //跳转到首页

  },

  /**
   * 获取登录验证码
   */
  getLoginCode: function () {
    userController.getLoginCode(this);
  },

  /**
   * 手机输入完成
   */
  mobileConfirm: function (event) {
    var val = event.detail.value.trim()
    console.log('手机 = ' + val)
    this.setData({
      mobile: val
    })
  },
})