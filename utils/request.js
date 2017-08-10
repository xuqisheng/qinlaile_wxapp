const Promise = require('../lib/es6-promise.min.js').Promise

class Request{

  /**
   * get方式抓取API数据
   * @param  {String} url    链接
   * @param  {Objece} params 参数
   * @return {Promise}       包含抓取任务的Promise
   */
  getApi(url, params) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${url}`,
        header: { 'Content-Type': 'application/json' },
        data: Object.assign({}, params),
        success: resolve,
        fail: reject
      })
    })
  }

  /**
   * post方式抓取API数据
   * @param  {String} url    链接
   * @param  {Objece} params 参数
   * @return {Promise}       包含抓取任务的Promise
   */
  postApi(url, params) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${url}`,
        method:'POST',
        //post方式header使用form提交；get方式使用json
        header: {"Content-Type": "application/x-www-form-urlencoded"}, 
        data: Object.assign({}, params),
        success: resolve,
        fail: reject
      })
    })
  }

}

let request = new Request();

module.exports = {
  getAsync: request.getApi,
  postAsync: request.postApi
}

/**
 * Object.assign() 方法用于将所有可枚举的属性的值从一个或多个源对象复制到目标对象，它将返回目标对象。
 * 【语法】Object.assign(target, ...sources)
 * 【参数】target 目标对象
 *        sources (多个)源对象
 * 【返回值】目标对象
 * 
 * 【参见】https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 */