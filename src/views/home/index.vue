<template>
 <div class="container">
  <div id="mybg" class="dynamic">
    <el-calendar v-model="value">
    </el-calendar>
  </div>
 </div>
</template>

<script>
// 引入动态背景的js 由于使用本地js文件会报错 然后引入的在线链接
// import '@/assets/js/three.r119.min.js'
// import '@/assets/js/vanta.fog.min.js'
export default {
  name: 'HomeIndex',
  components: {},
  props: {},
  data () {
    return {
      value: new Date()
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    this.createBg()
    // this.$store.commit('setHomeInfo','进入home页面了')
    this.$store.dispatch('getHomeInfo')
    // this.$store.dispatch('getDetailInfoInfo')
  console.log(this.$store.state,'home页面加载');
  },
  methods: {
    createBg () {
      /* eslint-disable */
      // console.log(VANTA)
      VANTA.BIRDS({
        el: '#mybg',
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        // backgroundColor: 0x70e2f
        backgroundColor: '#fff'
      })
    }
  }
}
</script>

<style scoped lang="less">
  .container {
    height: 100%;
    .dynamic{
      width: 100%;
      height: 100%;
    }
  }
  // vanta画布圆角去除
  /deep/.vanta-canvas {
    border-radius: 0px;
  }
  // 日历组件透明
  .el-calendar {
    background-color: rgba(255, 255, 255, 0);
  }
  // 日期选择状态半透明
  /deep/.el-calendar-table td.is-selected {
    background-color: rgba(242, 248, 254, 0.5);
  }
  // 日期触碰状态半透明
  /deep/.el-calendar-table .el-calendar-day:hover {
    background-color: rgba(242, 248, 254, 0.5);
  }
  // 右上角按钮透明
  /deep/.el-button {
    background: rgba(255, 255, 255, 0);
  }
</style>
