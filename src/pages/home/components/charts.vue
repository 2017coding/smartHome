<template>
  <div class="home-charts">
    <div class="title"><img src="/static/images/page_images/safety.png" alt="safety" class="safety-image">安全运行评比</div>
    <div class="content" v-for="(item, index) in list" :key="index">
      <ec-canvas class="canvas" id="home-charts" canvas-id="home-charts" :ec="item.ec"></ec-canvas>
    </div>
  </div>
</template>

<script>
  const options = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      orient: 'vertical', // 'horizontal', // 'vertical'
      y: 'center',
      right: 0,
      data: ['告警', '预警', '安全'],
      textStyle: {
        color: '#ccc'
      }
    },
    grid: {
      left: '2%',
      right: '20%',
      bottom: '20%',
      containLabel: false
      // y: 'center'
    },
    xAxis: [
      {
        // type: 'category',
        data: ['05.01', '05.02', '05.03', '05.04', '05.05', '05.06', '05.07'],
        axisLine: {
          show: false,
          lineStyle: {
            color: '#ccc'
          }
        },
        axisTick: {
          show: false,
          alignWithLabel: true,
          boundaryGap: true,
          lineStyle: {
            width: 20,
            color: '#e60012',
            type: 'solid'
          }
        },
        axisLabel: {
          lineStyle: {
            color: 'white'
          }
        }
      }
    ],
    yAxis: [
      {
        show: false,
        type: 'value',
        axisLine: {
          lineStyle: {
            show: false,
            color: '#ccc'
          }
        }
      }
    ],
    series: [
      {
        name: '告警',
        type: 'bar',
        barWidth: 10,
        stack: '安全评比',
        data: [100, 100, 100, 100, 100, 100, 100],
        itemStyle: {
          normal: {
            color: '#cd4079'
          }
        }
      },
      {
        name: '预警',
        type: 'bar',
        barWidth: 10,
        stack: '安全评比',
        data: [100, 100, 100, 100, 100, 100, 100],
        itemStyle: {
          normal: {
            color: '#d9a12a'
          }
        }
      },
      {
        name: '安全',
        type: 'bar',
        barWidth: 10,
        stack: '安全评比',
        data: [100, 100, 100, 100, 100, 100, 100],
        itemStyle: {
          normal: {
            color: '#6ca638'
          }
        }
      },
      {
        name: '安全',
        type: 'bar',
        barGap: '-150%',
        barWidth: 20,
        data: [340, 340, 340, 340, 340, 340, 340],
        z: -10,
        itemStyle: {
          normal: {
            color: '#3f4250', // 颜色调为何背景色一样，看起来就是一个空的
            barBorderRadius: 5
          }
        }
      }
    ]
  }
  export default {
    data () {
      return {
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

  .home-charts{
    flex: 1;
    width: 100%;
    min-height: 180px;
    // height: calc(100% - 350px);
    background: $backgorund;
    .safety-image{
      width: 18px;
      height: 20px;
      margin-right: 5px;
    }
    .title{
      display: flex;
      align-items: center;
      position: relative;
      margin: 0 10px;
      height: $rowHeight;
    }
    .title::after{
      @include border-1px(rgb(150, 150, 150));
    }
    .content{
      width: 100%;
      height: calc(100% - 30px);
      ec-canvas{
        width: 100%;
        height: 100%;
      }
    }
  }
</style>