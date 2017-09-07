// insert.js
//引入controller
const userController = require('../../../../controller/userController.js').controller

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    area:'选择区县',
    action:'edit',
    area_id: '',
    areas:[],
    showPopupwindow:false,
    update:false,
    detail:'',
    //当前地址
    current:'',
    locationInfo:{},

    consignee: '',
    mobile: '',
    addr: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var action = options.action
    var title = '新增收货地址'
    if(action=='edit'){
      title = '编辑收货地址'
      var address = JSON.parse(options.address)
      that.setData({
        address: address,
        area_id:address.area_id
      })
    }

    that.setData({
      action: action
    })
    wx.setNavigationBarTitle({
      title: title,
    })
  },

  /**
   * 删除地址
   */
  delete:function(){
    var that = this
    wx.showModal({
      title: '确定删除吗？',
      success:function(res){
        if(res.confirm){
          userController.deleteAddress(that.data.address.id).then(data=>{
            if(data.code==10000){
              wx.navigateBack({})
            }else{
              wx.showToast({
                title: data.message,
              })
            }
          })
        }else if (res.cancel){
          console.log('用户取消')
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    //获取当前位置（经纬度）
    wx.getLocation({
      success: function (res) {
        console.log(res)

        //逆地址解析
        userController.getLocationName(res.latitude, res.longitude).then(data => {
          console.log(data)

          that.setData({
            current: data.result.address,
            locationInfo: data.result.address_component
          })
        })
      }
    })
  },

  //切换至当前位置
  switchNow:function(){
    var that = this
    if (that.data.current!=''){
      that.setData({
        update:true,
        area: that.data.locationInfo.district,
        detail: that.data.locationInfo.street_number,
        //默认德城区
        area_id:'1636'
      })
    }
  },

  /**
   * 提交
   */
  formSubmit:function(e){
    var that = this
    var consignee = e.detail.value.consignee.trim()
    var mobile = e.detail.value.mobile.trim()
    var is_default = e.detail.value.is_default
    var detail = e.detail.value.detail.trim()

    // console.log('consignee = ' + consignee)
    // console.log('is_default = ' + is_default)

    if (consignee==''){
      wx.showToast({
        title: '请输入收件人姓名',
      })
      return
    }

    if (mobile == '') {
      wx.showToast({
        title: '请输入收件人电话',
      })
      return
    }

    if (detail == '') {
      wx.showToast({
        title: '请输入详细地址',
      })
      return
    }

    if (that.data.area_id==''){
      wx.showToast({
        title: '请选择区县',
      })
      return
    }

    that.setData({
      detail: detail,
      consignee: consignee,
      mobile:mobile,
      addr: '山东省 德州市 ' + that.data.area+ ' ' + detail
    })


    //山东省1502
    var province_id = wx.getStorageSync('province_id')
    //德州市
    var city_id = '1634';

    // userController.requestCity(province_id).then(data => {
    //   console.log(data)
    // })

    var def_addr = 0;
    if(is_default){
      wx.setStorage({
        key: 'default_address',
        data: detail
      })
      def_addr = 1;
    }
    

    if(that.data.action=='edit'){
      userController.updateAddress(that.data.address.id, consignee, mobile, province_id, city_id, that.data.area_id, that.data.detail, def_addr).then(data => {
        that.process(data)
      })
    }else{
      userController.insertAddress(consignee, mobile, province_id, city_id, that.data.area_id, that.data.detail, def_addr).then(data=>{
        that.process(data)
      })
    }
  },

  process(data){
    var that = this
    console.log(data)
    console.log('action=' + that.data.action)
    if (data.code == 10000) {
      if(that.data.action=='buy'){

        //选定地址
        var pages = getCurrentPages()
        var prevPage = pages[pages.length - 1]  //当前界面
        var prevPage = pages[pages.length - 2]  //上一个页面

        /**
         * 若从下单页选择新增地址，此处需要设置address信息
         */
        prevPage.setData({
          address: { 
            consignee: that.data.consignee,
            mobile: that.data.mobile,
            addr:that.data.addr
          }
        })
      }
      wx.navigateBack({});
    } else {
      wx.showToast({
        title: data.message,
      })
    }
  },

  /**
   * 选择区县
   */
  selectArea:function(){
    var city_id = '1634';
    var that = this
    if(that.data.areas.length==0){
      userController.requestArea(city_id).then(data => {
        console.log(data)
        if (data.code==10000){
          that.setData({
            areas: data.areas,
            showPopupwindow: true
          })
        }else{
          wx.showToast({
            title: data.message,
          })
        }
      })
    }else{
      that.setData({
        showPopupwindow: true
      })
    } 
  },

  //隐藏弹窗
  hidePopupwindow: function () {
    this.setData({
      showPopupwindow: false
    })
  },

  
  // 点击某个区县
  onAreaClick:function(e){
    var that = this
    var area = e.currentTarget.dataset.area
    var area_id = area.id
    if (area_id != that.data.area_id){
      // that.data.address.area_name = area.name
      that.setData({
        area: area.name,
        area_id: area_id,
        update:true
      })


      //半秒后隐藏
      setTimeout(function(){
        that.setData({
          showPopupwindow: false
        })
      },500)
    }else{
      that.setData({
        showPopupwindow: false
      })
    }
  }

  
})