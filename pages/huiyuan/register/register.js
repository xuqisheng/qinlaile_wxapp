// register.js

//引入controller
const userController = require('../../../controller/userController.js').controller

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    mobile:'',
    code:'',
    counter:'获取验证码',
    btnCodeDisabled: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 表单提交
   */
  registerSubmit:function(){
    userController.registerSubmit(this);
  },

  /**
   * 获取验证码
   * 【问题】
   * 在真机上，第一次输入完成后直接点击获取验证码，会先触发获取验证码，后执行bindblur，故会先报错，手机号输入有误
   */
  getRegisterCode:function(){
    userController.getRegisterCode(this);
  },

  /**
   * 姓名输入完成
   * 使用bindblur绑定，获取输入的内容,type为text时，也可通过bindconfirm，
   * 最好的方式，使用bindinput,类似安卓的TextWatcher，实时监听输入
   */
  nameConfirm:function(event){
    var val = event.detail.value.trim()
    console.log('姓名 = '+val)
    this.setData({
      name:val
    })
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

  /**
   * 验证码输入完成
   */
  codeConfirm: function (event) {
    var val = event.detail.value.trim()
    console.log('验证码 = ' + val)
    this.setData({
      code: val
    })
  },

})