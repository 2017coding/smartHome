import {
  Message, MessageBox
} from 'element-ui';
// 登录api
import {
  loginByEmail,
  logout,
  getInfo,
  getMenus,
  getStationApi
} from '@/api/login';
// cookie数据
import {
  // 部门ID
  setGroupId,
  getGroupId,
  removeGroupId,
  // 用户ID
  setUserId,
  getUserId,
  removeUserId,
  // 用户详细信息
  setUserInfo,
  getUserInfo,
  removeUserInfo,
  // token
  getToken,
  setToken,
  removeToken,
  // 用户列表
  getUserList,
  setUserList,
  removeUserList,
  // 用户详细信息列表
  setUserListInfo,
  getUserListInfo,
  removeUserListInfo,
  // 公司信息列表
  setCompanyList,
  getCompanyList,
  removeCompanyList,
  // 点击的配电房信息
  getSiteClickElecRoomData,
  setSiteClickElecRoomData,
  removeSiteClickElecRoomData,
} from '@/utils/auth';
import { fetchTree } from 'api/admin/group/index';
// 请求到当前用户下的所有用户
import {page} from '@/api/admin/user/index';
// 将字符串转换成数组
import { allUserList } from '@/utils/config';
// websocket的信息
import {deviceTreeApi, gatewayListApi, socketApi, deviceControlApi} from 'api/electricity_control/device_control';
import {getWebsocketApi} from 'api/common/common';
// 当前报警参数的设置
import { getAlarmSetApi } from 'api/system_set/warn_setting';

import {ERR_OK} from '@/api/config';
import {requestCode} from '@/utils/config';
import { mqttUrl } from '@/utils/urlPath';

// 定义指针
const self = this;

