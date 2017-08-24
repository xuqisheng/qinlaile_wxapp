// myengage.js

var app = getApp();

//引入controller
const serviceController = require('../../../controller/serviceController.js').controller;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    _uri: app.globalData.URI,
    //选项卡
    tabs: [
      '全部',
      '未完成',
      '待付款',
      '已完成',
      '已取消'
    ],
    //当前选中的item序号，订单类型status
    itemSelected: 0,
    //分页参数，默认1
    curNum: 1,

    //订单列表
    bookList: [],
    empty: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getBookList(that.data.curNum,'-1');

  },

  /**
   * 获取预约列表
   */
  getBookList(curNum,status){
    var that = this
    if(status=='-1'){
      serviceController.getBookList(curNum).then(data=>{
        that.process(data)
      })
    }else{
      serviceController.getBookListByStatus(curNum, status).then(data => {
        that.process(data)
      })
    }
  },

  /**
   * 处理数据
   */
  process(data){
    var that = this
    console.log(data)
    // 是否还有更多
    var has_next = data.has_next

    var temp = data.lists;

    //console.log(temp)


    if (temp != undefined && temp.length != 0) {
      that.setData({
        bookList: temp,
        empty: false
      })
    } else {
      that.setData({
        bookList: [],
        empty: true
      })
    }
  },

  /**
   * 点击tab事件
   */
  onTabClick: function (event) {
    var that = this
    var index = event.currentTarget.dataset.index;
    //console.log(index)

    if (that.data.itemSelected == index) {
      return
    }

    var status = '0';

    switch(index){
      case '0':
        status = '-1';
        break;
      case '1':
        status = '0';
        break;
      case '2':
        status = '1';
        break;
      case '3':
        status = '2';
        break;
      case '4':
        status = '-2';
        break;
    }

    that.setData({
      itemSelected: index,
    })

    //重新请求订单
    that.getBookList(that.data.curNum, status);

  },


  
})