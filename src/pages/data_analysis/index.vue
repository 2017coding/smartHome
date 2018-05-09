<template>
  <div class="data-analysis">
    <Statistics></Statistics>
    <Contrast></Contrast>
    <Analyze></Analyze>
  </div>
</template>

<script>
  import Statistics from './components/statistics'
  import Contrast from './components/contrast'
  import Analyze from './components/Analyze'
  
  export default {
    components: {
      Statistics,
      Contrast,
      Analyze
    },
    data () {
      return {
      }
    }
  }
</script>

<style lang="scss">
  @import '@/common/scss/index.scss';
  
  .data-analysis{
    @include center($type: true);
    flex-direction: column;
    position: relative;
    height: 100%;
  }
  @media only screen and (max-height: 500px) { 
    .data-analysis {
      height: $adjustHeight; 
    } 
  }
</style>
