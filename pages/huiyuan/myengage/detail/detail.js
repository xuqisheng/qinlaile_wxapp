// detail.js
const util = require('../../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    book:{},
    formatDate:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var book = JSON.parse(options.bookStr)
    console.log(book)
    this.setData({
      book:book,
      formatDate: util.timestampToDate(book.booking_time)
    })

  },

})