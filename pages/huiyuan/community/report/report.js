// report.js
//引入controller
const userController = require('../../../../controller/userController.js').controller

Page({

  /**
   * 页面的初始数据
   */
  data: {
    report_type_lists:{},
    id:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    var report_type_lists = options.report_type_lists
    // console.log(id)
    console.log(JSON.parse(report_type_lists))
    this.setData({
      report_type_lists: JSON.parse(report_type_lists),
      id: id,
    })
    
  },

  //表单提交
  formSubmit:function(e){
    var that = this
    var report_type = e.detail.value.report_type
    var report_reason = e.detail.value.report_reason.trim()

    console.log(report_type)
    console.log(report_reason)

    if(report_reason==''){
      wx.showToast({
        title: '请输入举报理由',
      })
      return
    }

    userController.reportThread(report_type, report_reason, that.data.id).then(data=>{
      console.log(data)
      if(data.code==10000){
        wx.showToast({
          title: '举报成功',
        })
        wx.navigateBack({})
      }else{
        wx.showToast({
          title: data.message,
        })
      }
    })
  }

  
})