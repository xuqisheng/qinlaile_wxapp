// enter.js
//引入controller
const userController = require('../../../../controller/userController.js').controller

Page({

  /**
   * 页面的初始数据
   */
  data: {
    applyType:{},

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _type = JSON.parse(options.typeStr)
    console.log(_type)
    var that = this
    that.setData({
      applyType:_type
    })
  },

  //表单提交
  formSubmit:function(e){
    var that = this
    var switch_status = e.detail.value.switch
    //是否同意入驻协议
    if (!switch_status){
      wx.showToast({
        title: '请阅读并同意入驻协议',
      })
      return
    }

    var companyName = e.detail.value.companyName.trim()
    var name = e.detail.value.name.trim()
    var mobile = e.detail.value.mobile.trim()
    var IDcard = e.detail.value.IDcard.trim()

    if(companyName==''){
      wx.showToast({
        title: '单位名称不能为空',
      })
      return
    }

    if (name == '') {
      wx.showToast({
        title: '负责人名不能为空',
      })
      return
    }

    if (mobile == '') {
      wx.showToast({
        title: '联系方式不能为空',
      })
      return
    }

    if (IDcard == '') {
      wx.showToast({
        title: '身份证号不能为空',
      })
      return
    }

    //身份证正面，身份证反面，营业执照副本
    var imgInfo = '*****imgInfo'

    //若为物业类型
    if(that.data.applyType.id==2){
      //邮箱
      var email = e.detail.value.email.trim()
      if (email == '') {
        wx.showToast({
          title: '邮箱不能为空',
        })
        return
      }

      wx.showLoading({
        title: '提交中...',
      })
      userController.submitProperty(name, companyName, mobile, IDcard, imgInfo,email).then(data=>{
        that.process(data)
      })
      //若为在线小店
    } else if (that.data.applyType.id == 3) {
      //补充资料和质检报告
      var permit_license = '*****permit_license'
      var extra_info = '*****extra_info'
      wx.showLoading({
        title: '提交中...',
      })
      userController.submitOnlineStore(name, companyName, mobile, IDcard, imgInfo, permit_license, extra_info).then(data => {
        that.process(data)
      })
      //若为家政公司
    }else{
      userController.submitHomeService(name, companyName, mobile, IDcard, imgInfo).then(data => {
        that.process(data)
      })
    }

  },

  //处理提交结果
  process(data){
    console.log(data)
    wx.hideLoading()
    if(data.code==10000){
      wx.showToast({
        title: '提交成功',
      })
      wx.navigateBack({
        delta:1
      })
    }else{
      wx.showToast({
        title: data.message
      })
    }
  }

  
})