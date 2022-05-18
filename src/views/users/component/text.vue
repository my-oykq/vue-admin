<template>
  <div>
    <div class="checkbox-container">
       <!-- <h2>复选框单选和全选</h2> -->
        <div>
          <el-button type="primary" @click="emit('visibleDialog')">+新增</el-button>
          <!-- <i class="el-icon-circle-plus add-sum" @click="dialogVisible2 = true"></i> -->
        </div>
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkList" @change="changeCheck">
            <div class="checkbox-item" v-for="(fruit,index) in checkboxList" :key="index">
              <el-input style="width:185px" v-if="fruit.isEdit"></el-input>
              <el-checkbox v-else :label="fruit.id" >
                <span @click.prevent="fruit.isEdit = !fruit.isEdit">{{fruit.name}}</span>
              </el-checkbox>
              <span v-if="fruit.isEdit && type === 1">
                <i class="el-icon-edit icon" v-if="fruit.type === 'new'" @click.prevent="editName(fruit)"></i>
                <i class="el-icon-delete icon" v-if="fruit.type === 'new'"></i>
              </span>
            </div>
        </el-checkbox-group>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :modal-append-to-body="false">
      <el-form :model="form">
        <el-form-item label="字段名称：">
          <el-input v-model="form.name" style="width:140px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="emit('cancel')">取 消</el-button>
        <el-button type="primary" @click="addSum">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props:['checkboxList','type','dialogVisible','checkAll','isIndeterminate'],
    data () {
      return {
        form:{
          name:''
        },
        // dialogVisible2:false,

        id:'05',
        checkList:[],
        editFlag:false
      }
    },
    methods: {
      editName(item){
      item.isEdit = true
    },
    addSum(){
      console.log(this.type,'type');
      this.type === 1 ? this.$emit('addConfigInfo',this.form) : this.$emit('addIpInfo',this.form)
      // this.id++
      // this.fruitList.push({
      //   type:'new',
      //   name:this.form.name,
      //   id:'0' + this.id,
      //   isEdit: false
      // })
      // // this.editFlag = false
      // this.dialogVisible2 = false
      // if(this.checkedFruit.length > 0) this.isIndeterminate = this.checkedFruit.length === this.fruitList.length ? false : true;
      // console.log(this.fruitList,this.checkedFruit,'add');
    },
    // 全选
      handleCheckAllChange(val) {
        this.type === 1 ? this.$emit('handleCheckAllChange',val) : this.$emit('chaneCheckAllIp',val)
      //  let checked = this.fruitList.map(item => {
      //     return item.id;
      //   });
      //   this.checkedFruit = val ? checked : [];
      //   this.isIndeterminate = false;
      //   console.log(this.checkedFruit,'全选');
      },
      // 单选
      changeCheck(value) {
         this.type === 1 ? this.$emit('changeCheck',value) : this.$emit('changeCheckIp',value)
        // let checkedCount = value.length;
        // this.checkAll = checkedCount === this.fruitList.length;
        // this.isIndeterminate = checkedCount > 0 && checkedCount < this.fruitList.length;
      },
    }
  }
</script>

<style lang="less"  scoped>
.add-sum{
    font-size: 30px;
    cursor: pointer;
    margin-bottom: 20px;
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
/deep/.el-checkbox-group{
  width: 766px;
  display: flex;
  flex-wrap: wrap;
  .el-checkbox{
    .el-checkbox__label{
      width: 185px;
    }
  }
}
</style>
