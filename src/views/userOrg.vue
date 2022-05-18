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
            <el-form ref="form"  label-width="90px" :label-position="labelPosition">
              <el-form-item label="机构名称：" >
                <el-input style="width:380px"></el-input>
                <div class="tips"><i class="el-icon-warning"></i>机构名称需与上传的盖章附件的机构名称保持一致！</div>
              </el-form-item>
              <div class="line"></div>
              <el-form-item label="机构管理员：" >
                <el-input style="width:380px"></el-input>
              </el-form-item>
              <el-form-item label="管理员账号：" >
                <el-input style="width:380px"></el-input>
              </el-form-item>
              <el-form-item label="管理员密码：" >
                <el-input style="width:380px"></el-input>
              </el-form-item>
              <el-form-item label="确认密码：" >
                <el-input style="width:380px"></el-input>
              </el-form-item>
               <div class="line"></div>
              <el-form-item label="管理员手机：" >
                <el-input style="width:380px" placeholder="请输入手机号"></el-input>
              </el-form-item>
              <el-form-item label="联系手机：" >
                <el-input style="width:380px" placeholder="请输入邮箱"></el-input>
              </el-form-item>
              <el-form-item label="邮箱验证:" >
                <el-input style="width:250px" placeholder="请输入验证码"></el-input>
                <span class="code">发送邮箱验证</span>
              </el-form-item>
              <div class="line"></div>
              <el-form-item label="盖章附件上传：" class="form-uploader">
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false">
                  <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
                  <i  class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <div class="tips tips002">支持格式：pdf</div>
              </el-form-item>
              <el-form-item label="备注说明：" >
                <el-input style="width:380px" type="textarea" :rows="2" placeholder="最多输入100字符"></el-input>
              </el-form-item>
              <el-form-item style="padding-top:30px">
                <el-button  type="primary">提交注册申请</el-button>
              </el-form-item>
              <el-form-item style="padding-top:30px">
                <div class="tips">
                  <div>提示：</div>
                  <div>注册前需要准备：</div>
                  <div>1.签字盖章申请表扫描件(注：盖的章为带有申请机构代码所对应的机构名称的章)，点击<span style="color:#1C6BFF;cursor: pointer;">查看模板；</span></div>
                  <div>2.附件上传需为原件的pdf扫描件。</div>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="10" class="col02" style=" padding-left: 129px;padding-top: 180px;">
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
        // width: 80px !important;
        // text-align: left;
        padding: 0 5px 0 0
      }
      .el-form-item__content{
        // margin-left: 83px !important;
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
      .tips002{
        margin: 0px 0px -20px 10px;
      }
      .el-button{
         background: #1C6BFF;
      }
    }
    .form-uploader{
      .el-form-item__label{
        width: 104px !important;
        // text-align: left;
        padding: 0 5px 0 0
      }
    }
}
/deep/ .el-upload {
    border: 1px solid #1C6BFF;
    border-radius: none;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-bottom: -21px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 188px;
    height: 105px;
    line-height: 105px;
    text-align: center;
  }
  .avatar-uploader-icon::before{
    content: "\e6d9";
    width: 36px;
    height: 36px;
    opacity: 0.8;
    border-radius: 50%;
    padding: 6px;
    color: #fff;
    background: #1C6BFF;
  }
</style>
