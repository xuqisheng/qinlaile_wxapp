// jiazheng.js
//引入controller
const indexController = require('../../controller/indexController.js').controller;
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    _uri:app.globalData.URI,
    //轮播图
    ad_pic:[],
    //一级分类
    service_pic:[],
    //当前一级分类的索引（数组索引）
    idx:0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.showLoading({
      title: '服务加载中...',
    })
    indexController.getHomeService().then(data=>{
      wx.hideLoading()
      console.log(data)
      that.setData({
        ad_pic: data.ad_pic,
        service_pic: data.service_pic,

      })
    })

  },

  /**
   * 点击一级分类
   */
  tapService:function(e){
    var index = e.currentTarget.dataset.index;

    console.log('index = ' + index)
    var that = this

    that.setData({
      idx: index
    })
  },

  /**
   * 点击二级分类
   */
  tapSecondService:function(e){
    var id = e.currentTarget.dataset.id;
    console.log('id = ' + id)
    var that = this

    wx.navigateTo({
      url: '../index/serve/serve?serveType=' + id
    })

  },

})