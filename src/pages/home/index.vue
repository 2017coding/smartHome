<template>
  <div class="home">
    <Banner></Banner>
    <div style="height:35px"></div>
    <Star></Star>
    <div style="height:10px"></div>
    <Charts></Charts>
    <div style="height:10px"></div>
  </div>
</template>

<script>
  import Banner from './components/banner'
  import Star from './components/star'
  import Charts from './components/charts'

  export default {
    components: {
      Banner,
      Star,
      Charts
    },
    data () {
      return {
      }
    }
  }
</script>

<style lang="scss">
  @import '@/common/scss/index.scss';

  .home{
    @include center($type: true);
    flex-direction: column;
    position: relative;
    height: 100%;
  }
  @media only screen and (max-height: 500px) { 
    .home {
      height: $adjustHeight; 
    } 
  }
</style>
