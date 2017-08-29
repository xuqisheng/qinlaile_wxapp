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

  // 获取物业详情
  getPropertyDetail(){
    return baseController.postMid('/propertyDetail.html', {
      pp_id: wx.getStorageSync('propertyInfoId')
    })
  }

  /**
   * 获取小区公告
   */
  getNotices(page){
    return baseController.postMid('/announceList.html', {
      vid: wx.getStorageSync('village'),
      pnum:page,
    })
  }

  /**
   * 查询物业
   */
  queryProperty(mobile){
    return baseController.postMid('/propertyFeeOwners.html?act=searchOwner',{
      mobile: mobile,
      isBind:'0',
      vid: wx.getStorageSync('village'),
    })
  }

  /**
   * 公共报修列表
   */
  getPublicList(page){
    return baseController.postMid('/repairsCommentList.html?type=public', {
      page:page
    })
  }

  /**
   * 个人报修列表
   */
  getPersonalList(page){
    return baseController.postMid('/repairsCommentList.html?type=person', {
      page: page
    })
  }

  /**
   * 点赞
   */
  support(id){
    return baseController.postMid('/publicRepairsDetail.html?act=support',{
      id:id
    })
  }

  /**
   * 评论
   */
  comment(content,id){
    return baseController.postMid('/publicRepairsDetail.html?act=comment',{
      content:content,
      id:id
    })
  }

  /**
   * 获取评论列表
   */
  getCommentList(id){
    return baseController.postMid('/publicRepairsDetail.html?act=getPage',{
      id:id
    })
  }

  /**
   * 提交公共报修信息
   */
  repairSubmit(desc,image){
    return baseController.postMid('/repair.html?act=submit',{
      type:1,
      desc:desc,
      image:image
    })
  }

  /**
   * 个人报修提交
   */
  personalRepairSubmit(desc, image,address,tel){
    return baseController.postMid('/repair.html?act=submit', {
      type: 2,
      desc: desc,
      image: image,
      address: address,
      tel:tel
    })
  }

  /**
   * 我的报修列表
   */
  getRepairListByType(curNum,status){
    return baseController.postMid('/myRepairs.html?act=ajax',{
      curNum:curNum,
      type: status
    })
  }

  /**
   * 我的报修列表
   */
  getRepairList(curNum){
    return baseController.postMid('/myRepairs.html?act=ajax', {
      curNum: curNum,
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