// picker.js

//引入controller
const userController = require('../../../../controller/userController.js').controller

Page({

  /**
   * 页面的初始数据
   */
  data: {

    //统一处理的内容和id
    content:'',//省市县区
    id:'',//区域ID值
    contents:[],//数据源

    flag:'1',//操作类型
  },

  /**
   * picker-view 绑定事件
   */
  bindContentChange: function (e) {
    console.log('触发bindChange')
    var that = this;
    const val = e.detail.value

    var name = that.data.contents[val].name;
    var _id = that.data.contents[val].id;
    console.log('content = ' + name)
    console.log('id = ' + _id)
    that.setData({
      content: name,
      id: _id
    })

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
          provinceId:that.data.id
        })
      break;
      case '2':
        prevPage.setData({
          city: that.data.content,
          cityId: that.data.id
        })
        break;
      case '3':
        prevPage.setData({
          area: that.data.content,
          areaId: that.data.id
        })
        break;
      case '4':
        prevPage.setData({
          village: that.data.content,
          villageId: that.data.id
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
    var _provinceId = options.provinceId;
    var _cityId = options.cityId;

    //console.log('_flag：'+_flag)
    //console.log('_content：' + _content)
    var _title='';
    switch (_flag){
      case '1':
        _title = '选择省份';
        userController.requestProvince().then(data=>{
          data.provinces.unshift({
            id:'',
            name:'选择省份'
          })
          that.setData({
            contents: data.provinces
          })
        })
       
        
        break;
      case '2':
        _title = '选择城市';
        userController.requestCity(_provinceId).then(data => {
          data.citys.unshift({
            id: '',
            name: '选择城市'
          })
          that.setData({
            contents: data.citys
          })
        })
        
        break;
      case '3':
        _title = '选择区县';
        userController.requestArea(_cityId).then(data => {


          data.areas.unshift({
            id: '',
            name: '选择区县'
          })
          that.setData({
            contents: data.areas
          })
        })
        
        break;
      case '4':
        _title = '选择小区';
        userController.requestVillage(_provinceId,_cityId).then(data => {
          //console.log(data)
          //二维数组，转换为一维数组
          var res = [].concat.apply([], data.communitys)

          //console.log(res)

          res.unshift({
            id: '',
            name: '选择小区'
          })
          that.setData({
            contents: res
          })
        })
        
        break;
      default:
        _title = '执行默认';
        break
    }

    that.setData({
      content: _content,
      flag: _flag,
    })
    console.log('title：' + _title)
    //动态设置标题
    wx.setNavigationBarTitle({
      title:_title
    })

    
  },

})