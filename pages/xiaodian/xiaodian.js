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
    //分类列表选项卡
    typeList:[],
    //当前选中的item序号
    itemSelected: 0,
    //店铺列表
    storeList:[],
    //是否允许显示分类弹窗
    showPopupwindow:true,
    //二级分类列表
    secondTypeList:[],
    //二级分类id
    secondTypeId:'0'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getStoreTypeList();
    //请求全部店铺
    this.getStoreList(this.data.secondTypeId);
  },

  /**
   * 点击二级分类
   */
  onSecondTypeClick:function(e){
    var id = e.currentTarget.dataset.type_id
    if (this.data.secondTypeId==id){
      this.setData({
        showPopupwindow: false
      })
      console.log('隐藏了二级分类：' + id)
      return;
    }

    console.log('切换到二级分类：'+id)
    this.setData({
      secondTypeId:id,
      showPopupwindow:false
    })

    // 重新请求该分类下的店铺列表
    this.getStoreList(id)
  },

  /**
   * 点击tab事件
   */
  onTabClick: function (event) {
    var that = this
    var index = event.currentTarget.dataset.index;
    //console.log(index)

    // 如果点击当前的一级分类且弹窗处于显示状态
    if (index == that.data.itemSelected && that.data.showPopupwindow) {
      that.setData({
        showPopupwindow: false
      })
      console.log('隐藏了一级分类：' + index)
      return
    } else {
      // 每次切换到一级分类或者在一级分类点击，修改showPopupwindow为true
      that.setData({
        showPopupwindow: true
      })
    }


    var list = that.data.typeList[index].second
    that.setData({
      itemSelected: index,
      secondTypeList: list
    })

    console.log('切换到一级分类：'+index)

    //从其他切换到全部时，加载全部
    if (index == 0 && this.data.secondTypeId!='0'){
      that.setData({
        secondTypeId: '0',
      })
      console.log('切换到二级分类：0')
      //请求全部店铺
      that.getStoreList(this.data.secondTypeId);
    }
  },

  /**
   * 获取店铺分类列表
   */
  getStoreTypeList:function(){
    var that = this
    shopController.getStoreTypeList().then(data=>{
      // console.log(data)
      var temp = [{
        id: '',
        name: '全部',
        second: []
      }].concat(data.typeList)

      // 初始化数据
      that.setData({
        typeList:temp,
        secondTypeList:[]
      })

      console.log(that.data.typeList)
    })
  },

  /**
   * 进入店铺
   */
  enterShop: function (event) {
    var shop = event.currentTarget.dataset.shop;
    wx.navigateTo({
      url: '../shop/shop?shop=' + JSON.stringify(shop),
    })
  },

  /**
   * 获取店铺列表
   */
  getStoreList:function(type_id){
    wx.showLoading({
      title: '店铺加载中...',
    })
    var that = this
    shopController.getStoreList(type_id).then(data=>{
      wx.hideLoading()
      var code = data.code
      if(code == 10000){
        that.setData({
          storeList: data.lists,
          empty:false
        })
      }else /*if(code == 10007)*/{
        // wx.showToast({
        //   title: data.message,
        // })
        that.setData({
          empty: true
        })
      }
      console.log(data)
      
    })
  }
  
})