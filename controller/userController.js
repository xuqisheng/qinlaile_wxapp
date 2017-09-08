var app = getApp()

//引入baseController
const baseController = require('baseController.js').controller;
const index = require('indexController.js').controller;

/**
 * 会员中心对应contoller
 * 处理登录，注册等操作
 */
class UserController {

  /**
   * 获取微信openid
   */
  getWxOpenId(code){
    return baseController.getWxOpenId(code)
  }

  wxLogin(){

  }

  /**
   * 若realname修改，保存个人信息
   */
  savePersonalInfo(headimg, realname, nickname, license_number, province, city, area, village, address){
    return baseController.postMid('/personSettings.html?act=save',{
      headimg: headimg, 
      realname: realname, 
      nickname: nickname, 
      license_number: license_number,
      //固定值
      province: province,
      city: city,
      area:area,
      village: village,
      address: address
    })
  }

  /**
   * 保存绑定地址数据
   */
  saveAddress(_province, _city, _area, _community_id, _detailAddress) {
    return baseController.postMid('/bindAddress.html?act=save', {
      province: _province,
      city: _city,
      area: _area,
      community_id: _community_id,
      detailAddress: _detailAddress
    })
  }

  /**
   * 个人信息获取
   */
  getPersonalInfo(){
    return baseController.postMid('/personSettings.html',{
      app_id:5
    });
  }

  /**
   * 举报帖子
   */
  reportThread(report_type,report_reason,id){
    return baseController.postMid('/forum.html?act=report',{
      app_id:'3',
      report_type: report_type,
      report_reason: report_reason,
      id:id,
    })
  }

  /**
   * 发帖接口
   */
  postThread(content,imgs){
    return baseController.postMid('/forumAdd.html?act=posting',{
      content:content,
      imgs:imgs
    })
  }

  /**
   * 提交评论
   */
  comment(id,content){
    return baseController.postMid('/forumComment.html?act=submit',{
      id:id,
      content:content
    })
  }

  /**
   * 获取评论列表
   */
  getCommentList(id,page){
    return baseController.postMid('/forumComment.html',{
      id: id,
      page:page,
    })
  }

  /**
   * 帖子点赞
   */
  supportThread(id){
    return baseController.postMid('/forum.html?act=support',{
      id:id
    })
  }

  /**
   * 删除帖子
   */
  deleteThread(id) {
    return baseController.postMid('/forum.html?act=del', {
      id: id
    })
  }

  /**
   * 社区论坛
   */
  getThreads(action,page){
    var append = action == 1 ?'?act=mySelf':''

    return baseController.postMid('/forum.html'+append,{
      page:page
    })
  }


  /**
   * 家政公司提交
   */
  submitHomeService(name,companyName,mobile, IDcard,imgInfo){
    return baseController.postMid('/applyEntering.html',{
      app_id:'3',
      type:1,
      name: name,
      companyName: companyName,
      mobile: mobile,
      IDcard: IDcard,
      imgInfo: imgInfo,
    })
  }

  /**
   * 物业公司提交
   */
  submitProperty(name, companyName, mobile, IDcard, imgInfo,email) {
    return baseController.postMid('/applyEntering.html', {
      app_id: '3',
      type: 2,
      name: name,
      companyName: companyName,
      mobile: mobile,
      IDcard: IDcard,
      imgInfo: imgInfo,
      email: email
    })
  }

  /**
   * 在线小店提交
   */
  submitOnlineStore(name, companyName, mobile, IDcard, imgInfo, permit_license, extra_info) {
    return baseController.postMid('/applyEntering.html', {
      app_id: '3',
      type: 3,
      name: name,
      companyName: companyName,
      mobile: mobile,
      IDcard: IDcard,
      imgInfo: imgInfo,
      permit_license: permit_license,
      extra_info: extra_info,
    })
  }

  /**
   * 入驻申请类别
   */
  getApplyTypes(){
    return baseController.postMid('/applyEntering.html',{
      app_id:'3'
    })
  }

  /**
   * 联系我们
   */
  contactUs(){
    return baseController.postMid('/contactus.html');
  }

  /**
   * 投诉建议
   */
  complain(title,content){
    return baseController.postMid('/complain.html?act=submit',{
      title:title,
      content:content,
    })
  }

