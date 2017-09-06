// myengage.js

var app = getApp();

//引入controller
const serviceController = require('../../../controller/serviceController.js').controller;
const util = require('../../../utils/util.js')

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
    status:'-1',

    //订单列表
    bookList: [],
    empty: true,

    has_next: 0,

    //加载中
    loading: false,
    status:'-1'
  },

  /**
   * 生命周期函数
   */
  onShow: function () {
    var that = this
    that.setData({
      curNum:1,
      bookList: [],
    })
    that.getBookList();

  },

  // 详情页
  toDetail:function(e){
    var book = e.currentTarget.dataset.book
    var bookStr = JSON.stringify(book)
    wx.navigateTo({
      url: 'detail/detail?bookStr='+bookStr,
    })
  },

  /**
   * 获取预约列表
   */
  getBookList(){
    var that = this
    that.setData({
      loading: true
    })
    wx.showLoading({
      title: '加载中...',
    })

    if(that.data.status=='-1'){
      serviceController.getBookList(that.data.curNum).then(data=>{
        that.process(data)
      })
    }else{
      serviceController.getBookListByStatus(that.data.curNum, that.data.status).then(data => {
        that.process(data)
      })
    }
  },

  /**
   * 处理数据
   */
  process(data){
    wx.hideLoading()
    var that = this
    that.setData({
      loading: false
    })
    console.log(data)
    if (data.code == 10000) {
      data.lists.forEach(function (item, index) {
        item['formatDate'] = util.timestampToDate(item.booking_time);
      })
      var bookList = that.data.bookList

      //连接两个或更多的数组，并返回结果
      bookList = bookList.concat(data.lists);

      console.log(bookList)
      that.setData({
        bookList: bookList,
        empty: false,
        has_next: data.has_next
      })
    } else {
      this.setData({
        empty: true,
        has_next: 0,
      })
    }

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

    that.getBookList()

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

    var status = '-1';

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
      status: status,
      curNum: 1,
      bookList: [],
    })

    //重新请求订单
    that.getBookList();

  },


  
})