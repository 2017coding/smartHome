import fly from '../utils/fly'

// 将数据转换为非json
const querystring = require('qs')
let data

// 获取用户主机列表(获取到所有的数据)
export function getGatewayListApi (parameter) {
  data = querystring.stringify(parameter)
  // return fly.post('/api/mobile/getGateWayByUser', data)
  return fly.post('/api/mobile/getPlugsByUser', data)
}

// 获取主机详细信息
export function getGatewayInfoApi (data) {
  return fly.post('/api/back/control/getGatewayInfo', data)
}