  /**
   * 
   * 团队介绍
   */
  getTeamInfo() {
    return baseController.postMid('/team.html')
  }

  /**
   * 保存收货地址（新建）
   */
  insertAddress(consignee, mobile, province_id, city_id, area_id, address, is_default){
    return baseController.postMid('/addressAdd.html?act=submit',{
      consignee: consignee,
      mobile: mobile,
      province_id: province_id,
      city_id: city_id,
      area_id: area_id,
      address: address,
      is_default: is_default
    })
  }

  /**
   * 保存收货地址（编辑/更新）
   */
  updateAddress(addr_id, consignee, mobile, province_id, city_id, area_id, address, is_default){
    return baseController.postMid('/addressAdd.html?act=submit', {
      addr_id: addr_id,
      consignee: consignee,
      mobile: mobile,
      province_id: province_id,
      city_id: city_id,
      area_id: area_id,
      address: address,
      is_default: is_default
    })
  }

  /**
   * 删除地址
   */
  deleteAddress(addr_id){
    return baseController.postMid('/addressList.html?act=del',{
      addr_id: addr_id
    })
  }

  /**
   * 收货地址
   */
  getAddressList(){
    return baseController.postMid('/addressList.html')
  }

  /**
   * 请求省份数据
   */
  requestProvince() {
    return baseController.postMid('/bindAddress.html')
  }

 /**
  * 请求城市数据
  */
  requestCity(_provinceId) {
    return baseController.postMid('/bindAddress.html?act=getCitysByProvinceId',{
      provinceId: _provinceId
    })
  }

  /**
   * 请求区县数据
   */
  requestArea(_cityId) {
    return baseController.postMid('/bindAddress.html?act=getAreasByCityId', {
      cityId: _cityId
    })
  }

  /**
   * 请求小区数据
   */
  requestVillage(_province, _city) {
    return baseController.postMid('/chooseCommunity.html', {
      province: _province,
      city: _city
    })
  }

  

  /**
   * 根据获取的经纬度逆解析当前位置的地址信息
   */
  getLocationName(lat, lon) {
    return baseController.getLocationName(lat, lon)
  }

  /**
  * 用户登录
  */
  login(_mobile, _code) {
    return baseController.post('/login.html?act=login',{
      clientid: '29bc294248dd078d16ac4de2f258b1fd',
      app_id: '5',
      mobile: _mobile,
      code: _code,
    })
  }

 /**
  * 获取登录验证码
  */
  requestLoginCode(_mobile) {
    return baseController.post('/login.html?act=getSmsVerificationCode',{
      app_id: '1',
      mobile: _mobile
    })
  }

  
 /**
  * 获取注册验证码
  */
  requestRegisterCode(_mobile) {
    return baseController.post('/register.html?act=getSmsVerificationCode', {
      app_id: '1',
      mobile: _mobile
    })
  }

  /**
   * 提交注册信息
   */
  register(_mobile, _name, _code) {
    return baseController.post('/register.html?act=bindMobile',{
      clientid: '29bc294248dd078d16ac4de2f258b1fd',
      app_id: '5',
      version_id: '2',
      version_mini: '2.2',
      mobile: _mobile,
      name: _name,
      code: _code,
    })
  }

  /**
   * 设置用户资料，头像，昵称等
   */
  setup(that) {

    //console.log('通过userController设置个人资料')

    //头像
    wx.getStorage({
      key: 'headimg',
      success: function (res) {
        var path = res.data;
        //console.log('用户头像地址：' + path);
        if (path == null || path == '') {
          //若不存在头像，使用默认图片（应用logo）
          path = '../../res/logo.png';//计算路径为使用controller的目录
        } else {
          path = that.data._uri + path;
        }
        that.setData({
          headimg: path
        })
        //处理后地址
        //console.log('用户头像地址：' + path);
      },
    })

    //姓名
    wx.getStorage({
      key: 'username',
      success: function (res) {
        var username = res.data
        console.log('username = ' + username)
        that.setData({
          username: res.data
        })
      },
    })

    //电话
    wx.getStorage({
      key: 'mobile',
      success: function (res) {
        that.setData({
          mobile: res.data
        })
      },
    })

    //小区名称
    wx.getStorage({
      key: 'village_name',
      success: function (res) {
        //若已绑定
        if(res.data!='' && res.data!=null){
          that.setData({
            village_name: res.data
          })

          //小区地址为city_name+area_name+village_name+address
          wx.getStorage({
            key: 'city_name',
            success: function (res) {
              that.setData({
                city_name: res.data
              })
            },
          })

          wx.getStorage({
            key: 'area_name',
            success: function (res) {
              that.setData({
                area_name: res.data
              })
            },
          })

          wx.getStorage({
            key: 'address',
            success: function (res) {
              that.setData({
                address: res.data
              })
            },
          })
        }
      },
      
    })

  }

