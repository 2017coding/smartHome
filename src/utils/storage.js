// 设置token
export function setToken (data) {
  wx.setStorageSync('token', data)
}

// 得到token
export function getToken () {
  wx.getStorageSync('token')
}

// 设置用户信息
export function setUserInfo (data) {
  wx.setStorageSync('userInfo', data) // JSON.stringify(data)
}

// 得到用户信息
export function getUserInfo () {
  return wx.getStorageSync('userInfo')
}
