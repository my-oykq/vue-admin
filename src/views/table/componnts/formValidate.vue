<template>
  <div>
    <h2>测试校验全填和不全填不同弹窗展示</h2>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="ruleForm.age"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          age: '',
          name:null,
          applyCert:null
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
        },
        status:'3'
      }
    },
    mounted () {

    },
    methods: {
      submitForm(formName) {
        // 把对象中指定的属性为null的转换成空字符串
        /**
         * 需求：
         * 1.未配置情况下未全部填写时点击提交会弹出弹窗说数据暂存，并且 输入框中滚动到未填写的位置（此时点击提交是可以调接口的，只是不展示接口成功的消息）
         * 2.已生效情况下未全填写（此时表单输入框标红）点击提交按钮弹窗展示‘信息填写不完整’，如有错误则展示‘您的信息有误，请修改后重新提交！’。
         * 3.（优化）如果未做修改数据时，则做到不调用接口，修改才能调用接口
         */
        this.ruleForm.name = this.ruleForm.name? this.ruleForm.name:''
        this.ruleForm.applyCert = this.ruleForm.applyCert? this.ruleForm.applyCert:''
        console.log(this.ruleForm,'ruleForm');
        let isEmpty = Object.values(this.ruleForm).some(item =>item === '')
        console.log(isEmpty,'empty');
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('成功提交接口');;
          } else {
            console.log('error submit!!');
            if(isEmpty && this.status === '3'){
              this.$confirm('您有信息未填写完整，已把当前数据暂存', '信息未填写完整', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                // 调接口，修改就掉接口，没修改不掉接口
              }).catch(() => {});
            }else {// 当为2（已生效时）弹窗展示
              this.$confirm('您有信息未填写完整，请确认', '信息未填写完整', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {

              }).catch(() => {});
            }
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>


</style>
