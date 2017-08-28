// repair.js
//引入controller
const serviceController = require('../../../controller/serviceController.js').controller;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    curNum:'1',
    status:'',
    tabs:['全部','公共报修','个人报修'],
    itemSelected:0,

  },

  onTabClick:function(e){
    var that = this
    var index = event.currentTarget.dataset.index;
    
    if (that.data.itemSelected == index) {
      return
    }

    var status = '';

    switch (index) {
      case '0':
        status = '';
        break;
      case '1':
        status = '1';
        break;
      case '2':
        status = '2';
        break;
    }

    that.setData({
      itemSelected: index,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  getRepairList:function(){
    var that = this
    if (that.data.status==''){
      serviceController.getRepairList(that.data.curNum).then(data => {
        that.process(data)
      })
    }else{
      serviceController.getRepairListByType(that.data.curNum, that.data.status).then(data=>{
        that.process(data)
      })
    }
  },

  /**
   * 处理响应数据
   */
  process(data){
    if(data.code==10000){

    }else{
      wx.showToast({
        title: data.message,
      })
    }
  }
})