<template>
  <div class="home-banner">
    <swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular">
      <div v-for="(item, index) in imgUrls" :key="index">
        <swiper-item>
          <image :src="item" class="slide-image"/>
        </swiper-item>
      </div>
    </swiper>
    <ul class="data-panel">
      <li class="item">
        <div class="" style="color: #31b9b2">200KVA</div>
        <div class=""><i class="dot" style="background: #31b9b2"></i>总装机容量</div>
      </li>
      <li class="item">
        <div class="" style="color: #fd7264">200kW·h</div>
        <div class=""><i class="dot" style="background:	#fd7264"></i>本月已用电量</div>
      </li>
      <li class="item">
        <div class="" style="color: #b3cf1c">200天</div>
        <div class=""><i class="dot" style="background: #b3cf1c"></i>本月安全天数</div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        indicatorDots: false, // 是否显示面板指示点
        autoplay: false, // 是否自动切换
        interval: 5000, // 自动切换时间间隔
        duration: 900, // 滑动动画时长
        circular: false, // 是否采用衔接滑动
        imgUrls: [
          // '/static/images/page_images/banner.jpg'
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
        ]
      }
    }
  }
</script>

<style lang="scss">
  @import '@/common/scss/index.scss';

  .home-banner{
    position: relative;
    width: 100%;
    .slide-image{
      width: 100%;
    }
    .data-panel{
      @include center($type: false);
      position: absolute;
      bottom: -25px;
      left: 20px;
      right: 20px;
      height: 50px;
      background: $backgorund;
      border-radius: 10px;
      .item{
        @include center($type: true);
        flex-direction: column;
        width: calc(100% / 3);
        .dot{
          display: inline-block;
          margin: 0 5px 0 0;
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
      }
    }
  }
</style>