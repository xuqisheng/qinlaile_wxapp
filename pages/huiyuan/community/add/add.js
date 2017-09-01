// add.js
//引入controller
const userController = require('../../../../controller/userController.js').controller

Page({

  /**
   * 页面的初始数据
   */
  data: {
    images:[
      //默认图作为最后一个，已选图片放在数组靠前的位置
      '../../../../res/add_img.png',
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  //选择图片上传
  chooseImage:function(e){
    var that = this
    var index = e.currentTarget.dataset.index;
    var length = that.data.images.length
    console.log('选择第'+index+'张图片')

    if(index==length-1){
      wx.chooseImage({
        count: 7 - length, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths
          console.log(tempFilePaths)
          var temp = that.data.images
          for (let i = 0; i < tempFilePaths.length; i++) {
            var url = tempFilePaths[i]
            // 拼接函数(索引位置, 要删除元素的数量, 元素) 
            temp.splice(length - 1, 0, url)
          }
          that.setData({
            images: temp
          })
          console.log(temp)
        }
      })
    }else{
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths
          var url = tempFilePaths[0]
          console.log(url)
          var temp = that.data.images
          // 拼接函数(索引位置, 要删除元素的数量, 元素) 
          temp.splice(index, 1, url)
          that.setData({
            images: temp
          })
          console.log(temp)
        }
      })
    }
  },

  formSubmit:function(e){
    var content = e.detail.value.content;
    if(content==''){
      wx.showToast({
        title: '发帖内容不能为空',
      })
      return
    }

    //base64编码图片路径合集
    var imgs = '';

    wx.showLoading({
      title: '提交中...',
    })
    userController.postThread(content,imgs).then(data=>{
      wx.hideLoading()
      console.log(data)
      if(data.code = 10000){
        wx.showToast({
          title: '发表成功',
        })
        wx.navigateBack({
          delta:1
        })
      }else{
        wx.showToast({
          title: data.message,
        })
      }

    })
  },
  
})