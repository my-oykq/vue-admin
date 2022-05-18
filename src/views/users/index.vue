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
     <div>
       <h2>动态表头和表体信息,并且添加总的合计</h2>
        <el-table style="width: 100%" border :data="tableData3">
          <el-table-column v-for="(item,index) in tableHead" :prop="item.prop" :label="item.label"  :key="index">
            <div v-if="item.weekList">
              <el-table-column v-for="(item2,index2) in item.weekList" :prop="item2.prop" :label="item2.label"  :key="index2">
              </el-table-column>
            </div>
          </el-table-column>
        </el-table>
      </div>
      <div>
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
      </div>
      <!-- 配置信息 -->
      <div>
        <span>配置信息：</span>
        <envCheckbox
        :configData="config"
        :type="1"
        @handleCheckAllChange="handleCheckAllChange"
        @changeCheck="changeCheck"/>
        <!-- <newText :type="1"
        :checkAll="checkAll"
        :isIndeterminate="isIndeterminate"
        :checkboxList="fruitList"
        :dialogVisible="dialogVisible2"
        @visibleDialog="visibleDialog"
        @addConfigInfo="addConfigInfo"
        @handleCheckAllChange="handleCheckAllChange"
        @changeCheck="changeCheck"
        /> -->
      </div>
      <!-- ip信息 -->
      <div>
        <span>IP信息：</span>
        <envCheckbox
        :configData="ipObj"
        :type="2"
        @chaneCheckAllIp="chaneCheckAllIp"
        @changeCheckIp="changeCheckIp"/>
        <!-- <newText :type="2"
        :checkboxList="ipList"
        :checkAll="checkAllIp"
        :isIndeterminate="isIndeterminateIp"
        :dialogVisible="dialogVisible2"
        @addIpInfo="addIpInfo"
        @chaneCheckAllIp="chaneCheckAllIp"
        @changeCheckIp="changeCheckIp"/> -->
      </div>
    </div>
  </div>
</template>

