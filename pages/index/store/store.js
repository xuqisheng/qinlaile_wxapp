// store.js

//引入controller
const index = require('../../../controller/indexController.js').controller
var app = getApp();

//引入RatingBar
const ratingBar = require('../../../lib/ratingbar.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    _uri: app.globalData.URI,
    storeList:[],
  },

  onReady:function(){
    wx.showLoading({
      title: '加载中...',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var category = options.category;
    var that = this;
    //console.log(category)

    index.getStore(category).then(data=>{
      //隐藏加载进度条
      wx.hideLoading();

      var temp = data.lists
      //生产评分图列表
      for (var i = 0; i < temp.length; i++) {
        var score = temp[i].score
        var arr = ratingBar.rating(score)
        //将返回的图片数组，动态添加到其属性imgs
        temp[i]["imgs"] = arr;
        
        var bool = temp[i].free_shipping_money == 0
        //console.log(bool)
      }
      //console.log(temp)

      //重新渲染
      that.setData({
        storeList: temp
      })

      //console.log(temp)
    })
  }
  
})