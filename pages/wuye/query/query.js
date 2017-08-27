// query.js
//引入controller
const serviceController = require('../../../controller/serviceController.js').controller;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    company_name:'',
    village_name:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var company_name = wx.getStorageSync('company_name')
    var village_name = wx.getStorageSync('village_name')

    console.log('company_name:' + company_name)
    console.log('village_name:' + village_name)

    var that = this
    that.setData({
      company_name: company_name,
      village_name: village_name
    })

  },

  /**
   * 表单提交
   */
  formSubmit:function(e){
    var that = this;
    var mobile = e.detail.value.mobile;
    console.log('mobile:' + mobile)

    if(mobile.length!=11){
      wx.showToast({
        title: '手机号输入错误',
      })
      return
    }

    serviceController.queryProperty(mobile).then(data => {
      console.log(data)
      if(data.code==10000){
        //成功
        var obj = data.data;
        wx.navigateTo({
          //绑定页面未完。
          // url: 'bind/bind?mobile=' + mobile + '&data=' + JSON.stringify(obj),
        })
      }else{
        wx.navigateTo({
          url: 'noresult/noresult?mobile=' + mobile,
        })
      }
    })
  }
  
})