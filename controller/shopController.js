
//引入baseController
const baseController = require('baseController.js').controller;


/**
 * 每一个页面对应一个contoller
 */
class ShopController {

  /**
   * 订单详情店铺评分
   */
  comment(order_id,score){
    return baseController.postMid('/orderDetail.html?act=comment',{
      order_id: order_id,
      score:score
    })
  }

  /**
   * 支付
   */
  pay(order_id,payway){
    return baseController.postMid('/orderDetail.html?act=pay', {
      order_id: order_id,
      payway: payway
    })
  }

  /**
   * 取消订单
   */
  cancel(order_id){
    return baseController.postMid('/orderDetail.html?act=cancel', {
      order_id: order_id,
    })
  }

  /**
  * 确认收货
  */
  confirm(order_id) {
    return baseController.postMid('/orderDetail.html?act=confirm', {
      order_id: order_id,
    })
  }

  /**
   * 获取商品详情
   */
  getGoodsDetail(goods_id) {
    return baseController.post('/productDetail.html', {
      goods_id: goods_id
    })
  }


  /**
  * 获取店铺商品数据
  * @return {Promise} 
  */
  getGoods(id) {
    return baseController.post('/productList.html?shop_id='+id)
  }

  /**
   * 获取店铺信息
   * 
   */
  getShopInfo(id) {
    return baseController.post('/shopDetails.html?shop_id=' + id)
  }

  /**
   * 读取用户地址列表
   */
  getUserAddress() {
    return baseController.postMid('/addressList.html')
  }

  /**
   * 提交订单接口/App/confirmOrder.html
   * products参数:[{"product_id":1123,"product_num":3},{"product_id":1120,"product_num":3}]
   */
  viewConfirmOrder(_shop_id, _products) {
    return baseController.postMid('/confirmOrder.html',{
      shop_id: _shop_id,
      products: _products
    })
  }

  /**
   * 提交订单
   * App/confirmOrder.html?act=submit
   */
  confirmOrder(params){
    return baseController.postMid('/confirmOrder.html?act=submit',params)
  }

  /**
   * 获取订单列表
   * App/myOrder.html?act=getPage
   * status:订单类型
   * curNum:分页当前页，默认1
   */
  getOrderList(status, curNum) {
    return baseController.postMid('/myOrder.html?act=getPage', {
      status: status,
      curNum:curNum
    })
  }

  /**
   * 获取订单详情orderDetail.html
   * order_id:订单id
   */
  getOrderDetail(order_id) {
    return baseController.postMid('/orderDetail.html', {
      order_id: order_id,
    })
  }

  /**
   * 获取店铺分类列表
   */
  getStoreTypeList(){
    return baseController.post('/shopCategoryList.html')
  }

  /**
   * 获取店铺列表
   */
  getStoreList(type_id){
    return baseController.postLocation('/shopCategoryList.html?act=getPage',{
      type_id:type_id,
      app_id:'1',
    })
  }

  /**
   * 搜索店铺和商品
   */
  search(search_name){
    return baseController.postLocation('/productSearch.html',{
      app_id:'3',
      search_name: search_name
    })
  }
}
/**
 * 实例化对象
 */
let shopController = new ShopController();
/**
 * 暴露对象，无需每次都加函数名
 */
module.exports = {
  controller: shopController,
}