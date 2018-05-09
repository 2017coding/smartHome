<template>
  <div class="home-star">
    <div class="arrows">
      <!-- v-if="current !== 0" -->
      <i class="icon iconfont return">&#xe74f;</i>
      <!-- <i class="" v-else></i> -->
      <i class="icon iconfont enter">&#xe70c;</i>
    </div>
    <swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular" @change="_swiperChange">
      <div v-for="(item, index) in list" :key="index">
        <swiper-item>
          <div class="title">
            <div class="left">
              <img src="/static/images/page_images/star.png" alt="star" class="star-image">{{item.title}}
            </div>
            <div class="right">
              <i class="icon iconfont" style="color: #6ca638">&#xe710;</i>
            </div>
          </div>
          <div class="content">
            <div class="NO1">
              <div class="NO1-left">
                <img src="/static/images/page_images/NO1.png" alt="NO1" class="NO-image">
              </div>
              <div class="NO1-right">
                <span style="font-size: 24px">{{item.NO1}}</span>
                <span>{{item.type}}{{item.NO1Score}}</span>
              </div>
            </div>
            <div class="NO-other">
              <div class="NO2">
                <div class="NO2-left">
                  <img src="/static/images/page_images/NO2.png" alt="NO2" class="NO-image">
                </div>
                <div class="NO2-right">
                  <span>{{item.NO2}}</span>
                  <span>{{item.type}}{{item.NO2Score}}</span>
                </div>
              </div>
              <div class="NO3">
                <div class="NO3-left">
                  <img src="/static/images/page_images/NO3.png" alt="NO3" class="NO-image">
                </div>
                <div class="NO3-right">
                  <span>{{item.NO3}}</span>
                  <span>{{item.type}}{{item.NO3Score}}</span>
                </div>
              </div>
            </div>
          </div>
        </swiper-item>
      </div>
    </swiper>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        current: 0, // 当前所在的滑块位置
        indicatorDots: false, // 是否显示面板指示点
        autoplay: false, // 是否自动切换
        interval: 5000, // 自动切换时间间隔
        duration: 900, // 滑动动画时长
        circular: true, // 是否采用衔接滑动
        list: [
          {title: '上月能效之星', NO1: '侯寨配电房', NO2: '轩辕丘收费站', NO3: '新郑西站', type: '功率因素', NO1Score: '0.98778', NO2Score: '0.86548', NO3Score: '0.84215'},
          {title: '上月节能之星', NO1: '侯寨配电房', NO2: '轩辕丘收费站', NO3: '新郑西站', type: '节能量', NO1Score: '984', NO2Score: '865', NO3Score: '562'},
          {title: '上月节费之星', NO1: '侯寨配电房', NO2: '轩辕丘收费站', NO3: '新郑西站', type: '电费节省', NO1Score: '34767', NO2Score: '28546', NO3Score: '19800'}
        ]
      }
    },
    methods: {
      _swiperChange (e) {
        this.current = e.mp.detail.current
      }
    }
  }
</script>

<style lang="scss">
  @import '@/common/scss/index.scss';

  .home-star{
    width: 100%;
    position: relative;
    background: $backgorund;
    .arrows{
      @include center($type: true);
      justify-content: space-between;
      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      transform: translate(0, -50%);
    }
    .star-image{
      width: 18px;
      height: 20px;
      margin-right: 5px;
    }
    .NO-image{
      width: 30px;
      height: 30px;
    }
    ._swiper-item{
      display: flex;
      flex-direction: column;
      .title{
        flex: 1;
        @include center($type: true);
        justify-content: space-between;
        position: relative;
        margin: 0 10px;
        font-size: 14px;
        .left{
          @include center($type: true);
        }
      }
      .title::after{
        @include border-1px(rgb(150, 150, 150));
      }
      .content{
        flex: 4;
        @include center($type: true);
        flex-direction: column;
        padding: 0 10px;
        .NO1{
          flex: 1;
          @include center($type: true);
          position: relative;
          width: 100%;
        }
        .NO1::after{
          @include border-1px(rgb(150, 150, 150));
        }
        .NO-other{
          flex: 1;
          @include center($type: true);
          padding: 0 10px;
          width: 100%;
          .NO2,.NO3{
            @include center($type: true);
            flex: 1;
            position: relative;
            height: 100%;
          }
          .NO2::after{
            position: absolute;
            content: "";
            top: 0;
            bottom: 0;
            right: 0;
            width: 1px;
            background: rgb(150, 150, 150);
            transform: scaleX(.5);
          }
        }
        .NO1,.NO2,.No3{
          display: flex;
          position: relative;
        }
        .NO1 .NO1-left,.NO2 .NO2-left,.NO3 .NO3-left{
          width: 40%;
        }
        .NO1 .NO1-right,.NO2 .NO2-right,.NO3 .NO3-right{
          width: 60%;
        }
        .NO1 .NO1-left,.NO1 .NO1-right,.NO2 .NO2-left,.NO2 .NO2-right,.NO3 .NO3-left,.NO3 .NO3-right{
          @include center($type: true);
        }
        .NO1 .NO1-left .icon,.NO2 .NO2-left .icon,.NO3 .NO3-left .icon{
          font-size: 36px;
          color: #EEE8AA;
        }
        .NO1 .NO1-left .icon{
          font-size: 48px;
        }
        .NO1 .NO1-left span,.NO2 .NO2-left span,.NO3 .NO3-left span{
          position: absolute;
        }
        .NO1 .NO1-right,.NO2 .NO2-right,.NO3 .NO3-right{
          // margin-left: 50%;
          flex-direction: column;
        }
        .NO1 .NO1-right span,.NO2 .NO2-right span,.NO3 .NO3-right span{
          display: inline-block;
          width: 100%;
          @include textHide();
        }
      }
    }
  }
</style>