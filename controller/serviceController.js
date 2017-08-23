//引入baseController
const baseController = require('baseController.js').controller;

/**
 * 家政服务页对应contoller
 */
class ServiceController {

  /**
  * 抓取首页数据
  * @return {Promise} 
  */
  getWorkerDetail(workerId) {
    return baseController.postLocation('/workerDetail.html', {
      workerId: workerId,
    })
  }

  /**
   * 获取服务数据
   * @return {Promise} 
   */
  getServe(id) {
    return baseController.postLocation('/workerList.html?act=getPage', { type_id: id })
  }

  

}
/**
 * 实例化对象
 */
let serviceController = new ServiceController();
/**
 * 暴露对象，无需每次都加函数名
 */
module.exports = {
  controller: serviceController,
}