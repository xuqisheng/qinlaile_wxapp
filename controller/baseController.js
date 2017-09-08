
const request = require('../utils/request.js')
// const linq = require('../lib/linq.min.js').linq

//腾讯地图webService接口
const MAP_API = 'https://apis.map.qq.com/ws/geocoder/v1/';

const APP_ID = 'wx5f6c0b635cc84b43';
const APP_SECRET = 'f1e1bfdcc1fe14577128778b12b1d5ba'

//获取应用实例
var app = getApp()

const URI = app.globalData.URI;

/**
 * BaseController
 */
class BaseController {

  
  /**
     * 获取微信openid
     */
  getWxOpenId(code){
    var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=+' + `${APP_ID}` + '&secret=' + `${APP_SECRET}`+'&js_code='+code+'&grant_type=authorization_code'
    console.log('获取微信openid')
    console.log(url)
    return request.getAsync(url).then(res => res.data)
  }


  /**
   * 逆地址解析
   * 通过腾讯地图开放平台webService接口，根据获取的经纬度逆解析当前位置的地址信息
   */
  getLocationName(lat, lon) {
    var url = `${MAP_API}?location=` + lat + ',' + lon + '&key=IEGBZ-ALXC4-B4CUG-X2V36-AU4HO-52BE7';
    console.log(url)

    return request.getAsync(url).then(res => res.data)
  }

  /**
   * post方式抓取API数据，带参数latitude，longitude，mid，did和encrypt_did
   * @param  {String} uri    链接
   * @param  {Objece} _param  参数
   * @return {Promise}       包含抓取任务的Promise
   */
  postMidLocation(uri, _param) {
    return this.postMid(uri, Object.assign({
      latitude: app.globalData.latitude,
      longitude: app.globalData.longitude,
    }, _param))
  }


  /**
   * post方式抓取API数据，带参数latitude，longitude，did和encrypt_did
   * @param  {String} uri    链接
   * @param  {Objece} _param  参数
   * @return {Promise}       包含抓取任务的Promise
   */
  postLocation(uri, _param) {
    return this.post(uri, Object.assign({
      latitude: app.globalData.latitude,
      longitude: app.globalData.longitude,
    }, _param))
  }

  /**
   * post方式抓取API数据，带参数mid，did和encrypt_did
   * @param  {String} uri    链接
   * @param  {Objece} _param  参数
   * @return {Promise}       包含抓取任务的Promise
   */
  postMid(uri, _param) {
    return this.post(uri, Object.assign({
      mid: app.globalData.mid,
    }, _param))
  }


  /**
     * post方式抓取API数据，封装所有的必须参数did和encrypt_did
     * @param  {String} uri    链接
     * @param  {Objece} _param  参数
     * @return {Promise}       包含抓取任务的Promise
     */
  post(uri, _param) {
    var url = `${URI}/App` + uri;
    var param = Object.assign({
      did: 'A8:60:B6:2D:81:AB',
      encrypt_did: 'db1d273c49d4fa014b4d17250dfc4da4',
    }, _param);

    console.log('-----请求开始-----')
    console.log(url)
    console.log(param)
    console.log('-----请求结束-----')
    return request.postAsync(url, param).then(res => res.data)
  }

  /**
   * get方式抓取API数据
   * @param  {String} uri    链接
   */
  _get(uri){
    return request.getAsync(`${URI}/app`+uri).then(res => res.data)
  }
  
}
/**
 * 实例化对象
 */
let baseController = new BaseController();
/**
 * 暴露对象，无需每次都加函数名
 */
module.exports = {
  controller: baseController,
}