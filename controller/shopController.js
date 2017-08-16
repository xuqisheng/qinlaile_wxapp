
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
  * 获取店铺商品数据
  * @return {Promise} 
  */
  getGoods(id) {
    return request.postAsync(`${URI}/App/productList.html?shop_id=`+id, {
      did: 'A8:60:B6:2D:81:AB',
      encrypt_did: 'db1d273c49d4fa014b4d17250dfc4da4',
    }).then(res => res.data)
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