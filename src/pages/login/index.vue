<template>
  <div class="login">
    <div class="logo">
      <img src="/static/images/logo-a.png">
    </div>
    <div class="login-form">
      <div class="input username">
        <i class="icon iconfont">&#xe73d;</i>
        <input type="text" placeholder="账号/手机号" v-model.trim="userName">
      </div>
      <div class="input password">
        <i class="icon iconfont">&#xe72a;</i>
        <input type="password" placeholder="密码" v-model.trim="passWord">
      </div>
      <button class="bt-login" @click="_goto()">登陆</button>
    </div>
  </div>
</template>

<script>
  import { loginApi } from '@/api/login'
  import { mapActions } from 'vuex'

  export default {
    data () {
      return {
        userName: 'admin',
        passWord: '123456'
      }
    },
    created () {
      // 调用应用实例的方法获取全局数据
      // this.getUserInfo()
    },
    methods: {
      // 得到微信的信息
      getUserInfo () {
        // 调用登录接口
        wx.login({
          success: () => {
            wx.getUserInfo({
              success: (res) => {
                this.userInfo = res.userInfo
                console.log(this.userInfo)
              }
            })
          }
        })
      },
      // 登陆
      _login () {
        if (!this.userName) {
          this.openAlert('账户/手机号不能为空')
          return
        }
        if (!this.passWord) {
          this.openAlert('密码不能为空')
          return
        }
        loginApi({username: this.userName, password: this.passWord}).then(response => {
          if (response.success) {
            // 存下所有的用户数据
            this.setUserInfo(response).then(() => {
              // 进入首页
              this._goto()
            })
          }
        })
      },
      // 跳转
      _goto () {
        wx.switchTab({
          url: '/pages/home/main'
          // url: '/pages/data_analysis/main'
        })
      },
      // 弹窗
      openAlert (msg) {
        wx.showModal({
          content: msg,
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
      },
      ...mapActions([
        'setUserInfo'
      ])
    }
  }
</script>

<style lang="scss">
  @import '@/common/scss/mixin.scss';

  $imgSize: 20vh;

  .login{
    height: 100%;
    .logo{
      @include center($type: true);
      height: 35%;
      img{
        width: $imgSize;
        height: $imgSize;
      }
    }
    .login-form{
      padding: 0 20px;
      .input{
        @include center($type: false);
        position: relative;
        margin-bottom: 20px;
      }
      .input::after{
        @include border-1px(rgb(150, 150, 150));
      }
      .bt-login{
        border: none;
        color: rgb(230, 240, 248);
        background: #21ac70;
        letter-spacing: 5px;
      }
    }
  }
</style>