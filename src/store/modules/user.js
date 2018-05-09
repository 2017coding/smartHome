import {
  setToken,
  getToken,
  setUserInfo,
  getUserInfo
} from '@/utils/storage'

const user = {
  state: {
    token: getToken(),
    userInfo: getUserInfo()
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },

  actions: {
    // 登录设置用户信息
    setUserInfo ({
      commit
    }, data) {
      return new Promise((resolve, reject) => {
        // 如果是admin账号 则将它的公司ID设为-1
        data.content.userInfo.companyId = ((data.content.userInfo.companyId + '') === '0') ? '-1' : data.content.userInfo.companyId
        setToken(data.token)
        setUserInfo(data.content.userInfo)

        commit('SET_TOKEN', data.token)
        commit('SET_USERINFO', data.content.userInfo)
        resolve()
      })
    }
  }
}

export default user
