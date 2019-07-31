import Axios from 'axios'

const data = {
  // "proxy":""//代理地址
  // host: '', //  请求地址正式环境
  // host: '',//  请求地址测试环境
  host: 'http://localhost:8080', // 本地环境

  // 网络请求地址
  requestPath: {
    login: '/rms_api/login', // 登陆
    logout: 'rms_api/logout',//退出登录
    getIssueList:'issue/getIssueList',//获取问题列表
    closeIssue:'issue/closeIssue',//关闭问题
    createIssue:'issue/createIssue',//创建问题
    updateIssue:'issue/updateIssue',//修改问题
    createTarget:'target/createTarget',//创建目标信息
    getTargetDirectoryInfoList:'target/getTargetDirectoryInfoList',//获取目标列表信息
    getTargetmodelList:'target/getTargetmodelList',//获取目标模板库信息
    updateTarget:'target/updateTarget',//更新目标信息
    updateProjectInfo:'project/updateProjectInfo',//编辑项目信息
    getProjectList:'project/getProjectList',//获取项目列表
    getNodeList:'node/getNodeList',//获取项目的节点列表信息       
  }
}

/**
 * 获取请求地址
 * @param {String} key
 */
function getRequestUrl(key) {
  if (key && typeof key === 'string' && key.length > 0) {
    let path = data.requestPath[key]
    if (path) {
      const url = data.host + path
      return url
    }
    console.log('[getRequestUrl] can not find value for key: ', key)
    return ''
  }
  console.log('[getRequestUrl] invalid key')
  return ''
}

/**
 * POST请求
 * @param {String} url //请求地址
 * @param {Object} data //请求参数
 * @param {Function} success //成功回调
 * @param {Function} fail //失败回调
 */

function postRequest(url, data = {}, success, fail) {
  let token = util.session('token') || ''
  let req = {
    "token": token,
    "version": 10000,
    "lang": "en",
    "data": data
  }

  let formData = new FormData();
  formData.append("data", JSON.stringify(req));
  return Axios.post(url, formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Unencrypted': true
    }
  }).then(res => {
    console.log('[response]', res)
    if (res.data.errorCode === 2001 && !res.data.success) {
      window.location.href = `${window.location.origin}/login`
    } else {
      typeof success === 'function' && success(res)
    }
  }).catch(error => {
    console.error('[error]', error)
    typeof fail === 'function' && fail(error)
  })
}

/**
 * POSTFORM请求(上传专用请求)
 * @param {String} url //请求地址
 * @param {Object} data //请求参数
 * @param {Function} success //成功回调
 * @param {Function} fail //失败回调
 */

var ajaxFormFn = function (uri, formObj, suc, fail) {
  let xhr = new XMLHttpRequest();
  var getXmlHttpRequest = function () {
    if (window.XMLHttpRequest) {
      //主流浏览器提供了XMLHttpRequest对象
      return new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      //低版本的IE浏览器没有提供XMLHttpRequest对象
      //所以必须使用IE浏览器的特定实现ActiveXObject
      return new window.ActiveXObject("Microsoft.XMLHttpRequest");
    }
  };
  xhr = getXmlHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      //获取成功后执行操作
      //数据在xhr.responseText
      var resJson = JSON.parse(xhr.responseText)
      suc && suc(resJson);
    } else {
      fail && fail()
    }
  };
  xhr.open("post", uri, true);
  xhr.setRequestHeader('X-Unencrypted', true)
  xhr.onload = function () {
  };
  xhr.send(formObj);
}

/**
 * GET请求
 * @param {String} url //请求地址
 * @param {Object} data //请求参数
 * @param {Function} success //成功回调
 * @param {Function} fail //失败回调
 */
function getRequest(url, data = {}, success, fail) {
  Axios.get(url, {
    params: data
  }).then(res => {
    console.debug('[response]', res)
    typeof success === 'function' && success(res)
  }).catch(error => {
    console.error('[error]', error)
    typeof fail === 'function' && fail(error)
  })
}

export default {
  getRequestUrl: getRequestUrl,
  postRequest: postRequest,
  getRequest: getRequest,
  ajaxFormFn,
}
