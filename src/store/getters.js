const getters = {
  userInfo: state => state.user.userInfo,
  gatewayData: state => state.app.gatewayData,
  selectGatewayInfo: state => state.app.selectGatewayInfo,
  deviceWebsocket: state => state.app.deviceWebsocket,
  sceneSelectDeviceList: state => state.app.sceneSelectDeviceList
}

export default getters
