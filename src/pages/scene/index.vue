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
    <p
      v-if="sceneList.length === 0"
      style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 18px; font-weight: bold; ">
      当前暂无情景
    </p>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getModListApi, executeModApi } from '@/api/scene'

  export default {
    computed: {
      ...mapGetters([
        'userInfo',
        'selectGatewayInfo'
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
      this.$watch('selectGatewayInfo', () => {
        this.initData()
      })
    },
    // 下拉刷新
    onPullDownRefresh () {
      this.initData()
    },
    methods: {
      // 情景数据初始化
      initData () {
        wx.showNavigationBarLoading() // 在标题栏中显示加载
        getModListApi({gatewayCode: this.selectGatewayInfo.gatewayCode}).then(response => {
          this.sceneList = response.success ? response.content : []

          setTimeout(() => {
            wx.hideNavigationBarLoading() // 完成停止加载
          }, 150)
          wx.stopPullDownRefresh() // 停止下拉刷新
        })
        .catch(error => {
          wx.showToast({
            title: error,
            icon: 'none',
            duration: 2000
          })
          setTimeout(() => {
            wx.hideNavigationBarLoading() // 完成停止加载
          }, 150)
          wx.stopPullDownRefresh() // 停止下拉刷新
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
      position: relative;
      display: inline-flex;
      flex-direction: column;
      margin-top: calc(7vw / 4);
      margin-left: calc(7vw / 4);
      width: 31vw;
      height: 31vw;
      background: $backgorund;
      border-radius: 5%;
      // @include center($type: true);
      // margin-top: 10px;
      // height: 40px;
      // background: $backgorund;
      .pic{
        @include center($type: true);
        flex: 1;
        // padding-right: 20px;
        img{
          width: 50px;
          height: 50px; 
        }
      }
      .name{
        height: 30px;
        line-height: 30px;
        text-align: center;
        @include textHide();
      }
    }
  }
</style>
