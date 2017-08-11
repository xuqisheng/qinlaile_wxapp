// serve.js
var app = getApp();
//引入controller
const index = require('../../../controller/indexController.js').controller;

//引入RatingBar
const ratingBar = require('../../../lib/ratingbar.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    _uri: app.globalData.URI,
    serveList:[],
    empty:true,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var serveType = options.serveType
    //console.log(serveType)

    var that = this
    //显示进度条
    wx.showLoading({
      title: '加载中...',
    })
    //获取服务数据
    index.getServe(serveType).then(data=>{
      var temp = data.lists
      //console.log(temp)
      //隐藏进度
      wx.hideLoading()

      if(temp !== undefined && temp.length != 0){
        //console.log('setData')


        //生产评分图列表
        for (var i = 0; i < temp.length;i++){
          var score = temp[i].score
          var arr = ratingBar.rating(score)
          //将返回的图片数组，动态添加到其属性imgs
          temp[i]["imgs"] = arr;
        }
        //console.log(temp)

        //重新渲染
        that.setData({
          serveList: temp,
          empty: false,
        })
      }else{
        that.setData({
          empty: true
        })
      }

    })
  },


})