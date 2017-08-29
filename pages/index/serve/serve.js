// serve.js
var app = getApp();
//引入controller
const serviceController = require('../../../controller/serviceController.js').controller;

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
    type_id:0,
  },

  // 选择当前人员
  select:function(e){
    var mid = app.globalData.mid

    //检查是否登录，否则登录
    if (mid == null || mid == '') {
      wx.navigateTo({
        url: '../../huiyuan/login/login',
      })
      return
    }
    var id = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: 'engage/engage?id=' + id + '&type_id=' + this.data.type_id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var serveType = options.serveType
    //console.log(serveType)

    var that = this
    that.setData({
      type_id: serveType
    })
    //显示进度条
    wx.showLoading({
      title: '加载中...',
    })
    //获取服务数据
    serviceController.getServe(serveType).then(data=>{
      var temp = data.lists
      // console.log(temp)
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
        // console.log(temp)

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

  // 详情页
  toDetail:function(e){
    var id = e.currentTarget.dataset.id;
    //console.log('id = '+id)
    wx.navigateTo({
      url: 'detail/detail?id='+id,
    })
  }


})