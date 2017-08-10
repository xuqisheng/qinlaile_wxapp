// serve.js
var app = getApp();
//引入controller
const index = require('../../../controller/indexController.js').controller;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    _uri: app.globalData.URI,
    serveList:[],
    empty:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var serverType = options.serverType
    //console.log(serverType)

    var that = this
    //获取服务数据
    index.getServe(serverType).then(data=>{
      var temp = data.lists
      console.log(temp)

      if(temp !== undefined && temp.length != 0){
        //console.log('setData')
        that.setData({
          serveList: data.lists,
          empty:false
        })
      }

    })
  },


})