
<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    console.log('app created and cache logs by setStorageSync')
  }
}
</script>

<style lang="scss">
  // 引入字体 
  @import url('../static/font/iconfont.css');
  @import '../src/common/scss/base.scss';

  /* this rule will be remove */
  * {
    margin: 0;
    padding: 0;
    transition: width 2s;
    -moz-transition: width 2s;
    -webkit-transition: width 2s;
    -o-transition: width 2s;
  }
  html, body{
    height: 100%;
    font-size: $fontSize;
    color: $fontColor;
    background: $pageBackground;
  }
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 200rpx 0;
    box-sizing: border-box;
  }
</style>
