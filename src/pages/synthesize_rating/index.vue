<template>
  <div class="synthesize-rating">
    <div class="header">
      <div class="title"><i class="icon iconfont">&#xe712;</i>站点选择</div>
      <div class="content">
        <div class="select select-one">选择配电站点</div>
        <div class="select select-two">选择配电站点</div>
      </div>
    </div>
    <BaseDataContrast></BaseDataContrast>
    <PowerQualityContrast></PowerQualityContrast>
  </div>
</template>

<script>
  import BaseDataContrast from './components/base_data_contrast'
  import PowerQualityContrast from './components/power_quality_contrast'
  
  export default {
    components: {
      BaseDataContrast,
      PowerQualityContrast
    },
    data () {
      return {
      }
    }
  }
</script>

<style lang="scss">
  @import '@/common/scss/index.scss';

  .synthesize-rating{
    @include center($type: true);
    flex-direction: column;
    position: relative;
    height: 100%;
    .header{
      position: relative;
      width: 100%;
      height: 70px;
      .title{
        display: flex;
        align-items: center;
        padding: 0 10px;
        height: $rowHeight;
      }
      .content{
        @include center($type: true);
        height: 40px;
        background: $backgorund;
        .select{
          flex: 1;
          @include center($type: true);
          position: relative;
          height: 100%;
          font-size: 16px;
        }
        .select-one::after{
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
    }
  }
  @media only screen and (max-height: 500px) { 
    .synthesize-rating {
      height: $adjustHeight; 
    } 
  }
</style>