<template>
  <div class="statistics">
    <div class="item economics">
      <div class="title">经济运行站点</div>
      <div class="num-info">
        <span class="num">5</span>
        <span class="unit">个</span>
      </div>
      <div class="more">点击查看详情</div>
    </div>
    <div class="item health">
      <div class="title">健康运行站点</div>
      <div class="num-info">
        <span class="num">5</span>
        <span class="unit">个</span>
      </div>
      <div class="more">点击查看详情</div>
    </div>
  </div>
</template>

<script>
  export default {
  }
</script>

<style lang="scss">
  @import '@/common/scss/index.scss';

  .statistics{
    // flex: 2;
    @include center($type: false);
    width: 100%;
    height: 98px;
    background: $backgorund;
    .item{
      flex: 1;
      @include center($type: true);
      flex-direction: column;
      padding: 0 10px;
      position: relative;
      height: 100%;
      .title{
        flex: 1;
        position: relative;
        margin: 0 10px;
        width: 100%;
      }
      .title::after{
        @include border-1px(rgb(150, 150, 150));
      }
      .num-info{
        flex: 3;
        @include center($type: true);
        .num{
          padding: 5px;
          font-size: 28px;
          font-weight: bold;
          background: linear-gradient(to bottom, #ffe83d, #ffb214);
          -webkit-background-clip: text;         /* 规定背景的划分区域 */
          -webkit-text-fill-color: transparent;  /* 防止字体颜色覆盖 */
        }
      }
      .more{
        flex: 1;
        color: #cb4474;
      }
    }
    .economics::after{
      position: absolute;
      content: "";
      top: 5px;
      bottom: 5px;
      right: 0;
      width: 1px;
      background: rgb(150, 150, 150);
      transform: scaleX(.5);
    }
  }
</style>