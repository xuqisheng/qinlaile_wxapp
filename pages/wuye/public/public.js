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
    repairType:''
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
    if (this.data.repairType=='public'){
      this.getPublicList()
      wx.setNavigationBarTitle({
        title: '公共报修',
      })
    }else{
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
      console.log(data)
      if (data.code == 10000) {
        var temp = data.lists;
        temp.forEach(function (item, index) {
          item['formatTime'] = util.timestampToDate(item.add_time)
        })
        that.setData({
          repairList: data.lists,
        })
      } else {
        // wx.showToast({
        //   title: data.message,
        // })
        if (data.code == 10007) {
          that.setData({
            hasMore: false
          })
        }
      }

    })
  },

  // 获取公共报修列表
  getPublicList:function(){
    var that = this
    serviceController.getPublicList(that.data.page).then(data=>{
      console.log(data)
      if(data.code==10000){
        var temp = data.lists;
        temp.forEach(function(item,index){
          item['formatTime'] = util.timestampToDate(item.add_time)
        })
        that.setData({
          repairList: data.lists,
        })
      }else{
        // wx.showToast({
        //   title: data.message,
        // })
        if(data.code==10007){
          that.setData({
            hasMore: false
          })
        }
      }
      
    })
  },
 
})