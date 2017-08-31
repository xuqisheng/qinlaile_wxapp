// complain.js
//引入controller
const userController = require('../../../controller/userController.js').controller

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 投诉建议提交表单
   */
  formSubmit:function(e){
    var title = e.detail.value.topic.trim()
    var content = e.detail.value.description.trim()

    if(title==''){
      wx.showToast({
        title: '请输入主题',
      })
      return 
    }

    if (content == '') {
      wx.showToast({
        title: '请输入内容',
      })
      return
    }

    wx.showLoading({
      title: '提交中...',
    })
    userController.complain(title,content).then(data=>{
      wx.hideLoading()
      console.log(data)

      wx.showToast({
        title: data.message,
      })
      if(data.code==10000){
        wx.navigateBack({
          delta:1
        })
      }

    })
  }
  
})