<template>
  <div class="home">
    <div class="area">
      <swiper
        :indicator-dots="indicatorDots" 
        :autoplay="autoplay" 
        :interval="interval" 
        :duration="duration" 
        :circular="circular" 
        @change="_swiperChange">
        <div v-for="(item, index) in gatewayData[1].zoneList" :key="index">
          <swiper-item>
            <image :src="item.zonePhoto || 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'" class="slide-image"/>
          </swiper-item>
        </div>
      </swiper>
    </div>
    <ul class="device-list">
      <li class="item" v-for="(item, index) in gatewayData[1].zoneList[zoneIndex].deviceList" :key="index">
        <i class="icon"></i>
        <span class="name">{{item.eleName}}</span>
        <span>{{item.parameterList ? item.parameterList[0].value : ''}}</span>
      </li>
      <p v-if="gatewayData[1].zoneList[zoneIndex].deviceList.length === 0" style="font-size: 20px; font-weight: bold; text-align: center; height: 60px; line-height: 60px">当前区域下暂无设备</p>
    </ul>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'gatewayData'
    ])
  },
  data () {
    return {
      indicatorDots: true,
      autoplay: false,
      interval: 5000,
      duration: 900,
      circular: true,
      zoneIndex: 0
    }
  },
  mounted () {
  },
  methods: {
    // 初始化数据,得到选择的网关信息
    _initData () {
    },
    _swiperChange (e) {
      this.zoneIndex = e.mp.detail.current
    },
    ...mapMutations({
      SETSELECTGATEWAYINFO: 'SET_SELECTGATEWAYINFO'
    })
  }
}
</script>

<style lang="scss">
@import '@/common/scss/index.scss';

.home{
  // @include center($type: true);
  // flex-direction: column;
  position: relative;
  .area{
    width: 100%;
    image{
      width: 100%;
    }
  }
  .device-list{
    .item{
      @include center($type: true);
      margin-top: 10px;
      padding: 0 20px;
      height: 40px;
      background: $backgorund;
    }
    .name{
      flex: 1;
    }
  }
}
</style>
