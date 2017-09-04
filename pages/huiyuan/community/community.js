// community.js
//引入controller
const userController = require('../../../controller/userController.js').controller
const util = require('../../../utils/util.js')

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    _uri:app.globalData.URI,
    //我的帖子或社区论坛
    action:0,
    //分页
    page:1,
    //帖子列表
    threads:[],
    empty:true,
    //举报原因类型
    report_type_lists:''
  },

  /**
   * 发帖
   */
  addThread:function(){
    wx.navigateTo({
      url: 'add/add',
    })
  },

  //去详情页
  toDetail: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var thread = e.currentTarget.dataset.thread
    var threadStr = JSON.stringify(thread)
    wx.navigateTo({
      url: 'detail/detail?threadStr=' + threadStr + '&index=' + index + '&action=' + that.data.action +'&report_type_lists='+that.data.report_type_lists,
    })
  },

  /**
   * 举报
   */
  report(e){
    var id = e.currentTarget.dataset.id
    var that = this
    wx.showToast({
      title: JSON.stringify(that.data.report_type_lists),
    })
  },

  
  /**
   * 删除帖子
   */
  deleteThread:function(e){
    //定义删除方法
    Array.prototype.removeByValue = function (val) {
      for (var i = 0; i < this.length; i++) {
        if (this[i] == val) {
          this.splice(i, 1);
          break;
        }
      }
    }

    var that = this

    wx.showModal({
      title: '确定删除？',
      success: function (res) {
        if (res.confirm) {
          var index = e.currentTarget.dataset.index
          var id = e.currentTarget.dataset.id
          userController.deleteThread(id).then(data => {
            console.log(data)
            if (data.code == 10000) {
              wx.showToast({
                title: '删除成功',
              })

              var list = that.data.threads
              var result = list.splice(index, 1)
              console.log('result = ' + result)
              that.setData({
                threads: list
              })
            } else {
              wx.showToast({
                title: data.message,
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },

  /**
   * 点赞
   */
  support: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var thread = e.currentTarget.dataset.thread
    // console.log(thread)
    userController.supportThread(thread.id).then(data => {
      console.log(data)
      if (data.code == 10000) {
        var bool = data.is_support
        var temp = that.data.threads[index];
        var list = that.data.threads

        console.log('点赞:' + bool)
        temp['is_support'] = bool

        if (!bool) {
          temp.support_count = temp.support_count + 1
        } else if (temp.support_count > 0) {
          temp.support_count = temp.support_count - 1
        }

        that.setData({
          threads: list
        })

        //console.log(that.data.threads)
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
    var action = options.type
    var that = this
    that.setData({
      action: action
    })

    if(action==1){
      wx.setNavigationBarTitle({
        title: '我的帖子',
      })
    }else{
      wx.setNavigationBarTitle({
        title: '社区论坛',
      })
    }

    
  },

  getThreads(){
    var that = this
    wx.showLoading({
      title: '加载中...',
    })
    userController.getThreads(that.data.action, that.data.page).then(data => {
      console.log(data)
      wx.hideLoading()
      if (data.code == 10000) {
        var temp = data.lists
        if(temp!=undefined&&temp!=null&&temp.length!=0){
          for (let i = 0; i < temp.length; i++) {
            let thread = temp[i]
            thread['formatDate'] = util.timestampToDate(thread.add_time);
          }
          that.setData({
            report_type_lists: JSON.stringify(data.report_type_lists),
            threads: temp,
            empty: false
          })
        }
        
      } else {
        wx.showToast({
          title: data.message,
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getThreads();
  },

  //图片base64转换测试
  test() {
    const arrayBuffer = new Uint8Array([11, 22, 33])
    const base64 = wx.arrayBufferToBase64(arrayBuffer)
    console.log('base64:' + base64)
    wx.chooseImage({
      count: 6, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths[0])

        wx.getFileInfo({
          filePath: tempFilePaths[0],
          success: function (res) {
            console.log(res)
          },
          fail: function (res) {
            console.log('失败')
            console.log(res)
          },
          complete: function (res) {
            console.log('complete')
            console.log(res)
          },
        })
      }
    })
  },

  
})