<template>
  <div class="power-quality-contrast">
    <div class="title"><i class="icon iconfont">&#xe77c;</i>电能质量对比</div>
    <div class="content">
      <div class="item" v-for="(item, index) in list" :key="index">
        <div class="item-header">
          <span class="one-value">{{getPercentage(item.oneValue, item.sum)}}%</span>
          <span class="type">{{item.type}}</span>
          <span class="two-value">{{getPercentage(item.twoValue, item.sum)}}%</span>
        </div>
        <div class="item-content">
          <span class="one-value" :style="'width:' + getPercentage(item.oneValue, item.sum) + '%;background: linear-gradient(to right, #21cdc8, #0887ba);'"></span>
          <span class="two-value" :style="'width:' + getPercentage(item.twoValue, item.sum) + '%;background: linear-gradient(to right, #e2508b, #ed6a77);'"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
    },
    data () {
      return {
        list: [
          {type: '最大电量不平衡度', oneValue: 152, twoValue: 243, sum: 300},
          {type: '最大电压不平衡度', oneValue: 50, twoValue: 80, sum: 100},
          {type: '最大电流畸变率', oneValue: 30, twoValue: 60, sum: 100},
          {type: '最大电压畸变率', oneValue: 507, twoValue: 482, sum: 1000}
        ]
      }
    },
    created () {
    },
    methods: {
      // 得到百分比
      getPercentage (value, sum) {
        let result = (value / sum).toFixed(2) * 100
        return result
      }
    }
  }
</script>

<style lang="scss">
  @import '@/common/scss/index.scss';

  .power-quality-contrast{
    flex: 3;
    position: relative;
    width: 100%;
    // height: calc(40% - 40px);
    font-size: $fontSize;
    .title{
      display: flex;
      align-items: center;
      padding: 0 10px;
      height: $rowHeight;
    }
    .content{
      @include center($type: true);
      flex-direction: column;
      padding: 0 10px;
      height: calc(100% - 30px);
      background: $backgorund;
      .item{
        width: 100%;
        padding: 0 0 2px 0;
        .item-header{
          @include center($type: true);
          justify-content: space-between;
          height: 20px;
        }
        .item-content{
          @include center($type: true);
          justify-content: space-between;
          padding: 5px 0;
          height: 5px;
          .one-value{
            display: inline-block;
            width: 40%;
            height: 100%;
            background: red;
          }
          .two-value{
            display: inline-block;
            width: 56%;
            height: 100%;
            background: red;
          }
        }
      }
    }
  }
</style>