var app = getApp();

//引入shopController
const shopController = require('../../controller/shopController.js').controller;

Page({
	data: {
    _uri:app.globalData.URI,
		goods: '',
		goodsList: [],
    //店铺logo图片
    storeAvatar:'',

    //【字典】goodsList对应的只包含商品的列表，_14926:{}
    pureGoods:{},

    shopId:'',
    //cart_shopId 当前店铺的id，用于存储本地购物车数据CART_125:{...}；在该页面卸载或计算之后写入到本地存储
    cart_shopId:'',
		cart: {
			count: 0,
			total: 0,
			list: {
        //使用商品唯一id作为属性，数量作为值，如：14926:2
      }
		},
		showCartDetail: false,

    //店铺头信息
    shop:{},
    // 是否免运费（暂不使用）
    is_set_free_shipping:'1',
    //运费
    delivery_fee:'',
    //免邮费限额
    free_shipping_money:'',
    //免邮标记
    free_shipping:false,


    /*可以不在此声明，setData中使用时再声明*/
    classifySeleted:'',
    classifyViewed:'',
    
    //最后一个商品的id
    last_goods_id:'',
	},

  /**
   * 商品详情页
   */
  toDetail:function(e){
    var that = this
    var goods = e.currentTarget.dataset.goods
    // console.log(goods)

    wx.navigateTo({
      url: 'goods/goods?goodsStr=' + JSON.stringify(goods) + '&score=' + that.data.score,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('------onShow()-----')
    var that = this
    //先读取本地存储中的数据
    var cart_shopId = that.data.cart_shopId;
    wx.getStorage({
      key: cart_shopId,
      success: function (res) {
        console.log('读取本地购物车数据：' + res.data)
        that.setData({
          cart: JSON.parse(res.data)
        })

        // 计算运费
        that.calcFee();
      },
    })

  },

  /**
   * 计算运费
   */
  calcFee:function(){
    var that = this
    //计算运费
    var fee = 0;
    //免邮费限额
    var limit = 0;
    //数字转换异常处理
    try {
      fee = parseFloat(that.data.delivery_fee)
      limit = parseFloat(that.data.free_shipping_money)
    } catch (e) {
      fee = 0;
      limit = 0;
    }
    if (fee > 0 && that.data.cart.total < limit) {
      console.log('不免运费')
      this.setData({
        free_shipping: false
      })
    } else {
      console.log('免运费')
      this.setData({
        free_shipping: true
      })
    }
  },

  /**
   * 
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 将购物车数据写入本地存储
   */
  saveCartData:function(){
    var that = this
    var cartStr = JSON.stringify(that.data.cart)
    console.log('------saveCartData()------')
    console.log('存储本地购物车数据：' + cartStr)

    wx.setStorage({
      key: that.data.cart_shopId,
      data: cartStr,
    })
  },


	onLoad: function (options) {
    var that = this;
    
    var score = options.score
    that.setData({
      score: score
    })
    console.log('score = '+score)
    var shop_id = options.shop_id
    //若为搜索点击过来
    if (shop_id != undefined && shop_id != null && shop_id!=''){
      
      that.setData({
        shopId: shop_id,
        cart_shopId: 'CART_' + shop_id,
        delivery_fee: options.delivery_fee,
        free_shipping_money: options.free_shipping_money
      })

      that.loadShopData(shop_id);
    }else{
      var shop = JSON.parse(options.shop);
      var shopId = shop.id;;
      //取出店铺id和店铺名称
      console.log('shopId = ' + shopId)
      var cart_shopId = 'CART_' + shopId;

      that.setData({
        shopId: shopId,
        cart_shopId: cart_shopId,
        delivery_fee: shop.delivery_fee,
        free_shipping_money: shop.free_shipping_money
      })

      wx.setNavigationBarTitle({
        title: shop.company_name,
      })
      that.loadShopData(shopId);
    }

	},

  //找出最后一个商品id
  findLastGoodsId: function (classifyList) {
    var productLists = classifyList[classifyList.length - 1].productLists
    var last_goods_id = productLists[productLists.length - 1].id
    console.log('last_goods_id:' + last_goods_id)

    this.setData({
      last_goods_id: last_goods_id
    })
  },

  // 请求店铺信息
  loadShopData(shopId){
    var that = this;
    //请求店铺内商品
    shopController.getGoods(shopId).then(data => {
      console.log(data)
      var temp = data.data;
      var res = temp.map(function (item) {
        item.classifyId = '_' + item.type_id;
        return item;
      })

      //找出最后一个商品id
      that.findLastGoodsId(temp);

      //为每个item增加非以数字开头的分类id
      //console.log(res)

      //计算出只有商品的列表
      var res2 = {};
      for (let i = 0; i < temp.length; i++) {
        let temp2 = temp[i].productLists
        for (let j = 0; j < temp2.length; j++) {
          let goods = temp2[j]
          let id = goods.id
          //【动态添加属性】以商品id为属性，以商品对象为值
          res2[id] = goods;
        }
      }
      //console.log(res2)

      that.setData({
        goodsList: res,
        pureGoods: res2
      });

      //console.log(that.data.pureGoods)

      //【异步数据】先为goodsList赋值，再计算选中的分类
      that.setData({
        classifySeleted: that.data.goodsList[0].classifyId
      });
    })

    /**
     * 获取店铺信息
     */
    shopController.getShopInfo(shopId).then(data => {
      //console.log(data.data)
      var url = '../../res/logo.png';
      if (data.data.images.length != 0) {
        url = app.globalData.URI + data.data.images[0].src
      }

      // console.log(data.data)
      this.setData({
        shop: data.data,
        storeAvatar: url
      })
    })
  },

  
  /**
   * 添加到购物车
   */
	tapAddCart: function (e) {
    var id = e.target.dataset.id
    //console.log(id)
		this.addCart(id);
	},
	tapReduceCart: function (e) {
		this.reduceCart(e.target.dataset.id);
	},
  
	addCart: function (id) {
		var num = this.data.cart.list[id] || 0;
		this.data.cart.list[id] = num + 1;
		this.countCart();
	},
	reduceCart: function (id) {
		var num = this.data.cart.list[id] || 0;
		if (num <= 1) {
			delete this.data.cart.list[id];
		} else {
			this.data.cart.list[id] = num - 1;
		}
		this.countCart();
	},

  /**
   * 计算购物车数量
   */
	countCart: function () {
    //console.log(this.data.pureGoods)
		var count = 0,
			total = 0;
		for (var id in this.data.cart.list) {

      //console.log('data.cart.list：' + id)
      //仍使用[]读取属性
      var goods = this.data.pureGoods[id];

      //console.log(goods)

			count += this.data.cart.list[id];
			total += goods.price * this.data.cart.list[id];
		}
		this.data.cart.count = count;

    //计算运费
    var fee = 0;
    //免邮费限额
    var limit = 0;
    //数字转换异常处理
    try{
      fee = parseFloat(this.data.delivery_fee)
      limit = parseFloat(this.data.free_shipping_money)
    }catch(e){
      fee = 0;
      limit = 0;
    }
    if (count!=0 && fee > 0 && total < limit){
      total += fee;
      console.log('不免运费')
      this.setData({
        free_shipping: false
      })
    }else{
      console.log('免运费')
      this.setData({
        free_shipping:true
      })
    }
    //所有价格保留两位小数
		this.data.cart.total = total.toFixed(2);
		this.setData({
			cart: this.data.cart
		});
    //写到本地
    this.saveCartData()
	},

  /**关注店铺 */
	follow: function () {
		this.setData({
			followed: !this.data.followed
		});
	},

  /**
   * 商品滚动监听，同步分类的选中状态
   */
	onGoodsScroll: function (e) {
    var top = e.detail.scrollTop
    /**
     * 往上滚动，scrollTop值越来越大；反之，越来越小
     */
    // console.log('e.detail.scrollTop:' + top)
    // console.log('e.detail.scrollWidth:' + e.detail.scrollWidth)//315
    
    if (top > 10 && !this.data.scrollDown) {
			this.setData({
				scrollDown: true
			});
    } else if (top < 10 && this.data.scrollDown) {
			this.setData({
				scrollDown: false
			});
		}

		var scale = e.detail.scrollWidth / 570,
      scrollTop = top / scale,
			h = 0,
			classifySeleted,
			len = this.data.goodsList.length;
		this.data.goodsList.forEach(function (classify, i) {
      // 70为标题高度；
      var _h = 70 + classify.productLists.length * 170;
			if (scrollTop >= h - 100 / scale) {
        classifySeleted = classify.classifyId;
			}
			h += _h;
		});
		this.setData({
			classifySeleted: classifySeleted
		});
	},

  /**
   * 点击分类
   */
	tapClassify: function (e) {
		var id = e.target.dataset.id;
    console.log('点击分类：'+id)
		this.setData({
			classifyViewed: id
		});
		var self = this;
		setTimeout(function () {
			self.setData({
				classifySeleted: id
			});
		}, 100);
	},

  /**
   * 查看购物车
   */
	showCartDetail: function () {
		this.setData({
			showCartDetail: !this.data.showCartDetail
		});
	},

  /**
   * 隐藏购物车
   */
	hideCartDetail: function () {
		this.setData({
			showCartDetail: false
		});
	},

  /**
   * 提交订单
   */
	submit: function (e) {
    var mid = app.globalData.mid
    //var mid = wx.getStorageSync('mid')
    console.log('mid = '+mid)
    //检查是否登录，否则登录
    if (mid == null || mid== ''){
      wx.navigateTo({
        url: '../huiyuan/login/login',
      })
      
      return
    }

    console.log('选好商品，提交了')

    //读取用户地址结构

    var self = this;
    var products = '['

    for (let id in self.data.cart.list) {
      console.log('-----提交订单-----')
      let num = self.data.cart.list[id];
      products += '{"product_id":' + id +',"product_num":'+num+'},';
      //console.log(id + ':' + num)
    }

    products = products.substring(0,products.length-1);
    products+=']'
    console.log('products:' + products)

    //创建订单信息确认
    shopController.viewConfirmOrder(self.data.shopId, products).then(data=>{
      //移除当前店铺购物车数据：本地加内存
      console.log(data)

      /**
       * 携带参数：
       * 1.products
       * 2.data
       * 3.购买商品goods（data中包含购买商品数据）
       */
      //var goods = [];//+'&goods'+goods

      wx.navigateTo({
        url: 'order/order?products=' + products + '&data=' + JSON.stringify(data)+'&cart_shopId='+self.data.cart_shopId,
      })
    })

    // wx.navigateTo({
    //   url: 'order/order',
    // })
	}
});

