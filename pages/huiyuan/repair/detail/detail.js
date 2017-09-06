// detail.js
var app = getApp();
const util = require('../../../../utils/util.js')
//引入controller
const serviceController = require('../../../../controller/serviceController.js').controller;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    _uri: app.globalData.URI,
    repair:{},
    
  },

  /**
   * 取消报修
   */
  cancel:function(){
    var that = this
    wx.showModal({
      title: '确定取消吗？',
      success:function(res){
        if(res.confirm){
          wx.showLoading({
            title: '取消中...',
          })

          serviceController.cancelRepair(that.data.repair.id).then(data=>{
            wx.hideLoading()
            if(data.code==10000){
              wx.showToast({
                title: '取消成功',
              })
              wx.navigateBack({})
            } else {
              wx.showToast({
                title: data.message,
              })
            }
          })
        }
      }
    })
  },

  /**
   * 评价
   */
  comment:function(){
    var that = this
    wx.navigateTo({
      url: '../comment/comment?id='+that.data.repair.id+'&action=repair',
    })
  },


  /**
   * 支付
   */
  formSubmit:function(e){
    var that = this
    var money = e.detail.value.money.trim()

    if(money==''){
      wx.showToast({
        title: '请输入服务金额',
      })
      return
    }

    var payment_id = 'wxapppay';

    wx.showLoading({
      title: '支付中...',
    })
    serviceController.payRepair(that.data.repair.id, money, payment_id).then(data=>{
      wx.hideLoading()
      if(data.code==10000){
        wx.showToast({
          title: '支付成功',
        })
        wx.navigateBack({})
      }else{
        wx.showToast({
          title: data.message,
        })
      }
    })
  },

  /**
   * 拨打电话
   */
  call:function(e){
    var that = this
    // var mobile = e.currentTarget.dataset.mobile
    wx.makePhoneCall({
      phoneNumber: that.data.repair.property_tel,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var repairStr = options.repairStr;
    var that = this
    // reply_time
    var repair = JSON.parse(repairStr)
    repair['reply_time_format'] = util.timestampToDate(repair.reply_time)

    that.setData({
      repair: repair
    })

    console.log(that.data.repair)
  },

  
})