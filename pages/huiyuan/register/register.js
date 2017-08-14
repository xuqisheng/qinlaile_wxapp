// register.js

//引入controller
const index = require('../../../controller/indexController.js').controller

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    mobile:'',
    code:'',
    counter:'获取验证码',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 表单提交
   */
  formSubmit:function(){
    console.log('表单提交注册')

    //校验输入内容
    var _mobile = this.data.mobile
    var _name = this.data.name
    var _code = this.data.code

    if (_mobile == '' || _mobile.length != 11) {
      wx.showToast({
        title: '手机号码输入有误',
      })
      return
    }

    if (_name == '') {
      wx.showToast({
        title: '姓名不能为空',
      })
      return
    }

    if (_code == '') {
      wx.showToast({
        title: '验证码不能为空',
      })
      return
    }

    var that = this;
    //手机号，姓名，验证码
    index.register(_mobile, _name, _code).then(data=>{
      var msg = data.message;
      wx.showToast({
        title: msg,
      })

      console.log(data)

      var is_house_worker = data.is_house_worker;
      var mid = data.mid;
      //console.log('注册信息：is_house_worker = ' + is_house_worker + ',mid = ' + mid)

      /*异步保存
      wx.setStorage({
        key: 'mid',
        data: mid,
      })*/

      //同步方式将用户信息保存到内部存储中
      wx.setStorageSync('mid', mid)//用户唯一ID，类似token
      wx.setStorageSync('is_house_worker', is_house_worker)

      wx.setStorageSync('username',that.data.name)
      wx.setStorageSync('mobile', that.data.mobile)

      //跳转到首页
      wx.switchTab({
        url: '/pages/index/index'
      })
    })
  },

  /**
   * 获取验证码
   * 【问题】
   * 在真机上，第一次输入完成后直接点击获取验证码，会先触发获取验证码，后执行bindblur，故会先报错，手机号输入有误
   */
  getRegisterCode:function(){
    
    var that = this;
    
    var _mobile = this.data.mobile
    console.log('手机号：'+_mobile)

    if (_mobile == ''||_mobile.length!=11) {
      wx.showToast({
        title: '手机号码输入有误',
      })
      return
    }

    index.getRegisterCode(_mobile).then(data => {
      var msg = data.message;
      var code = data.code;
      console.log(msg)

      wx.showToast({
        title: msg,
      });

      //获取成功，开启倒计时
      if(code == 10000){
        let temp = 60;
        var flag = setInterval(function(){
          temp--;
          that.setData({
            counter: '重新获取（' + temp + '）'
          })
          //console.log('重新获取（' + temp+'）')

          //1分钟后清除定时器
          if(temp == 0){
            that.setData({
              counter: '获取验证码'
            })
            clearInterval(flag);
            console.log('清除定时器');
          }
        },1000)
      }
    })
    
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