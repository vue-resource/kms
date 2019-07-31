import service from './apis.js/index.js'
/**
 * 获取用户信息
 * @param {loginInfo: {user,password} }
 * @param {Function} success
 * @param {Function} fail
 */
console.log("11",service)
function login(loginInfo, success, fail) {
  const url = service.login('login')
  const reqData = loginInfo
  service.postRequest(url, reqData, function (res) {
    typeof success === 'function' && success(res.data)
  }, function (error) {
    typeof fail === 'function' && fail(error)
  })
}
function logout(logoutInfo, success, fail) {
  const url = service.logout('logout')
  const reqData = logoutInfo
  service.postRequest(url, reqData, function (res) {
    typeof success === 'function' && success(res.data)
  }, function (error) {
    typeof fail === 'function' && fail(error)
  })
}

export default {
  login,
  logout
}