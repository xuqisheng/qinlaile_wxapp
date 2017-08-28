// detail.js
var app = getApp()
//引入controller
const serviceController = require('../../../../controller/serviceController.js').controller;
const util = require('../../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    repair:{},
    _uri:app.globalData.URI,
    commentList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var index = options.index
    var repairStr = options.repairStr

    // console.log('index='+index)
    // console.log('repairStr=' + repairStr)
    var repair = JSON.parse(repairStr)
    var that = this
    that.setData({
      repair: repair
    })
    //获取评论列表
    that.getCommentList();
  },

  /**
   * 获取评论列表
   */
  getCommentList:function(){
    var that = this
    serviceController.getCommentList(that.data.repair.id).then(data => {
      console.log(data)
      if (data.code == 10000) {
        that.setData({
          commentList: data.lists
        })
      } else {
        wx.showToast({
          title: data.message,
        })
      }
    })
  },

  //formSubmit
  formSubmit:function(e){
    var that = this 

    var comment = e.detail.value.comment.trim()
    console.log('comment = '+comment)

    if(comment==''){
      wx.showToast({
        title: '输入内容不能为空',
      })
      return
    }

    wx.showLoading({
      title: '提交中...',
    })
    //提交评论
    serviceController.comment(comment,that.data.repair.id).then(data=>{
      wx.hideLoading()

      console.log(data)
      if(data.code==10000){
        //获取评论列表
        that.getCommentList();
        var repair = that.data.repair;
        repair['comment_count'] = repair.comment_count+1
        that.setData({
          repair: repair
        })
      }else{
        wx.showToast({
          title: data.message,
        })
      }
    })
  },

  /**
   * 点赞
   */
  support: function (e) {
    var that = this
    var repair = that.data.repair
    serviceController.support(repair.id).then(data => {
      console.log(data)
      if (data.code == 10000) {
        var bool = data.is_support

        console.log('点赞:' + bool)
        repair.is_support = bool

        if (!bool) {
          repair.support = repair.support + 1
        } else if (repair.support > 0) {
          repair.support = repair.support - 1
        }

        that.setData({
          repair: repair
        })
        
      } else {
        wx.showToast({
          title: data.message,
        })
      }
    })
  },

  
  
})