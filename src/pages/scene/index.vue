<template>
  <div class="scene">
  </div>
</template>

<script>
  // import { getModListApi,
  //          executeModApi,
  //          addModApi,
  //          editModApi,
  //          deleteModApi
  //        } from '@/api/login'

  export default {
    data () {
      return {
        // 情景图片列表
        scenePicList: {
          sceneicon_0: 'static/image/scene/sceneicon_0.png',
          sceneicon_1: 'static/image/scene/sceneicon_1.png',
          sceneicon_2: 'static/image/scene/sceneicon_2.png',
          sceneicon_3: 'static/image/scene/sceneicon_3.png',
          sceneicon_4: 'static/image/scene/sceneicon_4.png',
          sceneicon_5: 'static/image/scene/sceneicon_4.png',
          sceneicon_6: 'static/image/scene/sceneicon_6.png',
          sceneicon_7: 'static/image/scene/sceneicon_7.png',
          sceneicon_8: 'static/image/scene/sceneicon_8.png',
          sceneicon_9: 'static/image/scene/sceneicon_9.png',
          sceneicon_10: 'static/image/scene/sceneicon_10.png',
          sceneicon_11: 'static/image/scene/sceneicon_11.png'
        }
      }
    },
    methods: {
    }
  }
</script>

<style lang="scss">
  @import '@/common/scss/index.scss';

  .scene{
    @include center($type: true);
    flex-direction: column;
    position: relative;
    height: 100%;
  }
  @media only screen and (max-height: 500px) { 
    .scene {
      height: $adjustHeight; 
    } 
  }
</style>
