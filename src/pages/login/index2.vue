<template>
  <div>
    <div
    ref="box"
    :class="index === item ? 'animation box' : 'box'"
    v-for="(item, index) in list"
    @click="_changeList(index)"
    :key="index">
    {{item}}
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        list: []
      }
    },
    created () {
      for (let i = 0, len = 5; i < len; i++) {
        this.list.push(i)
      }
    },
    methods: {
      /**
       * 更换数组
       * @param index 当前点击的索引
       */
      _changeList (index) {
        let a, b, c
        // 当前
        a = this.list[index]
        // 上一个
        b = this.list[index - 1]
        // 下一个
        c = this.list[index + 1]
        if (index === 0) {
          this.list[index] = c
          this.list[index + 1] = a
        } else {
          this.list[index] = b
          this.list[index - 1] = a
        }

        // 数据深拷贝
        this.list = JSON.parse(JSON.stringify(this.list))
      }
    }
  }
</script>

<style lang="scss">
  .box{
    background: rgb(100, 100, 100); 
    margin: 10px 0; 
    color: white; 
    height: 40px;
    transition: all .2s;
  }
  .animation{
    margin-left: 50px;
  }
</style>