  /**
   * 登录表单提交
   */
  loginSubmit(_mobile, _code) {
    if (_mobile.length != 11) {
      wx.showToast({
        title: '手机号码输入有误',
      })
      return
    }
    wx.showLoading({
      title: '登录中...',
    })
    //手机号，验证码
    this.login(_mobile, _code).then(data => {
      wx.hideLoading()
      console.log(data)
      var msg = data.message;
      wx.showToast({
        title: msg,
      })
      
      //保存用户信息
      this.saveUserInfoAsync(data, _mobile)
      
      console.log('返回个人页面')
      //跳转到首页
      // wx.switchTab({
      //   url: '/pages/index/index'
      // })
      //返回会员页面
      wx.navigateBack({
        delta:1
      })
    })
  }

  /**
   * 保存用户信息
   */
  saveUserInfoAsync(data, _mobile) {
    var mid = data.mid;
    //console.log('注册信息：mid = ' + mid)

    //同步方式将用户信息保存到内部存储中
    wx.setStorage({
      key: 'mid',
      data: mid,
    })
    //用户唯一ID，类似token
    //注意：从未登录状态到登录状态，需要修改app中初始化的mid值
    app.globalData.mid = mid

    wx.setStorage({
      key: 'mobile',
      data: _mobile,
    })
    //用户账号其他信息
    var info = data.info;

    //console.log(JSON.stringify(info))

    //对象转为字符串，保存
    wx.setStorage({
      key: 'userinfo',
      data: JSON.stringify(info),
    })

    //保存用户头像
    wx.setStorage({
      key: 'headimg',
      data: info.headimg,
    })
    //保存用户姓名
    var realname = info.realname
    console.log('realname = ' + realname)
    wx.setStorage({
      key: 'username',
      data: info.realname,
    })
    wx.setStorage({
      key: 'nickname',
      data: info.nickname,
    })
    // 保存物业信息
    var property_user_id = info.property_user_id
    wx.setStorage({
      key: 'propertyInfoId',
      data: property_user_id,
    })
    //保存用户地址
    wx.setStorage({
      key: 'province_id',
      data: info.province_id,
    })
    //city_id
    wx.setStorage({
      key: 'city_id',
      data: info.city_id,
    })
    //area_id
    wx.setStorage({
      key: 'area_id',
      data: info.area_id,
    })
    //shipping_addr
    wx.setStorage({
      key: 'default_address',
      data: info.shipping_addr,
    })
    //小区名称village_name
    wx.setStorage({
      key: 'village_name',
      data: info.village_name,
    })
    //小区详细address
    wx.setStorage({
      key: 'address',
      data: info.address,
    })
    //省份名称province_name
    wx.setStorage({
      key: 'province_name',
      data: info.province_name,
    })
    //城市名称city_name
    wx.setStorage({
      key: 'city_name',
      data: info.city_name,
    })
    //区名称area_name
    wx.setStorage({
      key: 'area_name',
      data: info.area_name,
    })
    //village
    wx.setStorage({
      key: 'village',
      data: info.village,
    })
    //license_number
    wx.setStorage({
      key: 'license_number',
      data: info.license_number,
    })
  }


