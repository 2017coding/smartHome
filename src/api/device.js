import fly from '../utils/fly'

// 将数据转换为非json
const querystring = require('qs')
let data

// websocket
export function socketApi (parameter) {
  return fly.post('/api/back/control/getWebSocketInfo', data)
}

// 设备控制的接口
export function deviceControlApi (data) {
  return fly.post('/api/mobile/control', data)
}