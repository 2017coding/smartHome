<template>
  <div class="analyze">
    <div class="title">
      <div class="left"><i class="icon iconfont">&#xe767;</i>各站需量分析</div>
      <div class="right">
        <button class="bt yesterday">昨日</button>
        <button class="bt lastweek">上周</button>
        <button class="bt lastmonth">上月</button>
      </div>
    </div>
    <div class="content">
      <div class="legend">
        <div class="legend-item"><i class="legend-load"></i>最大负载率%</div>
        <div class="legend-item"><i class="legend-max"></i>最大容量/装机容量</div>
      </div>
      <div class="item" v-for="(item, index) in list" :key="index">
        <div class="title">{{item.name}}</div>
        <div class="proportion">
          <div class="child load" :style="'width:' + item.load"></div><span class="child font">1024kw</span>
        </div>
        <div class="proportion">
          <div class="child demand" :style="'width:' + item.load"></div><span class="child font">1024kw</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        list: [
          {name: '侯寨配电站', load: '40%', demand: '66%'},
          {name: '侯寨配电站', load: '50%', demand: '62%'},
          {name: '侯寨配电站', load: '30%', demand: '75%'},
          {name: '侯寨配电站', load: '60%', demand: '16%'}
        ]
      }
    }
  }
</script>

<style lang="scss">
  @import '@/common/scss/index.scss';

  .analyze{
    // flex: 3;
    position: relative;
    width: 100%;
    height: 150px;
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
    .content{
      position: relative;
      height: calc(100% - 30px);
      background: $backgorund;
      overflow-y: auto;
      .legend{
        position: absolute;
        height: $rowHeight;
        right: 0px;
        .legend-item{
          display: inline-flex;
          align-items: center;
          height: 100%;
          padding-left: 5px;
          @include smallFont(.8);
          .legend-load, .legend-max{
            display: inline-block;
            margin-right: 5px;
            width: 18px;
            height: 10px;
            border-radius: 3px;
          }
          .legend-load{
            background: #76bbff;
          }
          .legend-max{
            background: #f89a98;
          }
        }
      }
      .item{
        padding: 0 10px;
        .title{
          height: $rowHeight;
          line-height: $rowHeight;
        }
        .proportion{
          margin-bottom: 5px;
          height: 10px;
          line-height: 10px;
          background: #586a73;
          border-radius: 10px;
          overflow: hidden;
          .child{
            height: 100%;
            display: inline-block;
          }
          .font{
            padding: 0 3px;
            @include smallFont(.8);
          }
          .load{
            // background: linear-gradient(to right, #21cdc8, #0887ba);
            background: #76bbff;
          }
          .demand{
            // background: linear-gradient(to right, #e2508b, #ed6a77);
            background: #f89a98;
          }
        }
      }
    }
  }
</style>