
//引入baseController
const baseController = require('baseController.js').controller;


/**
 * 每一个页面对应一个contoller
 */
class ShopController {

  /**
   * post方式抓取API数据，封装所有的必须参数mid，did和encrypt_did
   * @param  {String} uri    链接
   * @param  {Objece} _param  参数
   * @return {Promise}       包含抓取任务的Promise
   */
  _post_request(uri,_param){
    var url = `${URI}/App` + uri;
    var param = Object.assign({
      mid: app.globalData.mid,
      did: 'A8:60:B6:2D:81:AB',
      encrypt_did: 'db1d273c49d4fa014b4d17250dfc4da4',
    },_param);

    console.log('-----请求开始-----')
    console.log(url)
    console.log(param)
    console.log('-----请求结束-----')
    return request.postAsync(url,param).then(res => res.data)
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