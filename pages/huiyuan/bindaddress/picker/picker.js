// picker.js

//引入controller
const userController = require('../../../../controller/userController.js').controller

Page({

  /**
   * 页面的初始数据
   */
  data: {
    provinces: [],
    cities:[],
    areas:[],
    villages:[],

    province:'',
    city:'',
    area:'',
    village:'',

    content:'',

    flag:'1',
  },

  /**
   * picker-view 绑定事件
   */
  bindContentChange: function (e) {
    var that = this;
    const val = e.detail.value

    switch(that.data.flag){
      case '1':
        var name = that.data.provinces[val].name;
        console.log('name = ' + name)
        that.setData({
          content: name,
        })
      break;
    }

    //console.log('content = ' + that.data.content)
  },

  /**
   * 确定选择
   */
  confirm:function(){
    var that = this;

    var pages = getCurrentPages()
    var prevPage = pages[pages.length - 1]  //当前界面
    var prevPage = pages[pages.length - 2]  //上一个页面

    //根据操作类型判断
    switch(that.data.flag){
      case '1':
        prevPage.setData({
          province: that.data.content,
        })
      break;
    }
    //回退页面
    wx.navigateBack({
      delta: 1,//返回的页面数，如果 delta 大于现有页面数，则返回到首页。
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取操作类型
    var _flag = options.title;
    var _content = options.content;
    console.log('_flag：'+_flag)
    console.log('_content：' + _content)
    that.setData({
      flag:_flag,
    })

    var _title='';
    switch (_flag){
      case '1':
        _title = '选择省份';
        userController.requestProvince().then(data=>{
          that.setData({
            provinces: data.provinces
          })
        })

        if (_content != '选择省份'){
          that.setData({
            content: _content,
          })
        }
        break;
      case '2':
        _title = '选择城市';
        break;
      case '3':
        _title = '选择区县';
        break;
      case '4':
        _title = '选择小区';
        break;
      default:
        _title = '执行默认';
        break
    }

    console.log('title：' + _title)
    //动态设置标题
    wx.setNavigationBarTitle({
      title:_title
    })

    
  },

})