// webView.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    obj:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var jsonStr = options.jsonStr;

    //console.log(_data)

    //将接收字符串重新转换为WxParse转换对象
    let temp = JSON.parse(jsonStr);

    this.setData({
      obj:temp,
    })
  },

  
})