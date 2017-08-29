// search.js
var app = getApp();

//引入shopController
const shopController = require('../../../controller/shopController.js').controller;

//引入RatingBar
const ratingBar = require('../../../lib/ratingbar.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    _uri:app.globalData.URI,
    empty:true,
    product_list: [],
    shop_list: [],

  },

  toStore:function(e){
    var shop = e.currentTarget.dataset.shop
    wx.navigateTo({
      url: '../../shop/shop?shop_id=' + shop.shop_id + '&delivery_fee=' + shop.delivery_fee + '&free_shipping_money=' + shop.free_shipping_money,
    })
  },


  // toStore: function (e) {
  //   var shop = e.currentTarget.dataset.shop
  //   wx.navigateTo({
  //     url: '../../shop/shop?shop=' + shop,
  //   })
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '搜索中...',
    })
    var that = this
    var keyword = options.keyword;
    console.log('keyword = '+keyword)

    shopController.search(keyword).then(data=>{
      var empty = true
      wx.hideLoading()
      console.log(data)
      if(data.code==10000){
        var res = data.list
        if(res!=null&&res!=undefined){
          var product_list = res.product_list
          if(product_list!=null&&product_list.length!=0){
            empty = false
          }

          var shop_list = res.shop_list
          if (shop_list != null && shop_list.length != 0) {
            empty = false
            //生产评分图列表
            for (var i = 0; i < shop_list.length; i++) {
              var score = shop_list[i].score
              var arr = ratingBar.rating(score)
              //将返回的图片数组，动态添加到其属性imgs
              shop_list[i]["imgs"] = arr;
            }
          }          

          that.setData({
            product_list: product_list,
            shop_list: shop_list
          })
        }
      }else{
        wx.showToast({
          title: data.message,
        })
      }

      that.setData({
        empty: empty
      })
    })
  },

  
})