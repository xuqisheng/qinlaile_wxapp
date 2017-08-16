
const request = require('../utils/request.js')
const linq = require('../lib/linq.min.js').linq

const URI = 'https://www.jiahetianlang.com';

//获取应用实例
var app = getApp()

//全局使用的经纬度
const lat = 30.311620;
const lon = 120.253431;

/**
 * 每一个页面对应一个contoller
 */
class IndexController{

  /**
  * 抓取首页数据
  * @return {Promise} 
  */
  getIndex() {
    var _mid = app.globalData.mid;
    console.log('mid：'+_mid)
    return request.postAsync(`${URI}/App/newIndex.html`, {
      app_id: 5,
      did: 'A8:60:B6:2D:81:AB',
      encrypt_did: 'db1d273c49d4fa014b4d17250dfc4da4',
      //用户id，唯一标识
      mid: _mid,
      version_id: '2',
      version_mini: '2.2',
      latitude: app.globalData.latitude,
      longitude: app.globalData.longitude,
    }).then(res => res.data)
  }

  /**
   * 获取新闻数据
   * @return {Promise} 
   */
  getNews() {
    return request.getAsync(`${URI}/app/news_home.php`).then(res => res.data)
  }

  /**
   * 获取服务数据
   * @return {Promise} 
   */
  getServe(id) {
    return request.postAsync(`${URI}/App/workerList.html?act=getPage`, {
      did: 'A8:60:B6:2D:81:AB',
      encrypt_did: 'db1d273c49d4fa014b4d17250dfc4da4',
      latitude: app.globalData.latitude,
      longitude: app.globalData.longitude,
      type_id: id
    }).then(res => res.data)
  }

  /**
   * 获取店铺数据
   */
  getStore(id) {
    return request.postAsync(`${URI}/App/shopCategoryList.html?act=getPage`, {
      did: 'A8:60:B6:2D:81:AB',
      encrypt_did: 'db1d273c49d4fa014b4d17250dfc4da4',
      latitude: app.globalData.latitude,
      longitude: app.globalData.longitude,
      type_id: id
    }).then(res => res.data)
  }

}
/**
 * 实例化对象
 */
let indexController=  new IndexController();
/**
 * 暴露对象，无需每次都加函数名
 */
module.exports = { 
    controller:indexController,
 }