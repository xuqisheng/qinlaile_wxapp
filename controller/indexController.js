//引入baseController
const baseController = require('baseController.js').controller;

/**
 * 首页对应contoller
 */
class IndexController{

  /**
  * 抓取首页数据
  * @return {Promise} 
  */
  getIndex() {
    return baseController.postMidLocation('/newIndex.html',{
      app_id: '5',
      version_id: '2',
      version_mini: '2.2',
    })
  }

  /**
   * 获取新闻数据
   * @return {Promise} 
   */
  getNews() {
    return baseController._get('/news_home.php')
  }


  /**
   * 获取服务数据
   * @return {Promise} 
   */
  getServe(id) {
    return baseController.postLocation('/workerList.html?act=getPage', { type_id: id })
  }

  /**
   * 获取店铺数据
   */
  getStore(id) {
    return baseController.postLocation('/shopCategoryList.html?act=getPage', { type_id: id})
  }

  /**
   * 获取家政服务列表
   */
  getHomeService(){
    return baseController.post('/serviceTypeList.html',{ app_id: '3'})
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