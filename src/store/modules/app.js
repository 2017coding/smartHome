import {
  setGatewayDataStorage,
  getGatewayDataStorage
} from '@/utils/storage'

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
        commit('SET_GATEWAYDAT', data)
        resolve()
      })
    }
  }
}

export default app
