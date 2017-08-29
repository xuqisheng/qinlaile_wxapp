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
    curNum:'1',
    status:'',
    tabs:['全部','公共报修','个人报修'],
    itemSelected:0,
    repairList:[],
    empty:true,
    has_next:0,
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
      status:status
    })

    this.getRepairList()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRepairList()
  },

  getRepairList:function(){
    wx.showLoading({
      title: '加载中...',
    })
    var that = this
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
    wx.hideLoading()
    console.log(data)
    if(data.code==10000){
      var temp = data.lists.forEach(function(item,index){
        item['formatDate'] = util.timestampToDate(item.add_time)
      })
      this.setData({
        repairList:data.lists,
        empty:false,
        has_next: data.has_next
      })
    }else{
      // wx.showToast({
      //   title: data.message,
      // })
      this.setData({
        empty: true
      })
    }
  }
})