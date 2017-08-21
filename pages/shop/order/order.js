var app = getApp();

//引入shopController
const shopController = require('../../../controller/shopController.js').controller;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    _uri: app.globalData.URI,
    orderView: {},
    total_price: 0,
    products:'',
    cart_shopId:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this
    var products = options.products
    var data = options.data
    var _cart_shopId = options.cart_shopId

    //products = '[{"product_id":14592,"product_num":1}]'
    //data = '{"code":10000,"message":"数据获取成功","total_price":6,"delivery_fee":"3.00","shop_info":{"id":"291","delivery_fee":"3.00","lowest_price":"0.00","is_set_free_shipping":"1","free_shipping_money":"20.00"},"addressInfo":{"id":"8041","mid":"12026","consignee":"hxc","address":"爱家国际城 hafkolhjfakl","zipcode":"","mobile":"18865733283","is_default":"0","addr":"山东省 德州市 德城区 爱家国际城 hafkolhjfakl"},"payments":[{"id":"4","pay_code":"alipay","pay_name":"支付宝"}],"productInfo":[{"id":"14592","type_id":"1620","product_name":"110克香山","price":"3.00","product_num":1,"itemPrice":3,"image":"/ups/Shop/2016/06/291/0d0e5c0b11e526b44af3e918cb5ebe24.jpg"}]}'


    //console.log(products)
    //console.log(data)
    var orderView = JSON.parse(data)
    //实际数字可能为整数，重新计算保留两位小数
    var total_price = orderView.total_price.toFixed(2)
    self.setData({
      orderView: orderView,
      total_price: total_price,
      products: products,
      cart_shopId: _cart_shopId
    })

  },

  /**
   * 提交订单 表单
   */
  confirmOrder: function (e) {
    var self = this
    var buyer_message = e.detail.value.message
    var payment = e.detail.value.payment
    console.log('店铺留言：' + buyer_message)
    console.log('支付方式：' + payment)

    var params = {};
    var orderView = self.data.orderView

    //支付方式
    params['payment_id'] = payment;
    //地址
    params['addr_id'] = orderView.addressInfo.id;
    //店铺id
    params['shop_id'] = orderView.shop_info.id;
    //店铺留言
    params['buyer_message'] = buyer_message;
    //商品信息
    params['products'] = self.data.products;
    //coupon_id（暂不使用）

    shopController.confirmOrder(params).then(data => {
      console.log('-----订单提交结果-----')
      console.log(data)

      //订单提交成功
      if(data.code==10000){
        //清除购物车
        self.clearCart();
        wx.showToast({
          title: '订单提交成功',
        })
        //去往订单页面
        wx.redirectTo({
          url: 'orderlist/orderlist',
        })
      }else{
        wx.showToast({
          title: '订单提交失败',
        })
      }

    })
  },

  /**
   * 清除购物车
   */
  clearCart:function(){
    var self = this
    //清除上个页面的本地购物车数据
    wx.setStorage({
      key: self.data.cart_shopId,
      data: JSON.stringify({
        count: 0,
        total: 0,
        list: {}
      }),
      success: function (res) {
        console.log('购物车清除成功')
      }
    })

    //清除内存中的购物车
    // var pages = getCurrentPages()
    // var prevPage = pages[pages.length - 1]  //当前界面
    // var prevPage = pages[pages.length - 2]  //上一个页面
    // prevPage.setData({
    //   cart:{
    //     count: 0,
    //     total: 0,
    //     list: {}
    //   }
    // })
  },

  /**
   * 支付方式变化
   */

  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  
});