import Vue from 'vue'
import App from './App'
import store from './store' // vuex仓库
import '../static/weui/weui.css' // weui

Vue.config.productionTip = false
App.mpType = 'app'

// 配置Vuex
Vue.prototype.$store = store

const app = new Vue({
  ...App
})
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/login/main'],
    window: {
      backgroundTextStyle: 'light',
      frontColor: '#ffffff',
      navigationBarBackgroundColor: '#252939',
      navigationBarTitleText: 'SmartHome',
      navigationBarTextStyle: '#ffffff'
    },
    tabBar: {
      color: '#6a6a6f',
      selectedColor: '#eaa01d',
      borderStyle: 'white',
      backgroundColor: 'white',
      list: [
        {
          text: '首页',
          pagePath: 'pages/home/main',
          iconPath: 'static/images/tabbar/home.png',
          selectedIconPath: 'static/images/tabbar/home1.png'
        },
        {
          text: '情景',
          pagePath: 'pages/scene/main',
          iconPath: 'static/images/tabbar/rating.png',
          selectedIconPath: 'static/images/tabbar/rating1.png'
        }
      ]
    }
  }
}