<script>
import pdf from "vue-pdf";
import newText from './component/text.vue'
import envCheckbox from './component/envCheckbox.vue'
import message2 from "element-ui/packages/message/src/main.vue";
export default {
  name: "UserIndex",
  components: { pdf,message2,newText,envCheckbox},
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
        checkAllIp:false,
        checkAll: false,
        isIndeterminate: false,
        isIndeterminateIp: false,
        checkedFruit: [],
        checkIpList:[],
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
        ipList:[
          {
            name:'Web系统IP',
            id:'0'
          },
          {
            name:'TongLink(TLQ)主IP',
            id:'1'
          },
          {
            name:'TongLink(TLQ)备IP',
            id:'2'
          },
        ],
        config:{
          chekedStatus:false,
          isIndeterminate:false,
          list:[
            {
              name:'西瓜',
              type:'old',
              id:'00',
              isEdit:false,
              chekedStatus:false,
            },
            {
              name:'哈密瓜',
              type:'old',
              id:'01',
              isEdit:false,
              hasEdit:true,
              chekedStatus:false,
            },
            {
              name:'南瓜',
              type:'old',
              id:'02',
              isEdit:false,
              chekedStatus:false,
            },
            {
              name:'冬瓜',
              type:'old',
              id:'03',
              isEdit:false,
              chekedStatus:false,
            },
            {
              name:'自定义项',
              type:'new',
              id:'04',
              isEdit:false,
              chekedStatus:false,
            },
          ]
        },
        ipObj:{
          chekedStatus:false,
          isIndeterminate:false,
          list:[
            {
              name:'Web系统IP',
              id:'0',
              chekedStatus:false,
            },
            {
              name:'TongLink(TLQ)主IP',
              id:'1',
              chekedStatus:false,
            },
            {
              name:'TongLink(TLQ)备IP',
              id:'2',
              chekedStatus:false,
            },
          ]
        },
        configArr:[],
        ipArr:[]
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    const obj = null
    if(obj){
      console.log('111');
    }else {
      console.log('222');
    }
    // this.configList.push({
    //   chekedStatus:false,
    //   isIndeterminate:false,
    //    list:this.fruitList
    // })
    // this.iplist.push({
    //   chekedStatus:false,
    //   isIndeterminate:false,
    //    list:this.ipList
    // })
    console.log(this.config,'9999');
    this.getSum()

  },
  methods: {
    // 根据后台返回的数据动态展示及向表格前边添加合计
    getSum(){
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
    singleChoice(){

    },
    visibleDialog(){
      this.dialogVisible2 = true
    },
    addIpInfo(data){
      console.log(data,'add-data');
    },
    addConfigInfo(data){
      this.id++
      this.fruitList.push({
        type:'new',
        name:data.name,
        id:'0' + this.id,
        isEdit: false
      })
      // this.editFlag = false
      this.dialogVisible2 = false
      if(this.checkedFruit.length > 0) this.isIndeterminate = this.checkedFruit.length === this.fruitList.length ? false : true;
      // console.log(this.fruitList,this.checkedFruit,'add');
    },
    // ip全选
    chaneCheckAllIp(val){
      if(val){
          this.ipObj.list.forEach(item =>{
            item.chekedStatus = true
            if(this.ipArr.indexOf(item.id) === -1)this.ipArr.push(item.id)
          })
        }else{
            this.ipArr = []
            this.ipObj.isIndeterminate = false
            this.ipObj.list.forEach(item =>item.chekedStatus = false)
        }
        console.log(this.ipObj.list,'list');
        console.log(val,this.ipArr,'ip信息全选');
    },
    // 全选--配置信息
      handleCheckAllChange(val) {
        /**
         * 所有复选框都勾选那么全选按钮就勾中，否则是启用isIndeterminate(所有复选框的数量个整个数组的数量比)
         */
        if(val){
          this.config.list.forEach(item =>{
            item.chekedStatus = true
            if(this.configArr.indexOf(item.id) === -1)this.configArr.push(item.id)
          })
        }else{
            this.configArr = []
            this.config.isIndeterminate = false
            this.config.list.forEach(item =>item.chekedStatus = false)
        }
        console.log(this.config.list,'list');
        console.log(val,this.configArr,'配置信息全选');
      },
      // 单选--配置信息
      changeCheck(val,item) {
        if(val){
            if(this.configArr.indexOf(item.id) === -1){
            this.configArr.push(item.id)
          }
        }else {
           for(const item2 in this.configArr){
              if(this.configArr[item2].indexOf(item.id) > -1){
                this.configArr.splice(this.configArr.indexOf(this.configArr[item2]),1)
              }
            }
        }
        if(this.configArr.length === this.config.list.length) {
            this.config.chekedStatus = true
            this.config.isIndeterminate = false
        }else if(this.configArr.length === 0){
          this.config.chekedStatus = false
          this.config.isIndeterminate = false
        }else {
          this.config.chekedStatus = false
          this.config.isIndeterminate = true
        }

      },
      changeCheckIp(val,item){
        if(val){
            if(this.ipArr.indexOf(item.id) === -1){
            this.ipArr.push(item.id)
          }
        }else {
           for(const item2 in this.ipArr){
              if(this.ipArr[item2].indexOf(item.id) > -1){
                this.ipArr.splice(this.ipArr.indexOf(this.ipArr[item2]),1)
              }
            }
        }
        if(this.ipArr.length === this.ipObj.list.length) {
            this.ipObj.chekedStatus = true
            this.ipObj.isIndeterminate = false
            // 判断如果选中的数量为0那么isIndeterminate为false
        }else if(this.ipArr.length === 0){
          this.ipObj.chekedStatus = false
          this.ipObj.isIndeterminate = false
        }else {
          this.ipObj.chekedStatus = false
          this.ipObj.isIndeterminate = true
        }
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
