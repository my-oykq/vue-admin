<template>
 <div id="container">
   <div class="content">
   </div>
   <div>
       <el-row :gutter="20">
        <el-col :span="14" style=" padding-left: 266px;padding-top: 80px;">
          <div class="grid-content bg-purple grid-info01">
            <h2>欢迎注册</h2>
            <div class="line"></div>
            <el-form ref="form"  label-width="100px" :label-position="labelPosition">
              <el-form-item label="所属机构：">
                <!-- 可以使用input的远程搜索，到时候替换  :fetch-suggestions="querySearchAsync"  @select="handleSelect"-->
                <el-autocomplete
                 style="width:380px"
                 placeholder="请输入机构名称"
                ></el-autocomplete>
                <!-- <el-input ></el-input> -->
                <div class="tips"><i class="el-icon-warning"></i>该机构尚未在系统内注册过，请先 <span class="org" @click="$router.push('/userOrg')">注册机构</span></div>
              </el-form-item>
              <div class="line"></div>
              <el-form-item label="用户名：" >
                <el-input style="width:380px" placeholder="请填写真实姓名"></el-input>
              </el-form-item>
              <el-form-item label="登录账号：" >
                <el-input style="width:380px" placeholder="请输入账号"></el-input>
              </el-form-item>
              <el-form-item label="密码：" >
                <el-input style="width:380px" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item label="确认密码：" >
                <el-input style="width:380px" placeholder="请输入密码"></el-input>
              </el-form-item>
               <div class="line"></div>
              <el-form-item label="联系邮箱：" >
                <el-input style="width:380px" placeholder="请输入邮箱"></el-input>
              </el-form-item>
              <el-form-item label="邮箱验证:" >
                <el-input style="width:250px" placeholder="请输入验证码"></el-input>
                <span class="code">发送邮箱验证</span>
              </el-form-item>
              <el-form-item label="联系电话：" >
                <el-input style="width:380px" placeholder="请输入手机号"></el-input>
              </el-form-item>
              <el-form-item label="备注说明：" >
                <el-input style="width:380px" type="textarea" :rows="2" placeholder="最多输入100字符"></el-input>
              </el-form-item>
              <el-form-item style="padding-top:30px">
                <el-button  type="primary">提交注册申请</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="10" class="col02" style=" padding-left: 129px;padding-top: 255px;">
          <div class="grid-content bg-purple grid-info02">
            <div class="step-bg"></div>
          </div>
        </el-col>
      </el-row>
     </div>
 </div>
</template>

<script>
export default {
  name: 'UserIndex',
  components: {},
  props: {},
  data () {
    return {
      labelPosition:'right'
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">

.content{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: url('~@/assets/images/bg.png') no-repeat center;
  background-size: 100% 100%;
  }
  h2{
    font-family: MicrosoftYaHeiUI-Bold;
    font-size: 16px;
    color: #333333;
    letter-spacing: 1px;
  }

  .line{
    width: 462px;
    // height: 1px;
    border: 0.5px solid #CCCCCC;
    margin: 30px 0;
  }
  .col01{

  }
  .col02{
    padding-right: 127px;
  }
  .grid-info01{
    width: 470px;
    // background: red;
  }
  .grid-info02{

    .step-bg{
      width: 375px;
      height: 618px;
      background: url('~@/assets/images/step.png') no-repeat center;
      background-size: 100% 100%;
    }
  }

/deep/ .el-form{
  .el-form-item{
      margin-bottom: 22px;
      .el-form-item__label{
        width: 80px !important;
        // text-align: left;
        padding: 0 5px 0 0
      }
      .el-form-item__content{
        margin-left: 83px !important;
      }
      .code{
        width: 102px;
        height: 40px;
        margin-left: 8px;
        padding: 8px;
        color: #fff;
        background: #1C6BFF;
        border: 1px solid #1C6BFF;
        border-radius: 2px;
      }
      .tips{
        font-family: MicrosoftYaHei;
        font-size: 12px;
        color: #F5222D;
        letter-spacing: 1px;
        i{
          color: #F5222D;
          // padding-left: 6px;
        }
        .org{
          cursor: pointer;
          color: #1C6BFF;
          text-decoration:underline
        }
      }
      .el-button{
         background: #1C6BFF;
      }
    }
}
</style>
