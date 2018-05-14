import {
  // getToken,
  // setGatewayDataStorage,
  getGatewayDataStorage
} from '@/utils/storage'
import { getDeviceInfo } from '@/utils/config'
// import { socketApi } from '@/api/device'

const app = {
  state: {
    gatewayData: getGatewayDataStorage(), // 网关列表
    selectGatewayInfo: undefined,  // 当前选中的网关数据
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
    // 存下所有的网关数据
    setGatewayData ({
      commit
    }, data) {
      return new Promise((resolve, reject) => {
        // 对数据做处理，将设备数据分离出来
        let newData = JSON.parse(JSON.stringify(data.gatewayList))
        newData.find((item, index) => {
          item.zoneList.find((zoneItem, zoneIndex) => {
            let arr = []
            zoneItem.deviceList.find((deviceItem, deviceIndex) => {
              let nameList = deviceItem.eleName.split(',')
              for (let i = 0, len = nameList.length; i < len; i++) {
                let obj = {}
                obj.eleName = nameList[i]
                obj.eleID = deviceItem.eleID
                obj.eleType = deviceItem.eleType
                obj.eleIcon = getDeviceInfo(deviceItem.eleType).icon
                if (deviceItem.parameterList) {
                  obj.parameterList = []
                  obj.parameterList[0] = deviceItem.parameterList[i]
                }
                arr.push(obj)
              }
            })
            zoneItem.deviceList = arr
          })
          item.checked = false
        })
        newData[0] ? newData[0].checked = true : ''
        // setGatewayDataStorage(newData)
        commit('SET_GATEWAYDAT', newData)

        // 初始化选中第一个网关
        if (!this.state.app.selectGatewayInfo) {
          commit('SET_SELECTGATEWAYINFO', newData[0] ? newData[0] : '')
        }
        resolve(newData)
      })
    },
    // 退出登录
    loginOut ({
      commit
    }, data) {
      return new Promise((resolve, reject) => {
        // 清除token
        wx.removeStorageSync('token')
        resolve()
      })
    }
  }
}

export default app
