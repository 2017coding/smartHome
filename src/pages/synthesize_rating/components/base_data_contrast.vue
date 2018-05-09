<template>
  <div class="base-data-contrast">
    <div class="title">
      <div class="left"><i class="icon iconfont">&#xe6e9;</i>基础数据对比</div>
      <div class="right">
        <button class="bt yesterday">昨日</button>
        <button class="bt lastweek">上周</button>
        <button class="bt lastmonth">上月</button>
      </div>
    </div>
    <div class="rating-charts" v-for="(item, index) in list" :key="index">
      <ec-canvas class="canvas" id="rating-charts" canvas-id="rating-charts" :ec="item.ec"></ec-canvas>
    </div>
  </div>
</template>

<script>
  const options = {
    legend: {
      orient: 'vertical', // 'horizontal', // 'vertical'
      y: 'bottom',
      right: 0,
      data: ['侯寨', '轩辕丘'],
      textStyle: {
        color: '#ccc'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    radar: {
      // shape: 'circle',
      indicator: [
        {
          name: '用电量',
          max: 500
        },
        {
          name: '功率因素',
          max: 500
        },
        {
          name: '最高线温',
          max: 500
        },
        {
          name: '负载率',
          max: 500
        },
        {
          name: '故障数',
          max: 500
        },
        {
          name: '最大需量',
          max: 500
        }
      ],
      name: {
        textStyle: {
          color: '#a3a3ac' // 工艺等文字颜色
        }
      },
      axisLine: {            // 坐标轴线
        show: true,        // 默认显示，属性show控制显示与否
        lineStyle: {
          color: '#43444e'
        }
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ['none']  // 图表背景网格的颜色
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: '#43444e' // 图表背景网格线的颜色
        }
      }
    },
    series: [{
      name: '数据对比',
      type: 'radar',
      symbol: 'none', // 去掉图表中各个图区域的边框线拐点
      itemStyle: {
        normal: {
          color: 'none', // 图表中各个图区域的边框线拐点颜色
          // lineStyle: {
          //   color: 'none' // 图表中各个图区域的边框线颜色
          // },
          areaStyle: {
            type: 'default'
          }
        }
      },
      data: [
        {
          value: [430, 340, 500, 300, 490, 400],
          name: '侯寨',
          itemStyle: {normal: {color: '#be3a8a'}},
          areaStyle: {
            type: 'default',
            opacity: 0.79, // 图表中各个图区域的透明度
            color: '#be3a8a' // 图表中各个图区域的颜色
          }
        },
        {
          value: [300, 430, 150, 300, 420, 250],
          name: '轩辕丘',
          itemStyle: {normal: {color: '#316697'}},
          areaStyle: {
            type: 'default',
            opacity: 0.79, // 图表中各个图区域的透明度
            color: '#316697' // 图表中各个图区域的颜色
          }
        }
      ]
    }]
  }
  export default {
    data () {
      return {
        indicatorDots: false, // 是否显示面板指示点
        autoplay: true, // 是否自动切换
        interval: 5000, // 自动切换时间间隔
        duration: 900, // 滑动动画时长
        circular: true, // 是否采用衔接滑动
        // 一定要在数组里才能读到ec数据 !!!!!!
        list: [
          {ec: {options: options}}
        ]
      }
    }
  }
</script>

<style lang="scss">
  @import '@/common/scss/index.scss';

  .base-data-contrast{
      flex: 5;
      position: relative;
      width: 100%;
      // height: calc(60% - 45px);
      .title{
        @include center($type: true);
        justify-content: space-between;
        padding: 0 10px;
        height: $rowHeight;
        .left{
          @include center($type: true);
        }
        .right{
          .bt{
            display: inline-block;
            font-size: 12px;
            overflow: visible;
            @include newBt(#f1a429);
          }
        }
      }
      .rating-charts{
        width: 100%;
        height: calc(100% - 30px);
        background: $backgorund;
        ec-canvas{
          width: 100%;
          height: 100%;
        }
      }
    }
</style>