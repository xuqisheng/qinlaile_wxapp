// notice.js
//引入controller
const serviceController = require('../../../controller/serviceController.js').controller;
const util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    notices:[],
    empty:true,

    page:1,
    has_next:0,
    //加载中
    loading: false,
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
      page: that.data.page + 1
    })
    console.log('加载更多page:' + that.data.page + ',loading=' + that.data.loading + ',has_next=' + that.data.has_next)

    that.getNotices()

  },

  /**
   * 详情
   */
  toDetail:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'detail/detail?id='+id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNotices()
  },

  getNotices:function(){
    var that = this
    that.setData({
      loading: true
    })
    //获取公告
    serviceController.getNotices(that.data.page).then(data => {
      that.setData({
        loading: false
      })
      console.log(data)

      if (data.code == 10000) {
        data.lists.forEach(function (item, index) {
          item['formattime'] = util.timestampToDate(item.add_time)
        })
        var notices = that.data.notices

        //连接两个或更多的数组，并返回结果
        notices = notices.concat(data.lists);

        // console.log(notices)
        that.setData({
          notices: notices,
          empty: false,
          has_next: data.has_next
        })
      } else {
        this.setData({
          empty: true,
          has_next: 0,
        })
      }
    })

    
  }

  
})