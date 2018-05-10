// 设置token
export function setToken (data) {
  wx.setStorageSync('token', data)
}

// 得到token
export function getToken () {
  return wx.getStorageSync('token')
}

// 设置用户信息
export function setUserInfo (data) {
  wx.setStorageSync('userInfo', data) // JSON.stringify(data)
}

// 得到用户信息
export function getUserInfo () {
  return wx.getStorageSync('userInfo')
}

// 设置用户网关列表
export function setGatewayDataStorage (data) {
  wx.setStorageSync('gatewayData', data) // JSON.stringify(data)
}

// 获取用户网关列表
export function getGatewayDataStorage () {
  return wx.getStorageSync('gatewayData')
}
