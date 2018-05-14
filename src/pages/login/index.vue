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
      <button class="bt-login" @click="_login()">登陆</button>
      <button class="bt-qr-login" @click="_QRlogin()">扫码登录</button>
    </div>
  </div>
</template>

<script>
import { loginApi } from '@/api/login'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      userName: '',
      passWord: ''
    }
  },
  created () {
    // 调用应用实例的方法获取全局数据
    // this.getUserInfo()

    // 初始化数据
    if (wx.getStorageSync('username') && wx.getStorageSync('password')) {
      this.userName = wx.getStorageSync('username')
      this.passWord = wx.getStorageSync('password')
    }
  },
  methods: {
    // 得到微信的信息
    _getUserInfo () {
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
    // 扫码登陆
    _QRlogin () {
      // 只允许从相机扫码
      wx.scanCode({
        // onlyFromCamera: true,
        success: (res) => {
          let userInfo = JSON.parse(res.result)
          this.userName = userInfo.username
          this.passWord = uncompile(userInfo.password)
          this._login('QRlogin')
        },
        fail: () => {
          wx.redirectTo({
            url: '/pages/login/main'
          })
        }
      })
      compile('测试加密')
      // 加密的方法
      function compile (code) {
        var c = String.fromCharCode(code.charCodeAt(0) + code.length)
        for (var i = 1; i < code.length; i++) {
          c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1))
        }
        return escape(c)
      }
      // 解密的方法
      function uncompile (code) {
        code = unescape(code)
        var c = String.fromCharCode(code.charCodeAt(0) - code.length)
        for (var i = 1; i < code.length; i++) {
          c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1))
        }
        return c
      }
    },
    // 登陆
    _login (type) {
      if (!this.userName) {
        // this.openAlert('账户/手机号不能为空')
        wx.showToast({
          title: '账户/手机号不能为空',
          icon: 'none',
          duration: 2000
        })
        return
      }
      if (!this.passWord) {
        // this.openAlert('密码不能为空')
        wx.showToast({
          title: '密码不能为空',
          icon: 'none',
          duration: 2000
        })
        return
      }
      loginApi({ username: this.userName, password: this.passWord }).then(response => {
        if (response.success) {
          // 登录成功后存下用户数据
          wx.setStorageSync('username', this.userName)
          wx.setStorageSync('password', this.passWord)

          wx.showLoading({
            title: '加载中',
            mask: true
          })
          // 存下所有的用户数据
          this.setUserInfo(response).then(() => {
            // 进入首页
            this._goto()
          })
        } else {
          wx.showToast({
            title: response.message,
            icon: 'none',
            duration: 3000,
            mask: true
          })
          if (type === 'QRlogin') {
            wx.redirectTo({
              url: '/pages/login/main'
            })
          }
        }
      })
        .catch(error => {
          wx.showToast({
            title: error,
            icon: 'none',
            duration: 3000,
            mask: true
          })
          if (type === 'QRlogin') {
            wx.redirectTo({
              url: '/pages/lgoin/main'
            })
          }
        })
    },
    // 跳转
    _goto () {
      wx.switchTab({
        url: '/pages/home/main'
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
@import '@/common/scss/index.scss';

$imgSize: 20vh;

.login {
  height: 100%;
  background: $backgorund;
  .logo {
    @include center($type: true);
    height: 35%;
    img {
      width: $imgSize;
      height: $imgSize;
    }
  }
  .login-form {
    padding: 0 20px;
    .input {
      @include center($type: false);
      position: relative;
      margin-bottom: 20px;
    }
    .input::after {
      @include border-1px(rgb(150, 150, 150));
    }
    .bt-login {
      border: none;
      color: rgb(230, 240, 248);
      background: #21ac70;
      letter-spacing: 5px;
    }
    .bt-qr-login {
      margin-top: 10px;
      border: none;
      color: rgb(230, 240, 248);
      background: #00BFFF;
      letter-spacing: 5px;
    }
  }
}
</style>