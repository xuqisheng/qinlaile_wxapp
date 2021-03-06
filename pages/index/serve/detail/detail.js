// detail.js
const app = getApp()
//引入controller
const serviceController = require('../../../../controller/serviceController.js').controller;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    _uri:app.globalData.URI,
    workerInfo:{},
    stars:[],
  },

  // 选择该服务人员
  onClick:function(e){
    
    var mid = app.globalData.mid

    //检查是否登录，否则登录
    if (mid == null || mid == '') {
      wx.navigateTo({
        url: '../../../huiyuan/login/login',
      })
      return
    }
    var id = e.currentTarget.dataset.id;
    var type_id = e.currentTarget.dataset.type_id;
    console.log('type_id:' + type_id)
    console.log('id:' + id)
    wx.navigateTo({
      url: '../engage/engage?id=' + id + '&type_id=' + this.data.type_id,
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    var that = this
    wx.showLoading({
      title: '详情加载中...',
    })
    serviceController.getWorkerDetail(id).then(data=>{
      wx.hideLoading()
      // console.log(data)

      var workerInfo = data.workerInfo

      wx.setNavigationBarTitle({
        title: workerInfo.name+'详情',
      })

      var stars = that.rating(workerInfo.score)
      // console.log(stars)
      that.setData({
        workerInfo:workerInfo,
        stars: stars
      })
    })
  },

  //评分方法
  rating(pingfen) {

    var that = this,　//这里是图片的路径，自己需要改
      data = {
        //从使用评分控件的目录算起
        ling: "../../../../res/icon/star_empty.png",
        zheng: "../../../../res/icon/star_full.png",
        ban: "../../../../res/icon/star_half.png"
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