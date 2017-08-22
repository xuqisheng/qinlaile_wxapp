// xiaodian.js
var app = getApp();

//引入shopController
const shopController = require('../../controller/shopController.js').controller;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    _uri: app.globalData.URI,
    //选项卡
    tabs: [
      '全部',
      '在线商城',
      '热卖商家',
      '外卖美食',
      '服务',
    ],
    //分类列表
    typeList:[],
    //当前选中的item序号
    itemSelected: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getStoreTypeList();
    //请求全部店铺
    this.getStoreList('0');
  },

  /**
   * 点击tab事件
   */
  onTabClick: function (event) {
    var that = this
    var index = event.currentTarget.dataset.index;
    //console.log(index)

    if (that.data.itemSelected == index) {
      return
    }

    that.setData({
      itemSelected: index,
    })

    
  },

  /**
   * 获取店铺分类列表
   */
  getStoreTypeList:function(){
    var that = this
    shopController.getStoreTypeList().then(data=>{
      console.log(data)
      var temp = [{
        id: '',
        name: '全部',
        second: []
      }].concat(data.typeList)

      that.setData({
        typeList:temp
      })

      console.log(that.data.typeList)
    })
  },

  /**
   * 获取店铺列表
   */
  getStoreList:function(type_id){
    shopController.getStoreList(type_id).then(data=>{
      console.log(data)
    })
  }
  
})