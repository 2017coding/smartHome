<template>
  <div class="home">
    <div class="area" v-if="gatewayData && gatewayData[0]">
      <swiper
        :indicator-dots="indicatorDots" 
        :autoplay="autoplay" 
        :interval="interval" 
        :duration="duration" 
        :circular="circular" 
        @change="_swiperChange">
        <div v-for="(item, index) in gatewayData[1].zoneList" :key="index">
          <swiper-item>
            <image :src="item.zonePhoto" class="slide-image"/>
          </swiper-item>
        </div>
      </swiper>
    </div>
    <div class="device">
    </div>
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
      autoplay: true,
      interval: 5000,
      duration: 900,
      circular: true,
      imgUrls: [
        'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
      ]
    }
  },
  created () {
    // this._initData().then(() => {
      // this.selectGatewayInfo
    // })
    console.log(this.gatewayData)
  },
  methods: {
    // 初始化数据,得到选择的网关信息
    _initData () {
    },
    _swiperChange (e) {
      console.log('第' + e.mp.detail.current + '张轮播图发生了滑动')
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
  @include center($type: true);
  flex-direction: column;
  position: relative;
  .area{
    width: 100%;
    image{
      width: 100%;
    }
  }
}
</style>
