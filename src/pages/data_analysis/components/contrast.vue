<template>
  <div class="contrast">
    <div class="title">
      <div class="left">
        <i class="icon iconfont">&#xe713;</i>各站数据对比</div>
      <div class="right">
        <button class="bt yesterday">昨日</button>
        <button class="bt lastweek">上周</button>
        <button class="bt lastmonth">上月</button>
      </div>
    </div>
    <div class="content">
      <div class="arrows">
        <!-- v-if="current !== 0" -->
        <i class="icon iconfont return" @click="_handleArrows('return')">&#xe74f;</i>
        <!-- <i class="" v-else></i> -->
        <i class="icon iconfont enter" @click="_handleArrows('enter')">&#xe70c;</i>
      </div>
      <swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular" @change="_swiperChange" @bindchange="_swiperChange">
        <div class="item" v-for="(item, index) in list" :key="index">
          <swiper-item>
            <div class="item-title">{{item.title}}</div>
            <div class="item-content">
              <ec-canvas class="canvas" id="contrast-charts" canvas-id="contrast-charts" :ec="item.ec"></ec-canvas>
            </div>
          </swiper-item>
        </div>
      </swiper>
    </div>
  </div>
</template>

<script>
var dataAxis = ['电量', '节电量', '功率因素', '安全运行时间', '电流三相不平衡', '电压三相不平衡']
var data = [220, 182, 191, 234, 290, 330]
var yMax = 500
var dataShadow = []

for (var i = 0; i < data.length; i++) {
  dataShadow.push(yMax)
}
const options = {
  grid: {
    left: '2%',
    right: '4%',
    bottom: '5%',
    containLabel: true
    // y: 'center'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
      type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  xAxis: {
    data: dataAxis,
    axisLabel: {
      show: true,
      textStyle: {
        color: '#9ea3ab'
      }
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#474851'
      }
    },
    z: 10
  },
  yAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#474851'
      }
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      textStyle: {
        color: '#9ea3ab'
      }
    }
  },
  dataZoom: [
    {
      type: 'inside'
    }
  ],
  series: [
    { // For shadow
      type: 'bar',
      itemStyle: {
        normal: { color: 'rgba(0,0,0,0.05)' }
      },
      barGap: '-100%',
      barCategoryGap: '40%',
      data: dataShadow,
      animation: false
    },
    {
      type: 'bar',
      itemStyle: {
        normal: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#21cec4'
              },
              {
                offset: 0.5,
                color: '#11a3bd'
              },
              {
                offset: 1,
                color: '#0480b8'
              }
            ],
            globalCoord: false
          }
        },
        emphasis: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#21cec4'
              },
              {
                offset: 0.5,
                color: '#11a3bd'
              },
              {
                offset: 1,
                color: '#0480b8'
              }
            ],
            globalCoord: false
          }
        }
      },
      data: data
    }
  ]
}
export default {
  data () {
    return {
      current: 0, // 当前所在的滑块位置
      indicatorDots: false, // 是否显示面板指示点
      autoplay: false, // 是否自动切换
      interval: 5000, // 自动切换时间间隔
      duration: 900, // 滑动动画时长
      circular: true, // 是否采用衔接滑动
      // 一定要在数组里才能读到ec数据 !!!!!!
      list: [
        {title: '电量分析', ec: {options: options}},
        {title: '电能分析', ec: {options: options}},
        {title: '负载分析', ec: {options: options}}
      ]
    }
  },
  methods: {
    _swiperChange (e) {
      e.mp.detail.current = this.current
    },
    _handleArrows (type) {
      if (type === 'return') {
        this.current--
      } else if (type === 'enter') {
        this.current++
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/common/scss/index.scss';

.contrast {
  flex: 1;
  position: relative;
  width: 100%;
  .title {
    @include center($type: true);
    justify-content: space-between;
    padding: 0 10px;
    height: $rowHeight;
    .left {
      @include center($type: true);
    }
    .right {
      .bt {
        display: inline-block;
        font-size: 12px;
        overflow: visible;
        @include newBt(#f1a429);
      }
    }
  }
  .content {
    position: relative;
    height: calc(100% - 30px);
    background: $backgorund;
    .arrows{
      @include center($type: true);
      justify-content: space-between;
      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      transform: translate(0, -50%);
      z-index: 999;
    }
    ._swiper, ._swiper-item{
      height: 100%
    }
    .item {
      .item-title {
        @include center($type: true);
        position: relative;
        height: $rowHeight;
      }
      .item-title::after {
        @include border-1px(rgb(150, 150, 150));
      }
      .item-content{
        width: 100%;
        height: calc(100% - 30px);
      }
    }
  }
}
</style>