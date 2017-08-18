
const request = require('../utils/request.js')
const linq = require('../lib/linq.min.js').linq

const URI = 'https://www.jiahetianlang.com';

//获取应用实例
var app = getApp()


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
    return request.postAsync(`${URI}/App/productList.html?shop_id=`+id, {
      did: 'A8:60:B6:2D:81:AB',
      encrypt_did: 'db1d273c49d4fa014b4d17250dfc4da4',
    }).then(res => res.data)
  }

  /**
   * 获取店铺信息
   * 
   */
  getShopInfo(id) {
    return request.postAsync(`${URI}/App/shopDetails.html?shop_id=` + id, {
      did: 'A8:60:B6:2D:81:AB',
      encrypt_did: 'db1d273c49d4fa014b4d17250dfc4da4',
    }).then(res => res.data)
  }

  /**
   * 读取用户地址列表/App/addressList.html
   */
  getUserAddress() {
    return request.postAsync(`${URI}/App/addressList.html`, {
      did: 'A8:60:B6:2D:81:AB',
      encrypt_did: 'db1d273c49d4fa014b4d17250dfc4da4',
      mid:app.globalData.mid,
    }).then(res => res.data)
  }

  /**
   * 提交订单接口/App/confirmOrder.html
   * products参数:[{"product_id":1123,"product_num":3},{"product_id":1120,"product_num":3}]
   */
  viewConfirmOrder(_shop_id, _products) {
    return request.postAsync(`${URI}/App/confirmOrder.html`, {
      did: 'A8:60:B6:2D:81:AB',
      encrypt_did: 'db1d273c49d4fa014b4d17250dfc4da4',
      mid: app.globalData.mid,
      shop_id: _shop_id,
      products: _products
    }).then(res => res.data)
  }

  /**
   * 提交订单
   * App/confirmOrder.html?act=submit
   */
  confirmOrder(params){
    return this._post_request('/confirmOrder.html?act=submit',params)
    // var param = Object.assign({
    //   did: 'A8:60:B6:2D:81:AB',
    //   encrypt_did: 'db1d273c49d4fa014b4d17250dfc4da4',
    //   mid: app.globalData.mid,
    // }, params);
    // console.log('-----订单参数-----')
    // console.log(param)
    // return request.postAsync(`${URI}/App/confirmOrder.html?act=submit`, param).then(res => res.data)
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