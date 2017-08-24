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

  /**
   * 提交服务人员预约
   */
  submitReservation(typeId, workerId, address, tel, time, remark){
    return baseController.postMid('/submitReservation.html?act=submit', {
      typeId: typeId,
      workerId: workerId,
      address: address,
      tel: tel,
      time: time,
      remark: remark
    })
  }

  // 获取全部状态的预约列表
  getBookList(curNum){
    return baseController.postMid('/myBooking.html?act=ajax', {
      curNum: curNum,
    })
  }

  // 获取预约列表
  getBookListByStatus(curNum, status) {
    return baseController.postMid('/myBooking.html?act=ajax', {
      curNum: curNum,
      status, status
    })
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