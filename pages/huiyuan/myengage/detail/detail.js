// detail.js
const util = require('../../../../utils/util.js')
//引入controller
const serviceController = require('../../../../controller/serviceController.js').controller;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    book:{},
    formatDate:'',
    finished_time:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var book = JSON.parse(options.bookStr)
    console.log(book)
    this.setData({
      book:book,
      formatDate: util.timestampToDate(book.booking_time),
      finished_time: util.timestampToDate(book.complete_time),
    })

  },

  /**
   * 支付
   */
  formSubmit:function(e){
    var that = this
    var money = e.detail.value.money.trim()

    if (money == '') {
      wx.showToast({
        title: '请输入服务金额',
      })
      return
    }

    var payment_id = 'wxapppay';

    wx.showLoading({
      title: '支付中...',
    })
    serviceController.payBook(that.data.book.id, money, payment_id).then(data => {
      console.log(data)
      wx.hideLoading()
      if (data.code == 10000) {
        wx.showToast({
          title: '支付成功',
        })
        wx.navigateBack({})
      } else {
        wx.showToast({
          title: data.message,
        })
      }
    })
  },

  /**
   * 完成
   */
  finish: function (e) {
    var that = this
    wx.showModal({
      title: '确定完成吗？',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '操作中...',
          })

          serviceController.finishBook(that.data.book.id).then(data => {
            wx.hideLoading()
            if (data.code == 10000) {
              wx.showToast({
                title: '操作成功',
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
   * 取消预约
   */
  cancel: function (e) {
    var that = this
    wx.showModal({
      title: '确定取消吗？',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '取消中...',
          })

          serviceController.cancelBook(that.data.book.id).then(data => {
            wx.hideLoading()
            if (data.code == 10000) {
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
  comment: function (e) {
    var that = this
    wx.navigateTo({
      url: '../../repair/comment/comment?id=' + that.data.book.id + '&action=book',
    })
  },


})