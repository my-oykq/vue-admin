<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { initDynamicRoutes } from '@/router'
export default {
  created () {
    // 解决页面刷新动态路由丢失问题 但是如果写了404页面 此函数无效 还未解决该问题
    initDynamicRoutes()
  },
  mounted () {
    window.addEventListener('unload', this.saveState)
//     if (sessionStorage.getItem("state") ) {
// 　　　　//this.$store.replaceState()替换 store 的根状态
//          this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("state"))))
//        }

     //在页面刷新时将vuex里的信息保存到sessionStorage里
     window.addEventListener("beforeunload",()=>{
         sessionStorage.setItem("state",JSON.stringify(this.$store.state))
     })
  },
  methods: {
    saveState() {
        sessionStorage.setItem('state', JSON.stringify(this.$store.state))
      }
  }
}
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
