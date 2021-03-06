// public.js
var app = getApp()
//引入controller
const serviceController = require('../../../controller/serviceController.js').controller;
const util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    _uri:app.globalData.URI,

    //默认第一页
    page:1,
    // 是否有更多
    hasMore:true,
    repairList:[],
    currentRepair:{},
    //报修类型
    repairType:'',
    loading:false,

  },

  /**
   * 滚动到底部
   */
  scrollToBottom: function () {
    var that = this

    if (that.data.loading || !that.data.hasMore) {
      return
    }

    that.setData({
      page: that.data.page + 1
    })
    console.log('加载更多page:' + that.data.page + ',loading=' + that.data.loading + ',hasMore=' + that.data.hasMore)

    that.getData()

  },

  /**
   * 去往详情页
   */
  toDetail:function(e){
    var that = this
    var index = e.currentTarget.dataset.index
    var repair = e.currentTarget.dataset.repair
    var repairStr = JSON.stringify(repair)
    wx.navigateTo({
      url: 'detail/detail?repairStr=' + repairStr + '&index=' + index + '&repairType=' + that.data.repairType,
    })
  },

  /**
   * 点赞
   */
  support:function(e){
    var that = this
    var index = e.currentTarget.dataset.index
    var repair = e.currentTarget.dataset.repair
    //console.log(repairStr)
    serviceController.support(repair.id).then(data=>{
      console.log(data)
      if(data.code==10000){
        var bool = data.is_support
        var temp = that.data.repairList[index];    
        var list = that.data.repairList
        
        console.log('点赞:'+bool)
        temp['is_support'] = bool
        
        if(!bool){
          temp.support = temp.support + 1
        } else if (temp.support>0){
          temp.support = temp.support-1
        }
        
        that.setData({
          repairList: list
        })

        console.log(that.data.repairList)
      }else{
        wx.showToast({
          title: data.message,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   * getPersonalList
   */
  onLoad: function (options) {
    var repairType = options.repairType
    this.setData({
      repairType: repairType
    })

  },

  onShow:function(){
    var that = this
    that.setData({
      repairList:[],
      hasMore:true,
      page:1,
    })
    that.getData()
  },

  getData:function(){
    var that = this
    wx.showLoading({
      title: '加载中...',
    })
    that.setData({
      loading:true
    })
    if (this.data.repairType == 'public') {
      this.getPublicList()
      wx.setNavigationBarTitle({
        title: '公共报修',
      })
    } else {
      this.getPersonalList();
      wx.setNavigationBarTitle({
        title: '个人报修',
      })
    }
  },

  // 获取个人报修列表
  getPersonalList: function () {
    var that = this
    
    serviceController.getPersonalList(that.data.page).then(data => {
      that.process(data)

    })
  },

  // 获取公共报修列表
  getPublicList:function(){
    var that = this
    serviceController.getPublicList(that.data.page).then(data=>{
      that.process(data)
      
    })
  },

  process(data){
    var that = this
    wx.hideLoading()
    that.setData({
      loading: false
    })
    console.log(data)
    if (data.code == 10000) {
      var temp = data.lists;
      temp.forEach(function (item, index) {
        item['formatTime'] = util.timestampToDate(item.add_time)
      })

      var repairList = that.data.repairList

      //连接两个或更多的数组，并返回结果
      repairList = repairList.concat(temp);
      that.setData({
        repairList: repairList,
      })
    } else {
      if (data.code == 10007) {
        that.setData({
          hasMore: false
        })
      }
    }
  }
 
})