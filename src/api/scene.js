import fly from '../utils/fly'

// 将数据转换为非json
const querystring = require('qs')
let data

// 获取情景
export function getModListApi (parameter) {
  data = querystring.stringify(parameter)
  return fly.post('/api/mod/getModList', data)
}

// 执行情景
export function executeModApi (data) {
  return fly.post('/api/mod/dealMod', data)
}

// 添加情景
export function addModApi (data) {
  return fly.post('/api/mod/addMod', data)
}

// 编辑情景
export function editModApi (data) {
  return fly.post('/api/mod/modifyMod', data)
}

// 删除情景
export function deleteModApi (data) {
  return fly.post('/api/mod/delMod', data)
}