<template>
  <!-- 头部盒子 -->
  <div class="header">
    <!-- 标题区域 -->
    <div class="lnner-header">
      <div>
        <h1>Hello!</h1>
        <h2>欢迎来到vue-admin!</h2>
        <el-form class="login-form" ref="form" :model="form">
          <el-form-item>
            <el-input placeholder="请输入账号" v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="请输入密码" type="password" v-model="form.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" type="primary" style="width: 100%" @keyup.enter="onLogin" @click="onLogin">登 录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 波浪区域 -->
    <div>
      <!-- svg形状 -->
      <svg class="waves" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
        <!-- 形状容器 -->
        <defs>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <!-- 组合形状 -->
        <g class="parallax">
          <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
          <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
          <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
          <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
import { login, getRoles } from '@/api/user'
import { initDynamicRoutes } from '@/router'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      // 管理员 admin 123456  普通用户 student 123456
      form: {
        username: 'admin',
        password: '123456'
      },
      loading: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    // 实现按下回车键后登录
    var that = this
    document.onkeydown = () => {
      var key = window.event.keyCode
      // console.log(key)  13 是回车键
      if (key === 13) {
        that.onLogin()
      }
    }
  },
  methods: {
    onLogin () {
      this.loading = true
      login(this.form).then(res => {
        // console.log(res, 'login=>res')
        // 将用户身份存入vuex 普通用户身份: student 管理员用户身份: admin
        this.$store.commit('setRole', res.data.role)

        this.$store.commit('setUsername', res.data.username)
        this.$store.commit('setPhoto', res.data.photo)
        sessionStorage.setItem('token', res.data.token)

        getRoles(res.data.role).then(ret => {
          // console.log(ret.data, 'getRoles=>ret.data')
          // 将对应身份下的路由存储到vuex
          this.$store.commit('setRightList', ret.data)
          this.loading = false
          this.$message.success('登陆成功')

          // 根据用户所具备的权限 动态添加路由规则
          initDynamicRoutes()
          this.$router.push('/')
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.header {
  position: relative;
  // text-align: center;
  /* 背景渐变 */
  background: linear-gradient(60deg,rgba(84,58,183,1) 0%, rgba(0,172,193,1) 100%);
  color: wheat;
  .lnner-header {
    height: 65vh;
    width: 100%;
    /* flex */
    /* 垂直居中 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1 {
      font-family: 'Lato','sans-serif';
      font-weight: 300;
      /* font-spacing:2px; */
      font-size: 48px;
    }
    h2 {
      font-family: 'Lato','sans-serif';
      font-weight: 300;
      /* font-spacing:2px; */
      font-size: 28px;
    }
    .login-form {
      width: 300px;
      padding-top: 30px;
    }
  }
  .waves {
    position: relative;
    width: 100%;
    height: 15vh;
    margin-bottom: -7px;
    /* 最小值 */
    min-height: 100px;
    /* 最大值 */
    max-height: 150px;
    .parallax>use {
      animation: move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite;
    }
    /* 选择的一个use */
    .parallax>use:nth-child(1) {
      /* 延迟 2s 执行 */
      animation-delay: -2s;
      /* 7s 内 执行完毕 */
      animation-duration: 7s;
    }
    .parallax>use:nth-child(2) {
      animation-delay: -3s;
      animation-duration: 10s;
    }
    .parallax>use:nth-child(3) {
      animation-delay: -4s;
      animation-duration: 13s;
    }
    .parallax>use:nth-child(4) {
      animation-delay: -5s;
      animation-duration: 20s;
    }
  }
}
/* 动画 */
@keyframes move-forever {
  0% {
        transform: translate3d(-90px,0,0);
    }
  100% {
      transform: translate3d(85px,0,0);
  }
}
/* 当屏幕小于 768px 执行 */
@media (max-width : 768px) {
  .waves {
      height: 40px;
      min-height: 40px;
  }
  h1   {
      font-size: 24px;
  }
}
/deep/ .el-input__inner {
  background-color: rgba(255,255,255,0.7);
  border-radius: 0;
  border: 1px solid #0094ff;
  color: rgba(0, 0, 0, .7)
}
/deep/ .el-input__inner::placeholder {
  color: rgba(0, 0, 0, .3)
}
/deep/ .el-button {
  border-radius: 0;
}
</style>
