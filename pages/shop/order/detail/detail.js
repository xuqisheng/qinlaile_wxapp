// detail.js
var app = getApp();

//引入shopController
const shopController = require('../../../../controller/shopController.js').controller;

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
    var that = this
    var orderid = options.orderid
    console.log('orderid = '+orderid)

    shopController.getOrderDetail(orderid).then(data=>{
      console.log(data)
    })
  },

  
})