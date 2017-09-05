// repair.js
var app = getApp()
//引入controller
const serviceController = require('../../../controller/serviceController.js').controller;
const util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    _uri: app.globalData.URI,
    curNum:1,
    status:'',
    tabs:['全部','公共报修','个人报修'],
    itemSelected:0,
    repairList:[],
    empty:true,
    has_next:0,

    //加载中
    loading:false,
  },

  /**
   * 滚动到底部
   */
  scrollToBottom:function(){
    var that = this

    if (that.data.loading||that.data.has_next==0){
      return
    }
    
    that.setData({
      curNum: that.data.curNum+1
    })
    console.log('加载更多curNum:' + that.data.curNum + ',loading=' + that.data.loading +',has_next='+that.data.has_next)

    that.getRepairList()

  },

  //toDetail
  toDetail: function (event){
    var repair = event.currentTarget.dataset.repair
    var repairStr = JSON.stringify(repair)

    wx.navigateTo({
      url: 'detail/detail?repairStr=' + repairStr,
    })
  },

  onTabClick: function (event){
    var that = this
    var index = event.currentTarget.dataset.index;
    
    if (that.data.itemSelected == index) {
      return
    }

    var status = '';

    switch (index) {
      case '0':
        status = '';
        break;
      case '1':
        status = '1';
        break;
      case '2':
        status = '2';
        break;
    }

    that.setData({
      itemSelected: index,
      status:status,
      curNum:1,
      repairList: [],
    })

    this.getRepairList()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRepairList()
  },

  /**
   * 加载数据
   */
  getRepairList:function(){
    wx.showLoading({
      title: '加载中...',
    })
    var that = this
    that.setData({
      loading:true
    })
    if (that.data.status==''){
      serviceController.getRepairList(that.data.curNum).then(data => {
        that.process(data)
      })
    }else{
      serviceController.getRepairListByType(that.data.curNum, that.data.status).then(data=>{
        that.process(data)
      })
    }
  },

  /**
   * 处理响应数据
   */
  process(data){
    var that = this;
    that.setData({
      loading: false
    })
    wx.hideLoading()
    console.log(data)
    if(data.code==10000){
      data.lists.forEach(function(item,index){
        item['formatDate'] = util.timestampToDate(item.add_time)
      })
      var repairList = that.data.repairList
      
      //连接两个或更多的数组，并返回结果
      repairList = repairList.concat(data.lists);

      console.log(repairList)
      that.setData({
        repairList: repairList,
        empty:false,
        has_next: data.has_next
      })
    }else{
      // wx.showToast({
      //   title: data.message,
      // })
      this.setData({
        empty: true,
        has_next:0,
      })
    }
  }
})