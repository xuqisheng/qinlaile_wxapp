// xiaodian.js
var app = getApp();

//引入shopController
const shopController = require('../../controller/shopController.js').controller;

//引入RatingBar
const ratingBar = require('../../lib/ratingbar.js');

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
    secondTypeId:'0',
    //搜索关键词
    keyword:''
  },

  //输入内容监听
  textChange:function(e){
    var keyword = e.detail.value.trim()
    console.log('keyword = ' + keyword)
    this.setData({
      keyword: keyword
    })
  },
  
  // 搜索
  search:function(){
    var that = this
    if(that.data.keyword==''){
      wx.showToast({
        title: '请输入搜索内容',
      })
      return;
    }

    wx.navigateTo({
      url: 'search/search?keyword=' + that.data.keyword,
    })
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
        var temp = data.lists
        //生产评分图列表
        for (var i = 0; i < temp.length; i++) {
          var score = temp[i].score
          var arr = that.rating(score)
          //将返回的图片数组，动态添加到其属性imgs
          temp[i]["imgs"] = arr;
        }

        that.setData({
          storeList: temp,
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
  },

  //评分方法
  rating(pingfen) {

    var that = this,　//这里是图片的路径，自己需要改
      data = {
        //从使用评分控件的目录算起
        ling: "../../res/icon/star_empty.png",
        zheng: "../../res/icon/star_full.png",
        ban: "../../res/icon/star_half.png"
      },
      nums = []; //这里是返回图片排列的顺序的数组，这里要注意在页面使用的时候图片的路径，不过使用网络图片无所谓

    if ((pingfen / 0.5) % 2 == 0) {//如果评分为整数，如4.0、5.0
      for (var i = 0; i < 5; i++) {
        if (i < pingfen) {
          nums.push(data.zheng);
        } else {
          nums.push(data.ling);
        }
      }
    } else {//评分不为整数，如3.5、2.5
      for (var i = 0; i < 5; i++) {
        if (i < pingfen - 0.5) {
          nums.push(data.zheng);//先把整数分离出来，如：3.5，这里就是先把3分离出来，把代表1的图片放进去
        } else if (i == (pingfen - 0.5)) {
          nums.push(data.ban);//把小数的部分分离出来，如：3.5里的0.5，把代表0.5的图片放进去
        } else {
          nums.push(data.ling);//然后剩下的就是没有满的用代表0的图片放进去，如：3.5，里面放进去了3个代表1的图片，然后放入了1个代表0.5的图片，最后还剩一个图片的位置，这时候就放代表0的图片
        }
      }
    }


    return nums;
  }
  
})