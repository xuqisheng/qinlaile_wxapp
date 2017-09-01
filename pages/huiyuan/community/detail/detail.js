// detail.js

//引入controller
const userController = require('../../../../controller/userController.js').controller
const util = require('../../../../utils/util.js')
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    _uri: app.globalData.URI,
    page:'1',
    commentList:[],
    thread:{}
  },

  /**
   * 提交表单信息
   */
  formSubmit:function(e){
    var that = this

    var comment = e.detail.value.comment.trim()
    console.log('comment = ' + comment)

    if (comment == '') {
      wx.showToast({
        title: '输入内容不能为空',
      })
      return
    }

    wx.showLoading({
      title: '提交中...',
    })
    //提交评论
    userController.comment(that.data.thread.id, comment).then(data => {
      wx.hideLoading()

      console.log(data)
      if (data.code == 10000) {
        //获取评论列表
        that.getCommentList();
        var thread = that.data.thread;
        thread['comment_count'] = thread.comment_count + 1
        that.setData({
          thread: thread
        })
      } else {
        wx.showToast({
          title: data.message,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // var index = options.index
    var threadStr = options.threadStr
    var thread = JSON.parse(threadStr)
    that.setData({
      thread: thread
    })

    console.log(thread)
    
    that.getCommentList()
  },


  getCommentList(){
    var that = this
    wx.showLoading({
      title: '评论加载中...',
    })
    userController.getCommentList(that.data.thread.id, that.data.page).then(data => {

      wx.hideLoading()

      if (data.code == 10000) {
        var temp = data.reply
        temp.forEach(function (item, index) {
          item['formatTime'] = util.timestampToDate(item.add_time)
        })
        that.setData({
          commentList: temp
        })
        console.log(temp)
      } else {
        wx.showToast({
          title: data.message,
        })
      }
    })
  }
  
})