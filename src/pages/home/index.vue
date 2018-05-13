<template>
  <div class="home">
    <!-- <i class="icon iconfont gateway-more" @click="_showDialog">&#xe73b;</i> -->
    <picker class="weui-btn" @change="_pickerChange" :value="indexPicker" :range="gatewayNameList">
      <i class="icon iconfont gateway-more">&#xe73b;</i>
    </picker>
    <div class="area">
      <div class="area-title">
        {{selectGatewayInfo.zoneList[zoneIndex] ? selectGatewayInfo.zoneList[zoneIndex].zoneName : ''}}
      </div>
      <swiper
        v-if="selectGatewayInfo.zoneList[zoneIndex]"
        :indicator-dots="indicatorDots" 
        :autoplay="autoplay" 
        :interval="interval" 
        :duration="duration" 
        :circular="circular" 
        @change="_swiperChange">
        <div v-for="(item, index) in selectGatewayInfo.zoneList" :key="index">
          <swiper-item>
            <image :src="item.zonePhoto || 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'" class="slide-image"/>
          </swiper-item>
        </div>
      </swiper>
    </div>
    <ul class="device-list" v-if="selectGatewayInfo.zoneList[zoneIndex]">
      <li class="device-item" v-for="(item, index) in selectGatewayInfo.zoneList[zoneIndex].deviceList" :key="index">
        <i class="icon"></i>
        <span class="name">{{item.eleName}}</span>
        <div class="control">
          <span class="control-item control-item-left" @click="_controlDevice('open', item)"  v-if="item.parameterList">开</span>
          <span class="control-item" @click="_controlDevice('close', item)"  v-if="item.parameterList">关</span>
        </div>
      </li>
      <p v-if="selectGatewayInfo.zoneList[zoneIndex].deviceList.length === 0" style="font-size: 20px; font-weight: bold; text-align: center; height: 60px; line-height: 60px">当前区域下暂无设备</p>
    </ul>
    <p
      v-if="!selectGatewayInfo.zoneList[zoneIndex]"
      style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 18px; font-weight: bold; ">
      当前暂无区域
    </p>
    <!-- 加载动画 -->
    <!-- <div class="loading-animation">
      <div class="global-mask"></div>
      <div class="global-loading">
        <div></div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { deviceControlApi } from '@/api/device'