const user = {
  state: {
    user: '',
    userInfo: getUserInfo(),
    userId: getUserId(),
    userList: getUserList(),
    userListInfo: getUserListInfo(),
    groupId: getGroupId(),
    companyList: getCompanyList(),
    status: '',
    code: '',
    token: getToken(),
    name: '',
    username: '',
    avatar: '',
    introduction: '',
    roles: [],
    menus: undefined,
    elements: undefined,
    permissionMenus: undefined,
    setting: {
      articlePlatform: []
    },
    siteClickElecRoomData: getSiteClickElecRoomData(),
    websocketStompClient: undefined,
    websocketData: {
      reportAlert: '',
      elecSwitchWarn: '',
      elecTemperatureWarn: '',
      deviceControl: '',
      smartSync: '',
      syncMobileResp: '',
      alarmCancelResp: '',
      elecSync: '',
      syncStatusDataResp: '',
      electricityStatusData: '',
      electricityTelemetering: '',
      electricityQuantity: '',
      electricityQuality: '',
      electricityDemand: '',
      electricityMaxmin: '',
      monthQuantity: '',
      rCurrentRateResp: ''
    }
  },

  mutations: {
    SET_USERID: (state, userId) => {
      state.userId = userId
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_USERLIST: (state, userList) => {
      state.userList = userList
    },
    SET_USERLISTINFO: (state, userListInfo) => {
      state.userListInfo = userListInfo
    },
    SET_GROUPID: (state, groupId) => {
      state.groupId = groupId
    },
    SET_COMPANYLIST: (state, companyList) => {
      state.companyList = companyList
    },
    SET_CODE: (state, code) => {
      state.code = code;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction;
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting;
    },
    SET_STATUS: (state, status) => {
      state.status = status;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_USERNAME: (state, username) => {
      state.username = username;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus;
    },
    SET_ELEMENTS: (state, elements) => {
      state.elements = elements;
    },
    LOGIN_SUCCESS: () => {
      console.log('login success')
    },
    LOGOUT_USER: state => {
      state.user = '';
    },
    SET_PERMISSION_MENUS: (state, permissionMenus) => {
      state.permissionMenus = permissionMenus;
    },
    SET_SITECLICKELECROOMDATA: (state , siteClickElecRoomData) => {
      state.siteClickElecRoomData = siteClickElecRoomData;
    },
    SET_WEBSOCKETSTOMPCLIENT: (state, websocketStompClient) => {
      state.websocketStompClient = websocketStompClient;
    },
    // 所有的websocket数据
    SET_WEBSOCKETDATA: (state, websocketData) => {
      switch (websocketData.cmd) {
        // 电器报警
        case 'reportAlert':
          state.websocketData.reportAlert = websocketData.data;
          break;
        // 开关柜报警
        case 'elec-switch-warn':
          state.websocketData.elecSwitchWarn = websocketData.data;
          break;
        // 温度报警
        case 'elec-temperature-warn':
          state.websocketData.elecTemperatureWarn = websocketData.data;
          break;
        // 设备控制
        case 'deviceControl':
          state.websocketData.deviceControl = websocketData.data;
          break;
        // 智能同步
        case 'smartSync':
          state.websocketData.smartSync = websocketData.data;
          break;
        // 智能网关同步手机号码
        case 'sync-mobileResp':
          state.websocketData.syncMobileResp = websocketData.data;
        // 智能网关取消报警
        case 'alarm-cancelResp':
          state.websocketData.alarmCancelResp = websocketData.data;
        // 配电同步
        case 'elecSync':
          state.websocketData.elecSync = websocketData.data;
          break;
        // 配电状态采集同步
        case 'sync-statusDataResp':
          state.websocketData.syncStatusDataResp = websocketData.data;
          break;
        // 配电状态数据
        case 'electricity-statusData':
          state.websocketData.electricityStatusData = websocketData.data;
          break;
        // 配电设备数据(负载电量电能质量电能需量电能最值月电量)
        case 'electricity-telemetering':
          state.websocketData.electricityTelemetering = websocketData.data;
          break;
        case 'electricity-quantity':
          state.websocketData.electricityQuantity = websocketData.data;
          break;
        case 'electricity-quality':
          state.websocketData.electricityQuality = websocketData.data;
          break;
        case 'electricity-demand':
          state.websocketData.electricityDemand = websocketData.data;
          break;
        case 'electricity-maxmin':
          state.websocketData.electricityMaxmin = websocketData.data;
          break;
        case 'get-month-quantity':
          state.websocketData.monthQuantity = websocketData.data;
          break;
        // TOU数据查询
        case 'r-current-rateResp':
        state.websocketData.rCurrentRateResp = websocketData.data;
      }
    }
  },

  actions: {
    // 登录设置用户信息
    _setUserInfo({
      commit
    }, data) {
      return new Promise((resolve, reject) => {
        // 如果是admin账号 则将它的公司ID设为-1
        data.content.userInfo.companyId = ((data.content.userInfo.companyId + '') === '0') ? '-1' : data.content.userInfo.companyId;
        // 设置cookie
        setToken(data.token);
        setUserId(data.content.userInfo.id);
        setGroupId(data.content.userInfo.groupId);
        // 设置session
        setUserInfo(data.content.userInfo);
        // 修改用户的token
        commit('SET_TOKEN', data.token);
        // 修改用户的groupId
        commit('SET_GROUPID', data.content.userInfo.groupId);
        // 修改用户的ID
        commit('SET_USERID',data.content.userInfo.id);
        // 存下所有的用户数据
        commit('SET_USERINFO', data.content.userInfo);
        resolve();
      })
    },

    // 设置当前配电房信息
    setSiteClickElecRoomData({
      commit
    }, data) {
      // 设置cookie
      setSiteClickElecRoomData(data);
      // 修改siteClickElecRoomData
      commit('SET_SITECLICKELECROOMDATA', data);
    },

    // 获取用户详细信息
    GetInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        // 得到用户信息
        getInfo(state.token).then(response => {
          const data = response;
          commit('SET_ROLES', 'admin');
          commit('SET_NAME', state.userInfo.name);
          commit('SET_USERNAME', state.userInfo.username);
          // commit('SET_AVATAR', 'http://git.oschina.net/uploads/42/547642_geek_qi.png?1499487420');
          commit('SET_INTRODUCTION', state.userInfo.description);
          const menus = {};
          for (let i = 0; i < data.menus.length; i++) {
            menus[data.menus[i].code] = true;
          }
          commit('SET_MENUS', menus);
          const elements = {};
          for (let i = 0; i < data.elements.length; i++) {
            elements[data.elements[i].code] = true;
          }
          commit('SET_ELEMENTS', elements);
          resolve(response);
        }).catch(error => {
          reject(error);
        });
        // 得到用户菜单 
        getMenus(state.token).then(response => {
          commit('SET_PERMISSION_MENUS', response);
        })
      });
    },

    // 得到用户列表信息
    _getUserListInfo({
      commit,
      state
    }){
      // 定义pageSize
      let pages = 1, pageSize = 30, pageTotal = 10;
      if (!state.userInfo) {
        return;
      }
      // 当前用户ID 如果是管理员,则存为-1,否则为当前用户的id
      let userId = ((state.userInfo.groupId + '') === "-1") ? "-1" : state.userInfo.id;
      let userList;
      // 存下所有的用户ID
      if (userId === '-1') {
        userList = [userId, state.userInfo.id];
      } else {
        userList = [userId];
      }
      // 存下所有的用户信息
      let userListInfo = [state.userInfo];
      // 初始化用户数据
      function InitUserList (pages) {
        return new Promise((resolve, reject) => {
          page({page: pages, limit: pageSize, userId: state.userInfo.id}).then(response => {
            if((response.status + '') !== '200') {
              return false
            }
            // 得到总页数
            pageTotal = response.data.total / pageSize;
            // 对数据做处理
            for (let i = 0, len = response.data.rows.length; i<len; i++) {
              userList.push((response.data.rows[i].id + ""));
              userListInfo.push(response.data.rows[i]);
            }
            
            // 如果当前页数小于总页面
            if (pages < pageTotal) {
              InitUserList(pages + 1);
            } else {
              commit('SET_USERLIST', userList);
              commit('SET_USERLISTINFO', userListInfo);
              setUserList(userList);
              setUserListInfo(userListInfo);
              resolve();
            }
          })
          .catch(() => {
            reject();
          })
        })
      }
      InitUserList(pages);
    },
    // 得到公司信息
    _getCompanyList ({
      commit,
      state
    }){
      return new Promise((resolve, reject) => {
        fetchTree({groupType: 2, groupId: state.userInfo.companyId}).then(response => {
          // 当请求结果是数组
          if (Array.isArray(response)) {
            // 判断要得到的公司数据
            let data = (response[0].parentId === -1) ? response[0].children : response;
            // 将数据存储起来
            commit('SET_COMPANYLIST', data);
            setCompanyList(data);
            resolve();
          } else {
            reject();
          }
        })
        .catch(() => {
          reject();
        })
      })
    },
    // 连接websocket
    ConnectWebsocket({
      commit,
      state
    }){
       // 得到数据
      //  let URL = '121.201.85.21';
       let URL = mqttUrl, port, topicList = [], self = this, stompClient;
       // 得到端口号和订阅信息
       function socketInfo(){
        return new Promise((resolve, reject) => {
          let parameter = {
            groupId: state.userInfo.companyId,
            userId: state.userId
          };
          socketApi(parameter).then((response) => {
            if ((response.code + '') === ERR_OK) {
              // 得到端口号
              port = response.content.port;
              // 得到订阅信息
              topicList = response.content.topicList;
              // 订阅公司
              topicList.push("/topic/uooz/server/yun/callback/" + state.userInfo.companyId);
            } else {
              // 全局参数,触发弹窗
              commit('SET_WEBSOCKETTIMEOUT',{type: 'websocketConnect', timeout: true});
              console.log("websocket连接失败");
              Message({
                message: 'websocket连接失败',
                type: 'error',
                duration: 5 * 1000
              });
            }
            resolve();
          })
          .catch(() => {
            // 请求失败
            reject();
          })
        })
      };
      // 得到公司下的主机订阅端口
      function getCompanyTopicList () {
        return new Promise((resolve, reject) => {
          getWebsocketApi({companyId: state.userInfo.companyId}).then((response) => {
            // 
            if (response.success) {
              for (let i = 0, len = response.content.topicList.length; i < len; i++) {
                topicList.push(response.content.topicList[i]);
              } 
            }
            resolve();
          })
          .catch(() => {
            // 请求失败
            reject();
          })
        })
      };
      // 连接websocket
      function websocketConnect(){
        // 建立连接
        console.log('建立连接');
        var socket = new SockJS('http://'+URL+':'+port+'/websocket?'+getToken()); // 192.168
        stompClient = Stomp.over(socket);

        stompClient.connect({}, function(frame) {
            console.log('getWebsocketInfo--success--1');

            commit('SET_WEBSOCKETSTOMPCLIENT', stompClient); // 将websocket实例存下

            // 连接成功，返回数据
            for (let i = 0, len = topicList.length; i < len; i++) {
              stompClient.subscribe(topicList[i], function(messageOutput) {
                // 设置参数
                let cmd = JSON.parse(messageOutput.body).cmd;
                let errMsg = JSON.parse(messageOutput.body).errMsg;
                let data = JSON.parse(messageOutput.body);
                // 存下数据 判断是报警数据还是设备控制数据还是同步数据
                switch (cmd) {
                  // 设备报警
                  case 'reportAlert':
                    commit('SET_WEBSOCKETDATA', {cmd: 'reportAlert', data});
                    break;

                  // 开关柜报警，温度报警
                  case 'elec-switch-warn':
                    commit('SET_WEBSOCKETDATA', {cmd: 'elec-switch-warn', data});
                    break;
                  case 'elec-temperature-warn':
                    commit('SET_WEBSOCKETDATA', {cmd: 'elec-temperature-warn', data});
                    break;

                  // 设备控制
                  case 'deviceStatus':
                  case 'deviceFunctionResp':
                    commit('SET_WEBSOCKETDATA', {cmd: 'deviceControl', data});
                    break;

                  // 智能设备区域情景自动化同步
                  case 'sync-areaResp':
                  case 'sync-deviceResp':
                  case 'sync-modResp':
                  case 'sync-autoResp':
                    commit('SET_WEBSOCKETDATA', {cmd: 'smartSync', data});
                    break;

                  // 智能网关同步手机号码
                  case 'sync-mobileResp':
                    commit('SET_WEBSOCKETDATA', {cmd: 'sync-mobileResp', data});
                    break;

                  // 智能网关取消报警
                  case 'alarm-cancelResp':
                    commit('SET_WEBSOCKETDATA', {cmd: 'alarm-cancelResp', data});
                    break;

                  // 配电设备负载电量电能质量电能需量电能最值数据同步
                  case 'sync-powerResp':
                  case 'sync-quantityResp':
                  case 'sync-ele-qualityResp':
                  case 'sync-ele-demandResp':
                  case 'sync-ele-maxminResp':
                  case 'sync-month-quantityResp':
                    commit('SET_WEBSOCKETDATA', {cmd: 'elecSync', data});
                    break;

                  // 配电状态采集器同步数据
                  case 'sync-statusDataResp':
                    commit('SET_WEBSOCKETDATA', {cmd: 'sync-statusDataResp', data});
                    break;

                  // 配电设备状态数据（根据设备类型得到温度采集和开关柜数据采集）
                  case 'electricity-statusData':
                    commit('SET_WEBSOCKETDATA', {cmd: 'electricity-statusData', data});
                    break;

                  // 配电设备数据(负载电量电能质量电能需量电能最值月电量)
                  case 'electricity-telemetering':
                    commit('SET_WEBSOCKETDATA', {cmd: 'electricity-telemetering', data});
                    break;
                  case 'electricity-quantity':
                    commit('SET_WEBSOCKETDATA', {cmd: 'electricity-quantity', data});
                    break;
                  case 'electricity-quality':
                    commit('SET_WEBSOCKETDATA', {cmd: 'electricity-quality', data});
                    break;
                  case 'electricity-demand':
                    commit('SET_WEBSOCKETDATA', {cmd: 'electricity-demand', data});
                    break;
                  case 'electricity-maxmin':
                    commit('SET_WEBSOCKETDATA', {cmd: 'electricity-maxmin', data});
                    break;
                  case 'get-month-quantity':
                    commit('SET_WEBSOCKETDATA', {cmd: 'get-month-quantity', data});
                    break;               
                  // TOU数据查询 
                  case 'r-current-rateResp':
                    commit('SET_WEBSOCKETDATA', {cmd: 'r-current-rateResp', data});
                    break;
                }
              }, {id:"lll"});
            }
        });
      }
      socketInfo().then(() => {
        // console.log('getWebsocketInfo--success1');
        // websocketConnect();
        getCompanyTopicList().then(() => {
          console.log('getWebsocketInfo--success1');
          websocketConnect();
          setInterval(() => {
            // 当websocket断开或者未连接上
            if (!stompClient.connected) {
              // websocke重连
              console.clear();
              console.log('websocket正在重连');
              websocketConnect();
            }
          }, 10000)
        })
      })
      .catch(() => {
        console.log('websocket连接失败, 重新连接');
        socketInfo();
      })
    },

    // 第三方验证登录
    LoginByThirdparty({
      commit,
      state
    }, code) {
      return new Promise((resolve, reject) => {
        commit('SET_CODE', code);
        loginByThirdparty(state.status, state.email, state.code).then(response => {
          commit('SET_TOKEN', response.data.token);
          setToken(response.data.token);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 登出
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          // 初始化vuex数据
          commit('SET_TOKEN', '');
          commit('SET_ROLES', []);
          commit('SET_MENUS', undefined);
          commit('SET_ELEMENTS', undefined);
          commit('SET_PERMISSION_MENUS', undefined);
          // 清除cookie
          removeToken();
          removeUserId();
          removeGroupId();
          removeUserInfo();
          removeUserList();
          removeUserListInfo();
          removeCompanyList();
          removeSiteClickElecRoomData();
          sessionStorage.removeItem('sidebarStatus');
          // 断开websocket连接
          // stompClient.disconnect();
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        // 初始化vuex数据
        commit('SET_TOKEN', '');
        commit('SET_MENUS', undefined);
        commit('SET_ELEMENTS', undefined);
        commit('SET_PERMISSION_MENUS', undefined);
        // 清除cookie
        removeToken();
        removeUserId();
        removeGroupId();
        removeUserInfo();
        removeUserList();
        removeUserListInfo();
        removeCompanyList();
        removeSiteClickElecRoomData();
        sessionStorage.removeItem('sidebarStatus');
        // 断开websocket连接
        // stompClient.disconnect();
        resolve();
      });
    },

    // 动态修改权限
    ChangeRole({
      commit
    }, role) {
      return new Promise(resolve => {
        commit('SET_ROLES', [role]);
        commit('SET_TOKEN', role);
        setToken(role);
        resolve();
      })
    }
  }
};

export default user;
