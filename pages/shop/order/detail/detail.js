// detail.js
var app = getApp();

//引入shopController
const shopController = require('../../../../controller/shopController.js').controller;
const util = require('../../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    _uri:app.globalData.URI,
    orderDetail:{},
    //下单时间，由字符串计算得到格式化的时间
    add_time:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var orderid = options.orderid
    console.log('orderid = '+orderid)

    shopController.getOrderDetail(orderid).then(data=>{
      console.log(data)
      
      //时间日期格式化
      var timestamp = data.order_info.add_time
      var format = util.timestampToDate(timestamp)

      that.setData({
        orderDetail:data,
        add_time: format
      })
    })
  },

  
})