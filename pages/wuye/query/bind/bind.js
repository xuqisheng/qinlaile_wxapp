// bind.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    company_name: '',
    village_name: '',
    dataList: [],
    mobile: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var mobile = options.mobile;
    var that = this;
    // var str = options.data;

    var company_name = wx.getStorageSync('company_name')
    var village_name = wx.getStorageSync('village_name')

    that.setData({
      company_name: company_name,
      village_name: village_name,
      // dataList: JSON.parse(str),
      mobile:mobile
    })
  },

  //提交
  formSubmit:function(e){
    var code = e.detail.value.code;
    console.log('code = '+code)
  }
  
})