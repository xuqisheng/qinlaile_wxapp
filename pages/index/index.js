//index.js
//获取应用实例
var app = getApp();

//引入controller
const index = require('../../controller/indexController.js').controller;

const URI = app.globalData.URI;

//在使用的View中引入WxParse模块
const WxParse = require('../../lib/wxParse/wxParse.js');

Page({
  data: {

    _uri:`${URI}`,
    //轮播定义
    banner:{
      indicatorDots: true,
      autoplay: true,
      interval: 3000,
      duration: 1000,
    },
    //【测试地址】
    imgs2: [
      'https://www.jiahetianlang.com/ups/Admin/2015/09/1/a7792ff45d65a0383b75fa7606ddceeb.jpg',
      'https://www.jiahetianlang.com/ups/Admin/2015/09/1/6fb75a13dea7238cb5515ad141dd86ed.jpg',
      'https://www.jiahetianlang.com/ups/Admin/2015/09/1/a720d87c583f0a7238e330f3d8ab5499.jpg'
    ],
    //轮播图片
    imgs: [],

    //【测试新闻】
    msgList: [
      { url: "url", title: "公告：多地首套房贷利率上浮 热点城市渐迎零折扣时代" },
      { url: "url", title: "公告：悦如公寓三周年生日趴邀你免费吃喝欢唱" },
      { url: "url", title: "公告：你想和一群有志青年一起过生日嘛？" }
      ],

    //滚动新闻
    newsList:[],

    //【测试表格】
    listData: [
      { "code": "01", "text": "保姆", "type": "type1" },
      { "code": "02", "text": "育婴师", "type": "type2" }
    ],
    //家政服务列表
    service_types:[],

    //【测试小店】

    //社区小店列表
    category_list:[],
    
  }, 

  //点击去往家政服务页
  gotoServe:function(event){
    var serveType = event.currentTarget.dataset.type;

    console.log(serveType)

    wx.navigateTo({
      url: 'serve/serve?serveType=' + serveType
    })
  },
  

  //点击新闻条目
  onNewsClick:function(event){
    var news = event.currentTarget.dataset.news;

    //得到原生html内容
    var content = news.content
    //console.log(content)

    //【思路一】html转换为文本，但是不能拿到图片，转换不完全
    //var _data = app.convertHtmlToText(content)

   /**
    * 【思路二】使用重写过后的WxParse获取转换结果
    * WxParse.wxParse(bindName , type, data, target,imagePadding)
    * 1.bindName绑定的数据名(必填)
    * 2.type可以为html或者md(必填)
    * 3.data为传入的具体数据(必填)
    * 4.target为Page对象,一般为this(必填)
    * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
    */
    WxParse.wxParse('_data', 'html', content, this, 5);

    var obj = WxParse.getResult()
    //将对象转换为字符串
    var jsonStr = JSON.stringify(obj)

    //console.log(jsonStr)

    wx.navigateTo({
      url: '../webView/webView?jsonStr=' + jsonStr,
    })
  },

  onLoad: function () {
    var _this = this;
    //获取首页数据
    index.getIndex().then(data => {
      let temp = data.adsLists.map(function(item){
        //return app.globalData.URI+item.src;
        //使用`${}`取占位符的值
        return `${URI}`+item.src;
      })

      //赋值
      _this.setData({ 
          imgs: temp,
          service_types: data.service_types,
          category_list: data.category_list
        })
      //console.log(data.service_types)
      //console.log(temp)
    })

    //获取首页轮播新闻数据
    index.getNews().then(data => {
      _this.setData({
        newsList:data
      })
      //console.log(data)
    })

    //this.req();
  },

  //【测试】普通形式的请求
  req: function () {
    wx.request({
      url: app.globalData.api + 'App/newIndex.html',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      }, 
      data: {
        app_id: 3,
        did: 'A8:60:B6:2D:81:AB',
        encrypt_did: 'db1d273c49d4fa014b4d17250dfc4da4',
        mid: '',
        version_id: '2',
        version_mini: '2.2',
        latitude: '30.311620',
        longitude: '120.253431',
      },
      method: 'POST',
      //回调
      success: function (data) {
        console.log(data)
      }
    })
  }
})
