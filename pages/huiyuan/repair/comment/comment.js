// comment.js
//引入controller
const serviceController = require('../../../../controller/serviceController.js').controller;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    score: 1,
    stars: [],
    level:'差',
    id:'',
    action:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    var action = options.action
    var title = action == 'book' ? '预约评价' : '报修评价'
    console.log(id)
    var that = this
    wx.setNavigationBarTitle({
      title: title
    })
    that.setData({
      action: action,
      id:id,
      stars:that.rating(1)
    })
  },

  /**
   * 提交评价
   */
  formSubmit:function(e){
    var that = this
    var content = e.detail.value.content.trim()
    var imgs = ''
    var star = that.data.score
    var id = that.data.id

    if(content==''){
      wx.showToast({
        title: '请输入评价内容',
      })
      return  
    }

    wx.showLoading({
      title: '提交中...',
    })

    if (that.data.action=='book'){
      serviceController.commentBook(id, star, content, imgs).then(data => {
        wx.hideLoading()
        if (data.code == 10000) {
          wx.showToast({
            title: '评价成功',
          })
          wx.navigateBack({})
        } else {
          wx.showToast({
            title: data.message,
          })
        }
      })
    }else{
      serviceController.commentRepair(id, star, content, imgs).then(data => {
        wx.hideLoading()
        if (data.code == 10000) {
          wx.showToast({
            title: '评价成功',
          })
          wx.navigateBack({})
        } else {
          wx.showToast({
            title: data.message,
          })
        }
      })
    }
    
  },

  /**
   * 店铺评分
   */
  countStar: function (event) {
    var that = this
    var score = event.currentTarget.dataset.index + 1
    console.log('score = ' + score)

    var level = '';
    if(score==1){
      level = '差';
    }else if(score==2){
      level = '一般';
    } else if (score == 3) {
      level = '满意';
    } else if (score == 4) {
      level = '很满意';
    } else if (score == 5) {
      level = '非常满意';
    }

    var stars = that.rating(score)
    that.setData({
      score: score,
      stars: stars,
      level:level
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
  },

  
})