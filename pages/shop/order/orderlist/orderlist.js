// orderlist.js
var app = getApp();

//引入shopController
const shopController = require('../../../../controller/shopController.js').controller;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    _uri: app.globalData.URI,
    //选项卡
    tabs:[
      '全部',
      '待付款',
      '待发货',
      '待收货',
      '已完成',
      '已取消'
    ],
    //当前选中的item序号，订单类型status
    itemSelected:0,
    //分页参数，默认1
    curNum: 1,

    //订单列表
    orderList:[],
    empty:true,

    has_next: 0,
    //加载中
    loading: false,
  },

  /**
     * 滚动到底部
     */
  scrollToBottom: function () {
    var that = this

    if (that.data.loading || that.data.has_next == 0) {
      return
    }

    that.setData({
      curNum: that.data.curNum + 1
    })
    console.log('加载更多curNum:' + that.data.curNum + ',loading=' + that.data.loading + ',has_next=' + that.data.has_next)

    that.getOrderList()

  },


  /**
   * 点击tab事件
   */
  onTabClick: function (event) {
    var that = this
    var index = event.currentTarget.dataset.index;
    //console.log(index)

    if (that.data.itemSelected==index){
      return
    }

    that.setData({
      itemSelected: index,
      curNum: 1,
      orderList: [],
    })

    //重新请求订单
    that.getOrderList();
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    var that = this
    that.setData({
      curNum: 1,
      orderList: [],
    })
    that.getOrderList();
  },

  /**获取订单列表 */
  getOrderList:function(){
    var that = this
    wx.showLoading({
      title: '加载中...',
    })
    that.setData({
      loading: true
    })

    shopController.getOrderList(that.data.itemSelected, that.data.curNum).then(data => {
      that.setData({
        loading: false
      })
      wx.hideLoading()

      console.log(data)

      if (data.code == 10000) {
        var orderList = that.data.orderList
        //连接两个或更多的数组，并返回结果
        orderList = orderList.concat(data.data);

        // console.log(orderList)
        that.setData({
          orderList: orderList,
          empty: false,
          has_next: data.has_next
        })
      } else {
        this.setData({
          empty: true,
          has_next: 0,
        })
      }
    })
  },
  

  
})