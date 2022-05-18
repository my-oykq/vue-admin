import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入axios
// import axios from 'axios'
// 引入Vuex
// import Vuex from 'vuex'
import store from './store/index'
import * as echarts from 'echarts' // 5.0版本的echarts引入方法
// three.js
// import * as THREE from 'three'
// import iView from 'iview' // 导入组件库
// 引入element-ui
import ElementUI from 'element-ui'
// import 'element-ui/lib'
import 'element-ui/lib/theme-chalk/index.css'
// 引入全局样式
import './assets/css/index.css'
// 引入mock
import '../mock'
// 注册permission
import './utils/permission'
// import MyMessage1 from './views/users/myMessage1/index'
import MyMessage2 from './views/users/myMessage2/index'
import Message from './views/users/src/main'
// import 'iview/dist/styles/iview.css' // 导入样式
// Vue.prototype.$echarts = echarts
Vue.prototype.$notice = MyMessage2
Vue.prototype.$Mymsg = MyMessage2
Vue.prototype.$msg = Message
console.log(MyMessage2,'MyMessage2===');
// Vue.prototype.$axios = axios
// Vue.use(Vuex)
Vue.use(ElementUI)
// Vue.use(iView)
Vue.config.productionTip = false

// const scene = new THREE.Scene()

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