  /**
   * 表单提交
   */
  registerSubmit(that) {
    console.log('表单提交注册')


    //校验输入内容
    var _mobile = that.data.mobile
    var _name = that.data.name
    var _code = that.data.code

    if (_mobile == '' || _mobile.length != 11) {
      wx.showToast({
        title: '手机号码输入有误',
      })
      return
    }

    if (_name == '') {
      wx.showToast({
        title: '姓名不能为空',
      })
      return
    }

    if (_code == '') {
      wx.showToast({
        title: '验证码不能为空',
      })
      return
    }
    wx.showLoading({
      title: '注册中...',
    })
    //手机号，姓名，验证码
    this.register(_mobile, _name, _code).then(data => {
      wx.hideLoading()
      var msg = data.message;
      wx.showToast({
        title: msg,
      })

      console.log(data)

      var is_house_worker = data.is_house_worker;
      var mid = data.mid;
      //console.log('注册信息：is_house_worker = ' + is_house_worker + ',mid = ' + mid)

      /*异步保存
      wx.setStorage({
        key: 'mid',
        data: mid,
      })*/

      //同步方式将用户信息保存到内部存储中
      wx.setStorageSync('mid', mid)//用户唯一ID，类似token
      //注意：从未登录状态到登录状态，需要修改app中初始化的mid值
      app.globalData.mid = mid

      wx.setStorageSync('is_house_worker', is_house_worker)

      wx.setStorageSync('username', that.data.name)
      wx.setStorageSync('mobile', that.data.mobile)

      //跳转到首页
      wx.switchTab({
        url: '/pages/index/index'
      })
    })
  }
  
  /**
   * 获取登录验证码
   */
  getLoginCode(that) {

    //若获取验证码按钮不可用，直接返回
    if (that.data.btnCodeDisabled) {
      return
    }

    var _mobile = that.data.mobile;
    console.log('手机号：' + _mobile)

    if (_mobile == '' || _mobile.length != 11) {
      wx.showToast({
        title: '手机号码输入有误',
      })
      return
    }
    wx.showLoading({
      title: '获取中...',
    })
    this.requestLoginCode(_mobile).then(data => {
      var msg = data.message;
      wx.hideLoading()
      console.log(msg)

      wx.showToast({
        title: msg,
      })

      var code = data.code;
      //获取成功，开启倒计时
      if (code == 10000) {
        //禁用按钮
        that.setData({
          btnCodeDisabled: true,
        })

        let temp = 60;
        var flag = setInterval(function () {
          temp--;
          that.setData({
            counter: '重新获取（' + temp + '）'
          })
          //console.log('重新获取（' + temp+'）')

          //1分钟后清除定时器
          if (temp == 0) {
            that.setData({
              counter: '获取验证码',
              //激活按钮
              btnCodeDisabled: false
            })
            clearInterval(flag);
            console.log('清除定时器');
          }
        }, 1000)
      }
    })
  }

  /**
   * 获取验证码
   * 【问题】
   * 在真机上，第一次输入完成后直接点击获取验证码，会先触发获取验证码，后执行bindblur，故会先报错，手机号输入有误
   */
  getRegisterCode(that) {

    //若获取验证码按钮不可用，直接返回
    if (that.data.btnCodeDisabled) {
      return
    }

    var _mobile = that.data.mobile
    console.log('手机号：' + _mobile)

    if (_mobile == '' || _mobile.length != 11) {
      wx.showToast({
        title: '手机号码输入有误',
      })
      return
    }

    this.requestRegisterCode(_mobile).then(data => {
      var msg = data.message;
      var code = data.code;
      console.log(msg)

      wx.showToast({
        title: msg,
      });

      //获取成功，开启倒计时
      if (code == 10000) {
        //禁用按钮
        that.setData({
          btnCodeDisabled: true,
        })
        
        let temp = 60;
        var flag = setInterval(function () {
          temp--;
          that.setData({
            counter: '重新获取（' + temp + '）'
          })
          //console.log('重新获取（' + temp+'）')

          //1分钟后清除定时器
          if (temp == 0) {
            that.setData({
              counter: '获取验证码',
              //激活按钮
              btnCodeDisabled: false
            })
            clearInterval(flag);
            console.log('清除定时器');
          }
        }, 1000)
      }
    })

  }
}
/**
 * 实例化对象
 */
let userController = new UserController();
/**
 * 暴露对象，无需每次都加函数名
 */
module.exports = {
  controller: userController,
}