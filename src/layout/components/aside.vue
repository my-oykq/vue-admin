<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#304156"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="isCollapse"
    :collapse-transition="false"
    router
  >
    <!-- 侧边栏logo -->
    <div class="logo-aside"></div>
    <!-- 还没想如何让非动态路由循环展现 先将首页路由在这里写死 -->
    <el-menu-item index="/">
      <i style="padding-right: 10px" class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/chart">
      <i style="padding-right: 10px" class="el-icon-s-data"></i>
      <span slot="title">图表</span>
    </el-menu-item>
    <el-menu-item index="/cesium">
      <i style="padding-right: 10px" class="el-icon-odometer"></i>
      <span slot="title">地图</span>
    </el-menu-item>
    <!-- 动态路由 -->
    <!-- 一级菜单 -->
    <el-submenu
      :index="item.id + ''"
      v-for="item in menulist"
      :key="item.index"
    >
      <!-- 一级菜单的模板区域 -->
      <template slot="title">
        <!-- 图标 -->
        <i style="padding-right: 10px" :class="item.icon"></i>
        <!-- 文本 -->
        <span>{{ item.authName }}</span>
      </template>
      <!-- 二级菜单 -->
      <el-menu-item
        :index="'/' + subItem.path"
        v-for="subItem in item.children"
        :key="subItem.index"
        @click="saveNavState('/' + subItem.path)"
      >
        <template slot="title">
          <!-- 图标 -->
          <i style="padding-right: 10px" :class="subItem.icon"></i>
          <!-- 文本 -->
          <span>{{ subItem.authName }}</span>
        </template>
      </el-menu-item>
    </el-submenu>
    <!-- 没有二级菜单的路由从这里循环 -->
    <el-menu-item
      :index="'/' + item.path"
      v-for="item in itemlist"
      :key="item.index"
      @click="saveNavState('/' + item.path)"
    >
      <template slot="title">
        <!-- 图标 -->
        <i style="padding-right: 10px" :class="item.icon"></i>
        <!-- 文本 -->
        <span>{{ item.authName }}</span>
      </template>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AppAside',
  components: {},
  props: ['is-collapse'],
  data () {
    return {
      // 左侧菜单数据
      menulist: [], // 有子菜单的
      itemlist: [] // 没有子菜单的
    }
  },
  computed: {
    ...mapState(['rightList']) // 映射
  },
  watch: {},
  created () {
    // 初始化menulist菜单栏的数据
    // this.menulist = this.rightList
    // 将有子选项的和没子选项的筛选一下 有子选项的赋值给menulist 没有子选项的赋值给itemlist
    for (var i = 0, j = 0, k = 0; i < this.rightList.length; i++) {
      // console.log(this.rightList[i].children.length)
      if (this.rightList[i].children.length !== 0) {
        this.menulist[j] = this.rightList[i]
        j = j + 1
      } else {
        this.itemlist[k] = this.rightList[i]
        k = k + 1
      }
    }
  },
  mounted () { },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    saveNavState () {}
  }
}
</script>

<style scoped lang="less">
.logo-aside {
  width: 160px;
  height: 57px;
  margin: 10px 0 0 12px;
  padding-right: 40px;
  background: url(./logo.png) no-repeat;
}
.iconfont {
  padding: 0 20px 0 5px;
}
</style>
