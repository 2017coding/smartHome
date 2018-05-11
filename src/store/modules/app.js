import {
  getToken,
  setGatewayDataStorage,
  getGatewayDataStorage
} from '@/utils/storage'
import { socketApi } from '@/api/device'

const Stomp = require('../../../static/socket/stomp.js')
const SockJS = require('../../../static/socket/sockjs.js')

const app = {
  state: {
    gatewayData: getGatewayDataStorage(), // 网关列表
    selectGatewayInfo: {},  // 当前选中的网关数据
    deviceWebsocket: {}, // 设备控制的websocket数据
    sceneSelectDeviceList: [] // 情景选择的设备
  },

  mutations: {
    SET_GATEWAYDAT: (state, gatewayData) => {
      state.gatewayData = gatewayData
    },
    SET_SELECTGATEWAYINFO: (state, selectGatewayInfo) => {
      state.selectGatewayInfo = selectGatewayInfo
    },
    SET_DEVICEWEBSOCKET: (state, deviceWebsocket) => {
      state.deviceWebsocket = deviceWebsocket
    },
    SET_SCENESELECTDEVICELIST: (state, sceneSelectDeviceList) => {
      state.sceneSelectDeviceList = sceneSelectDeviceList
    }
  },

  actions: {
    // 存下配电历史数据
    setGatewayData ({
      commit
    }, data) {
      return new Promise((resolve, reject) => {
        setGatewayDataStorage(data.gatewayList)
        commit('SET_GATEWAYDAT', data.gatewayList)
        resolve()
      })
    },
    // 连接websocket
    ConnectWebsocket ({
      commit,
      state
    }) {
      // 得到数据
      //  let URL = '121.201.85.21'
      let URL, port, topicList, stompClient
      URL = 'http://www.zwrtmqtt.top'
      topicList = []
      // 得到端口号和订阅信息
      function socketInfo () {
        return new Promise((resolve, reject) => {
          let parameter = {
            groupId: state.userInfo.companyId,
            userId: state.userId
          }
          socketApi(parameter).then((response) => {
            if ((response.code + '') === '20000') {
              // 得到端口号
              port = response.content.port
              // 得到订阅信息
              topicList = response.content.topicList
              // 订阅公司
              topicList.push('/topic/uooz/server/yun/callback/' + state.userInfo.companyId)
            } else {
              // 全局参数,触发弹窗
              commit('SET_WEBSOCKETTIMEOUT', { type: 'websocketConnect', timeout: true })
              console.log('websocket连接失败')
            }
            resolve()
          })
            .catch(() => {
              // 请求失败
              reject()
            })
        })
      }
      // 连接websocket
      function websocketConnect () {
        // 建立连接
        console.log('建立连接')
        var socket = new SockJS('http://' + URL + ':' + port + '/websocket?' + getToken()) // 192.168
        stompClient = Stomp.over(socket)

        stompClient.connect({}, function (frame) {
          console.log('getWebsocketInfo--success--1')

          commit('SET_WEBSOCKETSTOMPCLIENT', stompClient) // 将websocket实例存下

          // 连接成功，返回数据
          for (let i = 0, len = topicList.length; i < len; i++) {
            stompClient.subscribe(topicList[i], function (messageOutput) {
              // 设置参数
              let cmd = JSON.parse(messageOutput.body).cmd
              let data = JSON.parse(messageOutput.body)
              // 存下数据 判断是报警数据还是设备控制数据还是同步数据
              switch (cmd) {
                // 设备控制
                case 'deviceStatus':
                case 'deviceFunctionResp':
                  commit('SET_WEBSOCKETDATA', { cmd: 'deviceControl', data })
                  break
              }
            }, { id: 'lll' })
          }
        })
      }
      socketInfo().then(() => {
        websocketConnect()
        setInterval(() => {
          // 当websocket断开或者未连接上
          if (!stompClient.connected) {
            // websocke重连
            console.clear()
            console.log('websocket正在重连')
            websocketConnect()
          }
        }, 10000)
      })
      .catch(() => {
        console.log('websocket连接失败, 重新连接')
        socketInfo()
      })
    }
  }
}

export default app
