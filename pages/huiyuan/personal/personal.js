// personal.js
var app = getApp();

//引入controller
const userController = require('../../../controller/userController.js').controller;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    headimg:'',
    _uri:app.globalData.URI,
    //个人信息
    info:{},

    //小区名称
    village_name: '没有绑定小区，请绑定地址',
    //小区地址信息
    city_name: '',
    area_name: '',
    address: '',
  },

  //表单提交
  formSubmit:function(e){
    var realname = e.detail.value.realname.trim()
    var nickname = e.detail.value.nickname.trim()
    var license_number = e.detail.value.license_number.trim()
    //base64编码
    var headimg = ''

    console.log('realname:'+realname)
    if(realname==''){
      wx.showToast({
        title: '请输入姓名',
      })
      return
    }

    wx.showLoading({
      title: '提交中...',
    })
    var province = wx.getStorageSync('province_id')
    var city = wx.getStorageSync('city_id')
    var village = wx.getStorageSync('village')
    var area = wx.getStorageSync('area_id')
    var address = wx.getStorageSync('default_address')

    userController.savePersonalInfo(headimg, realname, nickname, license_number, province, city,area, village,address).then(data=>{
      wx.hideLoading()
      console.log(data)
      if(data.code == 10000){
        wx.setStorageSync('username', realname)
        wx.setStorageSync('nickname', nickname)
        wx.setStorageSync('license_number', license_number)
        wx.showToast({
          title: '保存成功',
        })
        wx.navigateBack({})
      }else{
        wx.showToast({
          title: data.message,
        })
      }
    })

  },

  //选择头像
  chooseImage:function(){
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths[0])

        that.setData({
          headimg:tempFilePaths[0]
        })
        
      }
    })
  },


  //选择地址
  chooseAddress:function(){
    var province_id = wx.getStorageSync('province_id')
    console.log('province_id = ' + province_id)
    var url = ''
    if(province_id==null||province_id==undefined||province_id==''){
      url = '../bindaddress/bindaddress'
    }else{
      url = '../bindaddress/alter/alter'
    }
    wx.navigateTo({
      url: url,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  onShow:function(){
    var that = this
    userController.getPersonalInfo().then(data => {
      console.log(data)
      if (data.code == 10000) {
        that.setData({
          info: data.info,
        })
      }
    })

    //小区名称
    wx.getStorage({
      key: 'village_name',
      success: function (res) {
        //若已绑定
        if (res.data != '' && res.data != null) {
          that.setData({
            //小区地址为province_name+city_name+area_name+village_name+address
            village_name: res.data,
            province_name: wx.getStorageSync('province_name'),
            city_name: wx.getStorageSync('city_name'),
            area_name: wx.getStorageSync('area_name'),
            address: wx.getStorageSync('address')
          })
        }
      },

    })
  },

  /**
   * 退出登录
   */
  logout:function(){
    wx.showModal({
      title: '提示',
      content:'退出当前账号，该账号相关的数据将被删除',
      success: function (res) {
        if (res.confirm) {
          //清除本地存储中的所有数据
          wx.clearStorage();
          //console.log('app.globalData.mid = ' + app.globalData.mid)
          //修改内存中的值
          app.globalData.mid=''
          //console.log('app.globalData.mid = ' + app.globalData.mid)
          //跳转到首页
          wx.switchTab({
            url: '/pages/index/index'
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
})