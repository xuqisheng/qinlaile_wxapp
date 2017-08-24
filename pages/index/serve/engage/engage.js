// engage.js
//引入controller
const serviceController = require('../../../../controller/serviceController.js').controller;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:'',
    mobile:'',
    workerId:'',
    typeId:'',
    date:'请选择日期',
    time:'请选择时间',
    start:'',
    end:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var workerId = options.id;
    var typeId = options.type_id;
    // console.log(typeId+":"+workerId)

    //city_name+area_name+village_name+address
    var address = wx.getStorageSync('city_name') + wx.getStorageSync('area_name')
     + wx.getStorageSync('village_name') + wx.getStorageSync('address');
    var mobile = wx.getStorageSync('mobile')
    // console.log(address + ";" + mobile)

    var that = this

    var year = new Date().getFullYear()
    var month = new Date().getMonth()+1
    var day = new Date().getDate()
    
    var start = year + '-' + month + '-' + day
    var end = year + '-' + (month+1) + '-' + day

    // console.log(start)
    // console.log(end)

    that.setData({
      workerId: workerId,
      typeId: typeId,
      address: address,
      mobile: mobile,
      end:end,
      start:start
    })
  },

  // 日期picker
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  // 时间picker
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  
  // 表单提交
  submit:function(e){
    var address = e.detail.value.addr.trim()
    var tel = e.detail.value.tel.trim()
    var date = e.detail.value.date
    var time = e.detail.value.time
    var remark = e.detail.value.remark.trim()

    // console.log('tel:'+tel)
    // console.log('time:' + time)
    if (address == '') {
      wx.showToast({
        title: '请填写地址',
      })
      return
    }

    if (tel == '') {
      wx.showToast({
        title: '请填写电话',
      })
      return
    }

    if (date == '请选择日期') {
      wx.showToast({
        title: '请选择日期',
      })
      return
    }

    if (time =='请选择时间'){
      wx.showToast({
        title: '请选择时间',
      })
      return
    }

    if (remark == '') {
      wx.showToast({
        title: '请填写备注',
      })
      return
    }

    var that = this
    var timeStr = date +' '+ time
    wx.showLoading({
      title: '预约提交中...',
    })

    serviceController.submitReservation(that.data.typeId, that.data.workerId, address, tel,timeStr,remark).then(data=>{
      console.log(data)
      wx.hideLoading()

      if(data.code==10000){
        wx.showToast({
          title: '预约成功',
        })
        wx.redirectTo({
          url: '../../../huiyuan/myengage/myengage',
        })
      }else{
        wx.showToast({
          title: data.message,
        })
      }
    })
  },
})