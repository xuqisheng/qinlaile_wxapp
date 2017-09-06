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
    add_time:'',
    //订单id
    order_id:'',

    //评分
    score:0,
    stars:[]
  },

  /**
   * 店铺评分
   */
  countStar:function(e){
    var that = this
    var score = e.currentTarget.dataset.index+1
    console.log('score = '+score)

    var comment = that.data.orderDetail.comment
    if(comment.length==0){
      var stars = that.rating(score)
      that.setData({
        score:score,
        stars: stars
      })
    }

  },

  //评分方法
  rating(pingfen) {

    var that = this,　//这里是图片的路径，自己需要改
      data = {
        //从使用评分控件的目录算起
        ling: "../../../../res/icon/star_empty.png",
        zheng: "../../../../res/icon/star_full.png",
        ban: "../../../../res/icon/star_half.png"
      },
      nums = []; //这里是返回图片排列的顺序的数组，这里要注意在页面使用的时候图片的路径，不过使用网络图片无所谓

    if ((pingfen / 0.5) % 2 == 0) {//如果评分为整数，如4.0、5.0
      for (var i = 0; i < 5; i++) {
        if (i < pingfen) {
          nums.push(data.zheng);
        } else {
          nums.push(data.ling);
        }
      }
    } else {//评分不为整数，如3.5、2.5
      for (var i = 0; i < 5; i++) {
        if (i < pingfen - 0.5) {
          nums.push(data.zheng);//先把整数分离出来，如：3.5，这里就是先把3分离出来，把代表1的图片放进去
        } else if (i == (pingfen - 0.5)) {
          nums.push(data.ban);//把小数的部分分离出来，如：3.5里的0.5，把代表0.5的图片放进去
        } else {
          nums.push(data.ling);//然后剩下的就是没有满的用代表0的图片放进去，如：3.5，里面放进去了3个代表1的图片，然后放入了1个代表0.5的图片，最后还剩一个图片的位置，这时候就放代表0的图片
        }
      }
    }


    return nums;
  },

  /**
   * 取消订单
   */
  cancel:function(){
    var that = this
    wx.showModal({
      title: '确定取消吗？',
      success:function(res){
        if(res.confirm){
          wx.showLoading({
            title: '取消中...',
          })
          shopController.cancel(that.data.order_id).then(data=>{
            wx.hideLoading()
            if(data.code==10000){
              wx.showToast({
                title: '取消成功',
              })
              //回退页面
              wx.navigateBack({})
            }else{
              wx.showToast({
                title: data.message,
              })
            }
          })
        }
      }
    })
  },

  /**
   * 确认收货
   */
  confirm: function () {
    var that = this
    wx.showModal({
      title: '确定收到商品了吗？',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '确认收货中...',
          })
          shopController.confirm(that.data.order_id).then(data => {
            wx.hideLoading()
            if (data.code == 10000) {
              wx.showToast({
                title: '收货成功',
              })
              //回退页面
              wx.navigateBack({})
            } else {
              wx.showToast({
                title: data.message,
              })
            }
          })
        }
      }
    })
  },

  /**
   * 店铺评分
   */
  comment: function () {
   
    var that = this
    var score = that.data.score
    
    wx.showLoading({
      title: '提交中...',
    })
    shopController.comment(that.data.order_id, score).then(data => {
      wx.hideLoading()
      if (data.code == 10000) {
        wx.showToast({
          title: '提交成功',
        })
        //回退页面
        wx.navigateBack({})
      } else {
        wx.showToast({
          title: data.message,
        })
      }
    })
  },

  /**
   * 支付
   */
  pay: function () {
    //支付方式
    var payway = 'appwxpay'

    var that = this
    wx.showLoading({
      title: '支付中...',
    })
    shopController.pay(that.data.order_id, payway).then(data => {
      wx.hideLoading()
      if (data.code == 10000) {
        wx.showToast({
          title: '支付成功',
        })
        //回退页面
        wx.navigateBack({})
      } else {
        wx.showToast({
          title: data.message,
        })
      }
    })
  },


  /**
   * 打电话
   */
  call: function (e) {
    var that = this
    var mobile = e.currentTarget.dataset.tel
    wx.makePhoneCall({
      phoneNumber: mobile
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var order_id = options.orderid
    console.log('order_id = ' + order_id)

    shopController.getOrderDetail(order_id).then(data=>{
      console.log(data)
      
      //时间日期格式化
      var timestamp = data.order_info.add_time
      var format = util.timestampToDate(timestamp)
      var comment = data.comment
      //评分
      var score = 0;
      console.log(comment)
      if(comment.length==0){

      }else{
        score = comment.score;
      }

      var stars = that.rating(score)

      that.setData({
        orderDetail:data,
        add_time: format,
        order_id: order_id,
        stars: stars
      })
    })
  },

  
})