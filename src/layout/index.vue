<template>
  <el-container class="layout-container">
    <el-aside class="aside" width="auto">
      <app-aside class="aside-menu" :is-collapse="isCollapse"></app-aside>
    </el-aside>
    <el-container>
      <el-header class="header">
        <div>
          <i
            :class="{
              'el-icon-s-fold': !isCollapse,
              'el-icon-s-unfold': isCollapse,
            }"
            style="cursor: pointer"
            @click="isCollapse = !isCollapse"
          ></i>
          <span>&nbsp;字节跳动</span>
        </div>
        <el-dropdown>
          <div class="avatar-warp">
            <img class="avatar" :src="photo" alt="" />
            <span>{{ username }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click.native="logout">用户退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapState } from 'vuex'
import {initState} from '../store/index.js'
import {initHomeState} from '../store/home'
import AppAside from './components/aside'
export default {
  name: 'LayoutIndex',
  components: {
    AppAside
  },
  props: {},
  data () {
    return {
      isCollapse: false
    }
  },
  computed: {
    ...mapState(['username']), // 用户名
    ...mapState(['photo']) // 用户头像
  },
  watch: {},
  created () { },
  mounted () { },
  methods: {
    logout () {
      sessionStorage.clear()
       console.log(this.$store.state,'退出登录replaceState之前');
      this.$router.push({ name: 'login' })
      this.$store.replaceState(
        JSON.parse(JSON.stringify(Object.assign({},
          initHomeState,
          initState
        )))
      )
      console.log(this.$store.state,'退出登录replaceState之后');
      // 删除vuex中的数据 让当前页面刷新
      // window.location.reload()
    }
  }
}
</script>

<style scoped lang="less">
.layout-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  .aside {
    background-color: #d3dce6;
    .aside-menu {
      height: 100%;
    }
  }
  .header {
    height: 64px;
    background: #fff;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .avatar-warp {
      display: flex;
      align-items: center;
      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }
  .main {
    background-color: #e9eef3;
  }
}
</style>
