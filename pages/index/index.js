//index.js
//获取应用实例
var app = getApp();

//引入controller
const index = require('../../controller/indexController.js').controller;

const URI = 'https://www.jiahetianlang.com';

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
      console.log(data)
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
