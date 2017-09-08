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

  wxlogin:function(){
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          console.log(res)//{errMsg: "login:ok", code: "071nTzpU1pOAJU0kjPoU1xCSpU1nTzpR"}

          /*
            【ode 换取 session_key】
            ​这是一个 HTTPS 接口，开发者服务器使用登录凭证 code 获取 session_key 和 openid。

            session_key 是对用户数据进行加密签名的密钥。为了自身应用安全，session_key 不应该在网络上传输。

            接口地址：

            https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
            请求参数：

            参数	必填	说明
            appid	是	小程序唯一标识
            secret	是	小程序的 app secret
            js_code	是	登录时获取的 code
            grant_type	是	填写为 authorization_code

            返回参数：

            参数	说明
            openid	用户唯一标识
            session_key	会话密钥
            unionid	用户在开放平台的唯一标识符。本字段在满足一定条件的情况下才返回。具体参看UnionID机制说明
           */
          //【1】通过code去自身服务器（也可通过上面接口直接取得？）换取openid
          userController.getWxOpenId(res.code).then(data=>{
            console.log(data)
          })
          //【2】通过openid登录
          //f1e1bfdcc1fe14577128778b12b1d5ba

          //【3】验证是否绑定，去往绑定页面，需要用户头像，昵称，通过app.globalData.userInfo获取

        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
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