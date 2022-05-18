<template>
  <div id="container">
    <div>
      <h2>复选框单选和全选</h2>
      <div >
        <div>
          <i class="el-icon-circle-plus add-sum" @click="dialogVisible2 = true"></i>
        </div>

          <el-checkbox class="check-all" :indeterminate="configData.isIndeterminate" v-model="configData.chekedStatus" @change="handleCheckAllChange">全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <div class="check-content">
             <div v-for="(item,index) in configData.list" :key="index" class="check-item">

              <el-checkbox class="checkbox"  :label="item.id" v-model="item.chekedStatus" @change="chekedStatus =>handleCheckedCitiesChange(chekedStatus,item)">
                <el-input style="width:185px" v-if="item.isEdit" v-model="item.name"></el-input>
                <span v-else @click.prevent="item.isEdit = !item.isEdit">{{item.name}}</span>
              </el-checkbox>
              <span>
                <i class="el-icon-edit icon" v-if="item.type === 'new' || item.hasEdit" @click.prevent="editName(item)"></i>
                <i class="el-icon-delete icon" v-if="item.type === 'new'"></i>
              </span>
            </div>
          </div>
      </div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible2"
      width="30%"
      :modal-append-to-body="false">
      <el-form :model="form">
        <el-form-item label="字段名称：">
          <el-input v-model="form.name" style="width:140px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="addSum">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "UserIndex",
  components: { },
  props: ['configData','type'],
  data() {
    return {
      dialogVisible: false,
      dialogVisible2:false,
        form:{
          name:''
        },
        checkAll: false,
        checkedFruit: [],
        fruitList: [
          {
            name:'西瓜',
            type:'old',
            id:'00',
            isEdit:false
          },
          {
            name:'哈密瓜',
            type:'old',
            id:'01',
            isEdit:false
          },
          {
            name:'南瓜',
            type:'old',
            id:'02',
            isEdit:false
          },
          {
            name:'冬瓜',
            type:'old',
            id:'03',
            isEdit:false
          },
          {
            name:'榴莲',
            type:'old',
            id:'04',
            isEdit:false
          },
          {
            name:'油桃',
            type:'old',
            id:'05',
            isEdit:false
          }
        ],
        isIndeterminate: false,
        id:'05',
        editFlag:false
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    console.log(this.configData,'configData');
  },
  methods: {
    editName(item){
      item.isEdit = true
    },
    addSum(){
      this.id++
      this.fruitList.push({
        type:'new',
        name:this.form.name,
        id:'0' + this.id,
        isEdit: false
      })
      this.dialogVisible2 = false
      if(this.checkedFruit.length > 0) this.isIndeterminate = this.checkedFruit.length === this.fruitList.length ? false : true;
      console.log(this.fruitList,this.checkedFruit,'add');
    },
    // 全选
      handleCheckAllChange(val) {
        /**
         * 如果不实用element的checkbox-group的话这里val是布尔值，使用的话val则是数组
         */
        this.type === 1 ? this.$emit('handleCheckAllChange',val) : this.$emit('chaneCheckAllIp',val)
      },
      // 单选
      handleCheckedCitiesChange(value,item) {
        this.type === 1 ? this.$emit('changeCheck',value,item) : this.$emit('changeCheckIp',value,item)
      },
  },
};
</script>

<style scoped lang="less">
.content {
  width: 100%;
  height: 100vh;
  //   background: url('../../assets/images/bg.png') no-repeat center;
  background-size: 100% 100%;
  .add-sum{
    font-size: 30px;
    cursor: pointer;
    margin-bottom: 20px;
  }
  .col01 {
    padding-left: 266px;
  }
  .col02 {
    padding-right: 127px;
  }
  .grid-info01 {
    width: 470px;
    // background: red;
  }
  .grid-info02 {
    width: 375px;
    background: pink;
  }
  .icon{
    font-size: 16px;
    cursor: pointer;
    &:nth-child(1){
      // color: red;
      padding-left: 13px;
      padding-right: 16px;
    }
  }
  .checkbox-item{
    width: 383px;
    margin-bottom: 20px;
  }
  .check-content{
    width: 766px;
    display: flex;
    flex-wrap: wrap;
    background: burlywood;
  }
  .check-all{
    margin-left: 10px;
  }
  .check-item{
    display: flex;
    align-items: baseline;
    &:not(:nth-child(2n)){
      margin-right: 100px;
    }
    // width: 766px;
    // background: burlywood;
    // align-items: center;
  }
}
/deep/.checkbox{
    width: 251px;
    // background: yellowgreen;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    padding: 10px;
    .el-checkbox__input{
      // padding-top: 10px;
    }
    .el-checkbox__label{
      width: 160px;
      // background: pink;
      word-break: normal;
      display: block;
      white-space: pre-wrap;
      word-wrap: break-word;
      overflow: hidden;
    }
  }
</style>
