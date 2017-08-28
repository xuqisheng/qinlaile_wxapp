// create.js
//引入controller
const serviceController = require('../../../../controller/serviceController.js').controller;

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  formSubmit:function(e){
    var desc = e.detail.value.desc.trim()

    if (desc==''){
      wx.showToast({
        title: '输入不能为空',
      })
      return
    }
    
    //TODO base64转码
    var image = ''
    serviceController.repairSubmit(desc,image).then(data=>{
      console.log(data)

      if(data.code==10000){
        wx.showToast({
          title: '报修成功',
        })
        wx.redirectTo({
          url: '../../../huiyuan/repair/repair',
        })
      }else{
        wx.showToast({
          title: data.message,
        })
      }
    })
    
  },

  // 选择图片
  chooseImage:function(){

  }

  
})