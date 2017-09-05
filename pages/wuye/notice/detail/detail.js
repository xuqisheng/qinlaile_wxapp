// detail.js
//引入controller
const serviceController = require('../../../../controller/serviceController.js').controller;
const util = require('../../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var id = options.id
    console.log(id)

    wx.showLoading({
      title: '加载中...',
    })
    serviceController.getNoticeDetail(id).then(data=>{
      console.log(data)

      wx.hideLoading()
      if(data.code==10000){
        var temp = data.data
        temp['formattime'] = util.timestampToDate(temp.add_time);
        that.setData({
          data: temp
        })
      }else{
        wx.showToast({
          title: data.message,
        })
      }
    })
  },

  
})