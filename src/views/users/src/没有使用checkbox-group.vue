<template>
  <div id="container">
    <div class="content">
      <div>
        <!-- <img src="" alt=""> -->
        <el-row :gutter="20">
          <el-button @click="messageClick1">自己封装开启message信息提示 </el-button>
          <el-button @click="messageClick2">官方封装开启message信息提示 </el-button>
          <message2/>

        </el-row>
      </div>
     <h2>动态表头和表体信息</h2>
      <el-table style="width: 100%" border :data="tableData3">
        <el-table-column v-for="(item,index) in tableHead" :prop="item.prop" :label="item.label"  :key="index">
          <div v-if="item.weekList">
            <el-table-column v-for="(item2,index2) in item.weekList" :prop="item2.prop" :label="item2.label"  :key="index2">
            </el-table-column>
          </div>
        </el-table-column>
      </el-table>
      <h2>动态新增表单及动态控制之前选过的禁用</h2>
      <el-form :model="otherForm" ref="otherForm" label-width="100px">
        <el-form-item
          v-for="(other, index) in otherForm.other"
          :label="'类型' + index"
          :key="index"
          :prop="'other.' + index + '.type'">
          <el-select v-model="other.type" placeholder="请选择" @change="changeType(index, other.type)">
            <el-option
              v-for="item in typeList"
              :key="item.Id"
              :label="item.label"
              :value="item.Id"
              :disabled="item.disabled">
            </el-option>
          </el-select>
          <el-button @click.prevent="removeType(other)">删除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="addType">新增</el-button>
        </el-form-item>
      </el-form>
      <h2>复选框单选和全选</h2>
      <div>
        <div>
          <i class="el-icon-circle-plus add-sum" @click="dialogVisible2 = true"></i>
        </div>
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <div v-for="(fruit,index) in fruitList" :key="index">
          <el-input style="width:185px" v-if="fruit.isEdit"></el-input>
          <el-checkbox v-else :label="fruit.id" v-model="fruit.checked" @change="checked =>handleCheckedCitiesChange(checked,fruit)">
            <span @click.prevent="editFlag = true">{{fruit.name}}</span>
          </el-checkbox>
          <span v-if="editFlag">
            <i class="el-icon-edit icon" v-if="fruit.type === 'new'" @click.prevent="editName(fruit)"></i>
            <i class="el-icon-delete icon" v-if="fruit.type === 'new'"></i>
          </span>
        </div>
        <!-- <div> -->
          <!-- <el-checkbox-group v-model="checkedFruit" @change="handleCheckedCitiesChange">
            <div class="checkbox-item" v-for="(fruit,index) in fruitList" :key="index">
              <el-input style="width:60px" v-if="fruit.isEdit"></el-input>
              <el-checkbox v-else :label="fruit.id" >
                <span @click.prevent="editFlag = true">{{fruit.name}}</span>
              </el-checkbox>
              <span v-if="editFlag">
                <i class="el-icon-edit icon" v-if="fruit.type === 'new'" @click.prevent="editName(fruit)"></i>
                <i class="el-icon-delete icon" v-if="fruit.type === 'new'"></i>
              </span>

            </div>
          </el-checkbox-group> -->
        <!-- </div> -->

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
import pdf from "vue-pdf";
import message2 from "element-ui/packages/message/src/main.vue";
export default {
  name: "UserIndex",
  components: { pdf,message2},
  props: {},
  data() {
    return {
      src: "./template.pdf",
      dialogVisible: false,
      dialogVisible2:false,
      tableHead:[//表头数据
          {
            label: '姓名',
            prop: 'name',
            sumFlag:false,
            align: 'center'
          },
          {
            label: '年龄',
            prop: 'age',
            sumFlag:false,
            align: 'center'
          },
          {
            label: '第一周',
            prop: 'd',
            sumFlag:false,
            align: 'center',
            weekList:[
              {
                label: '数量1',
                prop: 'acount1',
                sumFlag:true,
                align: 'center'
              },
              {
                label: '数量2',
                prop: 'acount2',
                sumFlag:true,
                align: 'center'
              },
            ]
          },

          {
            label: '地址',
            prop: 'address',
            sumFlag:false,
            align: 'center'
          }
        ],
        tbodyList:[//表格数据
            { name: '张三',age: '18', acount1:110, acount2:20,address: '北京'},
            { name: '张三',age: '18', acount1:110, acount2:20,address: '北京'},
            { name: '张三',age: '18', acount1:110, acount2:20,address: '北京'}
        ],
        tableData3: [],
        otherForm: {
          other: [{
            type: ''
          }]
        },
        typeList: [{
          Id: 1,
          label: '报名费'
        }, {
          Id: 2,
          label: '饭费'
        }, {
          Id: 3,
          label: '餐费'
        }, {
          Id: 4,
          label: '书本费'
        }],
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
    // 这里不加上set会无法勾选
    this.fruitList.forEach(item =>this.$set(item,'checked',false))
    console.log(this.fruitList,'this.fruitList');
    const sumArr = []//拿到所有的prop
    this.tableHead.forEach(item =>{
      if(item.sumFlag){
        sumArr.push(item.prop)
      }else if(item.weekList){
        item.weekList.forEach(val =>{
          if(val.sumFlag){
            sumArr.push(val.prop)
          }
        })
      }
    })
    const arr = []
    const sumObj = {
      name:'合计'
    }
    this.tbodyList.forEach((item,index) =>{
      item.oderNumber = index + 1
      arr.push(item)
      sumArr.forEach(data =>{
        for(const key in item){
          if(data === key){
            if(sumObj[key]){
              sumObj[key] += Number(item[key])
            }else {
              sumObj[key] = Number(item[key])
            }
          }
        }
      })
    })
    arr.push(sumObj)//添加到数组的后边，如果想添加在表格第一条数据则写：arr.unshift(sumObj)
    this.tableData3 = arr
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
       let checked = this.fruitList.map(item => {
          return item.id;
        });
        this.checkedFruit = val ? checked : [];
        this.isIndeterminate = false;
        console.log(this.checkedFruit,'全选');
      },
      // 单选
      handleCheckedCitiesChange(value,fruit) {
        // if(fruit.type === 'new') this.editFlag = true
        if(value){
          if(this.checkedFruit.indexOf(fruit.id) === -1){
            this.checkedFruit.push(fruit.id)
          }
        }else {
            for(const item2 in this.checkedFruit){
              if(this.checkedFruit[item2].indexOf(fruit.id) > -1){
                this.checkedFruit.splice(this.checkedFruit.indexOf(this.checkedFruit[item2]),1)
              }
            }
        }

        // 当arrTrue长度等于购物车列表的数组的长度时，说明全部选中
        if(this.checkedFruit.length == this.fruitList.length) {
            this.checkAll = true
            this.isIndeterminate = false
        }else {
            this.checkAll = false
            this.isIndeterminate = true
        }

        console.log(this.checkedFruit,'arr');
        // console.log(value,index,fruit,'change');
        // let checkedCount = value.length;
        // this.checkAll = this.checkedFruit === this.fruitList.length;
        // this.isIndeterminate = this.checkedFruit > 0 && this.checkedFruit < this.fruitList.length;
      },
    // 删除
    removeType (item) {
      console.log(item,'delete-item');
      var index = this.otherForm.other.indexOf(item)
      console.log(index,'delete-index');
      if (index !== -1) {
        this.otherForm.other.splice(index, 1)
      }
      this.typeList.forEach(v => {
        if (v.Id === item.type && v.disabled) {
          v.disabled = false
        }
      })
    },
    // 新增
    addType () {
      if (this.otherForm.other.length < this.typeList.length) {
        this.otherForm.other.push({
          type: '',
          key: Date.now()
        })
      }
    },
    changeType (index, Id) {
      console.log(this.otherForm.other,'000');
      this.typeList.forEach(v => {
        v.disabled = false
        for (var i = 0; i < this.otherForm.other.length; i++) {
          if (this.otherForm.other[i].type === v.Id) {
            v.disabled = true
          }
        }
      })
    },
    tableRowClassName({row, rowIndex}) {
      console.log(rowIndex,'rowIndex');
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
    },
        // type:'success'
    messageClick1(){
      // this.$message.Message.close()
      this.$notice.open({
        msg:'这是一条消息提示',
        center:true,
      })
    },
    messageClick2(){
      console.log(Object.prototype,'//////');
      // this.$message.Message.close()
      // debugger
    //  this.$msg.success('官方封装的提示信息')
    const m = this.$msg({
      message:'官方封装的提示信息',
      type:'info',
      duration:0
    })
    setTimeout(() => {
      m.close()
    }, 3000);
    }
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
}
/deep/.el-checkbox{
   width: 185px;
    background: pink;
    .el-checkbox__label{

    }
  }
</style>
