<template>
  <div>
    <h2>根据接口返回数据动态渲染</h2>
    <el-form label-position="right" label-width="200px" :model="ipConfigInfo">
      <el-form-item v-for="(item, index) in ipConfigInfo.list" :key="index" :label="item.label+'：'">
        <el-input style="width:80px" v-model="item.ip1" ></el-input>
        <span class="ip-dot">.</span>
        <el-input style="width:80px" v-model="item.ip2"></el-input>
        <span class="ip-dot">.</span>
        <el-input style="width:80px" v-model="item.ip3"></el-input>
        <span class="ip-dot">.</span>
        <el-input style="width:80px" v-model="item.ip4"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="saveConfigIp">保存</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        form:{

        },
        ipList:[
          {
            label:'web系统ip',
            id:'1'
          },
          {
            label:'Tonlink(TLQ)主IP',
            id:'2'
          },
          {
            label:'Tonlink(TLQ)备IP',
            id:'3'
          },
          {
            label:'自定义IP',
            id:'4'
          }
        ]
      }
    },
    computed: {
      ipConfigInfo(){
        const ipconfig = {}
        this.ipList.forEach(item => {
          this.$set(item,'ip1','')
          this.$set(item,'ip2','')
          this.$set(item,'ip3','')
          this.$set(item,'ip4','')
        })
        ipconfig.list = this.ipList
        return ipconfig
      }

    },
    mounted () {
      console.log(this.ipConfigInfo,'99999');
    },
    methods: {
      saveConfigIp(){
        console.log(this.ipConfigInfo,'保存拿到信息');
      }
    }
  }
</script>

<style lang="less"  scoped>
.ip-dot{
  padding: 0 5px;
}

</style>
