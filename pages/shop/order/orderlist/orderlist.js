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
    empty:true
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
      itemSelected:index,
    })

    //重新请求订单
    that.getOrderList();
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getOrderList();
  },

  /**获取订单列表 */
  getOrderList:function(){
    var that = this
    shopController.getOrderList(that.data.itemSelected, that.data.curNum).then(data => {
      var temp = data.data;

      console.log(temp)
      
      if(temp!=undefined && temp.length!=0){
        that.setData({
          orderList: temp,
          empty:false
        })
      }else{
        that.setData({
          orderList: [],
          empty:true
        })
      }

      
    })
  },
  

  
})