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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNotices()
  },

  getNotices:function(){
    var that = this
    //获取公告
    serviceController.getNotices(that.data.page).then(data => {
      console.log(data)
      var notices = data.lists;
      var temp = [];
      if(notices){
        for (let i = 0; i < notices.length; i++) {
          var notice = notices[i];
          notice['formattime'] = util.timestampToDate(notice.add_time);
        }
        temp = that.data.notices.concat(notices)
      }

      that.setData({
        notices: temp,
      })

      var empty = true;
      if(that.data.notices.length!=0){
        empty = false
      }
      that.setData({
        empty:empty
      })
    })

    
  }

  
})