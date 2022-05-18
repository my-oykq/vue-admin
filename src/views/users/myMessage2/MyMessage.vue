<template>
  <!-- <div> -->
    <transition  name="message-fade">
      <div
      :class="['message',type ?`el-message--${type}` : '',
      center?'center': ''
      ]"
      :style="{top: top + 'px'}"
      v-if="visible">
        <!--自定义图标存在时显示-->
      <!-- <i :class="iconClass" v-if="iconClass"></i> -->
        <!--自定义图标不存在时根据type显示图标-->
      <!-- <i :class="typeClass" v-else></i> -->
       <div>{{msg}}</div>
      </div>

    </transition>
  <!-- </div> -->
</template>

<script type="text/ecmascript-6">
const typeMap = {
    success: 'success',
    info: 'info',
    warning: 'warning',
    error: 'error'
  };
  export default {
    data () {
      return {
        visible:false,
        top:null,
        // type:'info',
        iconClass: '',
        verticalOffset: 20,
        // message:'这是一条消息提示'
      }
    },
    computed: {
      // 关于动态style另一种写法
      positionStyle() {
        // console.log(this.verticalOffset,'=====');
        return {
          'top': `${ this.verticalOffset }px`
        };
      },
      // typeClass(){
      //   return this.type && !this.iconClass
      //     ? `el-message__icon el-icon-${ typeMap[this.type] }`
      //     : '';
      // }
    },
    // 通过props的形式给组件传参数
    props:{
      msg:{
        type:String,
        default:''
      },
      center:{
        type:Boolean,
        default:false
      },
      type:{
        type:String,
        default:'success'
      }
    },
    mounted () {
      setTimeout(() => {
        // this.visible = false
      }, 1000);
      console.log('进入组件');
    }
  }
</script>

<style lang="less"  scoped>
.message{
    min-width: 380px;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    position: fixed;
    left: 50%;
    // top: 20px;
    font-size: 14px;
    color: #666;
    // 学习这些样式
    transform: translateX(-50%);
    background-color: #edf2fc;
    transition: opacity .3s,transform .4s,top .4s;
    overflow: hidden;
    padding: 15px 15px 15px 20px;
    display: flex;
    align-items: center;
    &.center{
      justify-content: center;
    }
}
.message-fade-enter,
.message-fade-leave{
  transform: translate(-50%,-50%);
}

</style>
