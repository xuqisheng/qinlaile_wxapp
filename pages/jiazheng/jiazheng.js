// jiazheng.js
//引入controller
const indexController = require('../../controller/indexController.js').controller;

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
    indexController.getHomeService().then(data=>{
      console.log(data)
    })
  },

  
})