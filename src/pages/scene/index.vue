<template>
  <div class="scene">
    <div class="scene-item" v-for="(item, index) in sceneList" :key="index" @click="handleExecute(item)">
      <span class="pic">
        <img :src="scenePicList[item.photo]">
      </span>
      <span class="name">
        {{item.modName}}
      </span>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getModListApi, executeModApi } from '@/api/scene'

  export default {
    computed: {
      ...mapGetters([
        'userInfo'
      ])
    },
    data () {
      return {
        // 情景列表
        sceneList: [],
        // 情景图片列表
        scenePicList: {
          sceneicon_0: '/static/images/scene/sceneicon_0.png',
          sceneicon_1: '/static/images/scene/sceneicon_1.png',
          sceneicon_2: '/static/images/scene/sceneicon_2.png',
          sceneicon_3: '/static/images/scene/sceneicon_3.png',
          sceneicon_4: '/static/images/scene/sceneicon_4.png',
          sceneicon_5: '/static/images/scene/sceneicon_4.png',
          sceneicon_6: '/static/images/scene/sceneicon_6.png',
          sceneicon_7: '/static/images/scene/sceneicon_7.png',
          sceneicon_8: '/static/images/scene/sceneicon_8.png',
          sceneicon_9: '/static/images/scene/sceneicon_9.png',
          sceneicon_10: '/static/images/scene/sceneicon_10.png',
          sceneicon_11: '/static/images/scene/sceneicon_11.png'
        }
      }
    },
    created () {
      this.initData()
    },
    methods: {
      // 情景数据初始化
      initData () {
        getModListApi({gatewayCode: '6003000000BA'}).then(response => {
          this.sceneList = response.success ? response.content : []
        })
      },
      // 执行情景
      handleExecute (row) {
        let parameter = {
          entity: {
            toID: row.toID,
            toType: 'device',
            fromType: 'server',
            fromID: 'server',
            photo: row.photo,
            cmd: 'dealMod',
            modID: row.modID,
            parameterList: [],
            delayTime: 1
          },
          user: {
            userId: this.userInfo.id
          }
        }
        executeModApi(parameter).then(response => {
          if (response.success) {
            wx.showToast({
              title: '情景执行中...',
              icon: 'none',
              duration: 2000
            })
          } else {
            wx.showToast({
              title: response.message,
              icon: 'none',
              duration: 2000
            })
          }
        })
        .catch(error => {
          wx.showToast({
            title: error,
            icon: 'none',
            duration: 2000
          })
        })
      }
    }
  }
</script>

<style lang="scss">
  @import '@/common/scss/index.scss';

  .scene{
    position: relative;
    .scene-item{
      @include center($type: true);
      margin-top: 10px;
      height: 40px;
      background: $backgorund;
      .pic{
        @include center($type: true);
        padding-right: 20px;
        img{
          width: 35px;
          height: 35px; 
        }
      }
      .name{
        flex: 1;
      }
    }
  }
</style>