import { getGatewayListApi } from '@/api/gatewayInfo'
import { mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'userInfo',
      'gatewayData',
      'selectGatewayInfo'
    ])
  },
  data () {
    return {
      indicatorDots: true,
      autoplay: false,
      interval: 5000,
      duration: 900,
      circular: true,
      zoneIndex: 0,
      gatewayDialog: false,
      gatewayDataList: [], // 网关列表
      gatewayNameList: [], // 网关名字列表
      indexPicker: 0
    }
  },
  created () {
    this.$watch('userInfo', () => {
      this._getGatewayData(this.userInfo.id)
    })
  },
  // 下拉刷新
  onPullDownRefresh () {
    this._getGatewayData(this.userInfo.id)
  },
  methods: {
    _pickerChange (e) {
      this.indexPicker = e.mp.detail.value
      // 存下当前切换的网关
      this.SETSELECTGATEWAYINFO(this.gatewayDataList[e.mp.detail.value])
    },
    // 初始化数据, 重新获取主机列表
    _getGatewayData (userId) {
      wx.showNavigationBarLoading() // 在标题栏中显示加载
      return new Promise((resolve, reject) => {
        // 得到需要的配电数据
        getGatewayListApi({userId}).then(response => {
          if (response.success) {
            // 将数据存入vuex
            this.setGatewayData(response.content).then(newData => {
              newData.find((item, index) => {
                let status = item.status === '0' ? '(离线)' : '(在线)'
                this.gatewayNameList.push(item.gatewayName + status)
              })
              this.gatewayDataList = JSON.parse(JSON.stringify(newData))
              resolve()
            })
          } else {
            wx.showToast({
              title: '获取初始化数据失败',
              icon: 'none',
              duration: 3000,
              mask: true
            })
            reject()
          }
          setTimeout(() => {
            wx.hideNavigationBarLoading() // 完成停止加载
          }, 150)
          wx.stopPullDownRefresh() // 停止下拉刷新
        })
        .catch(error => {
          wx.showToast({
            title: error,
            icon: 'none',
            duration: 3000,
            mask: true
          })
          reject()
          setTimeout(() => {
            wx.hideNavigationBarLoading() // 完成停止加载
          }, 150)
          wx.stopPullDownRefresh() // 停止下拉刷新
        })
      })
    },
    // 轮播滑动
    _swiperChange (e) {
      this.zoneIndex = e.mp.detail.current
    },
    // 显示弹窗
    _showDialog () {
      this.gatewayDialog = !this.gatewayDialog
    },
    /**
     * 控制设备
     * @param type 开还是关
     * @param deviceInfo 设备的信息
     */
    _controlDevice (type, deviceInfo) {
      let parameter, controlParamter, message
      controlParamter = JSON.parse(JSON.stringify(deviceInfo.parameterList))
      // 根据开关类型和设备类型来判断当前发出的参数
      if (type === 'open') {
        // 当设备为空调，窗帘的时候
        controlParamter[0].value = 1
      } else if (type === 'close') {
        // 当设备为空调，窗帘的时候
        controlParamter[0].value = 0
      }
      parameter = {
        cmdID: '1498325228333',
        parameterList: controlParamter,
        eleType: deviceInfo.deviceInfo,
        userId: this.userInfo.id,
        eleID: deviceInfo.eleID,
        fromID: 'server',
        fromType: 'server',
        toID: this.selectGatewayInfo.gatewayCode,
        toType: 'device',
        cmd: 'deviceFunction'
      }
      deviceControlApi(parameter).then(response => {
        if (response.success) {
          message = '发送指令成功'
        } else {
          message = response.message
        }
        wx.showToast({
          title: message,
          icon: 'none',
          duration: 2000
        })
      })
      .catch(error => {
        wx.showToast({
          title: error,
          icon: 'none',
          duration: 2000
        })
      })
    },
    ...mapActions([
      'setGatewayData'
    ]),
    ...mapMutations({
      SETSELECTGATEWAYINFO: 'SET_SELECTGATEWAYINFO'
    })
  }
}
</script>

<style lang="scss">
@import '@/common/scss/index.scss';
@import '@/common/scss/loading.scss';

.home{
  // @include center($type: true);
  // flex-direction: column;
  position: relative;
  .gateway-more{
    padding: 0 20px 0 0;
    position: fixed;
    left: 0;
    top: 0;
    line-height: 40px;
    font-size: 36px;
    font-weight: bold;
    z-index: 10;
    cursor: pointer;
  }
  .area{
    width: 100%;
    .area-title{
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      line-height: 40px;
      font-size: 16px;
      font-weight: bold; 
      text-align: center;
      background: white;
      z-index: 9;
      @include textHide();
    }
    ._swiper{
      margin-top: 40px;
      image{
        width: 100%;
      }
    }
  }
  .device-list{
    padding-bottom: 10px;
    .device-item{
      position: relative;
      display: inline-flex;
      flex-direction: column;
      margin-top: calc(7vw / 4);
      margin-left: calc(7vw / 4);
      width: 31vw;
      height: 31vw;
      background: $backgorund;
      border-radius: 5%;
      .name{
        @include center($type: true);
        flex: 1;
        @include textHide();
      }
      .control, .control-item{
        position: relative;
        height: 40px;
        line-height: 40px;
      }
      .control-item{
        display: inline-block;
        text-align: center;
        width: 50%;
      }
      .control::after{
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: rgb(150, 150, 150);
        transform: scaleY(.5);
      }
      .control-item-left::after{
        position: absolute;
        content: "";
        top: 0;
        right: 0;
        bottom: 0;
        width: 1px;
        background: rgb(150, 150, 150);
        transform: scaleX(.5);
      }
    }
  }
}
</style>
