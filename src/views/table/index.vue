<template>
<div>
  <div style="margin-bottom:20px">
    <el-button :disabled="isStop" type="primary">停止</el-button>
    <el-button :disabled="isStartUp" type="primary">启动</el-button>
  </div>
  <el-table
    v-loading="loading"
    :data="tableData"
    row-key="id"
    style="width: 100%"
     @selection-change="handleSelectionChange">
     <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      type="index"
      width="55">
    </el-table-column>
    <el-table-column
      label="日期"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="姓名"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.name }}</p>
          <p>住址: {{ scope.row.address }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column prop="state" label="状态">
        <template slot-scope="scope">
            <!-- <i class="el-icon-time"></i> -->
            <!-- 01:启动状态 ，00：初始化状态，02：未启动-->
            <span v-if="scope.row.state == '01'" style="margin-left: 10px">启动</span>
            <span v-else-if="scope.row.state == '02'" style="margin-left: 10px">未启动</span>
            <span v-else-if="scope.row.state == '00'" style="margin-left: 10px">初始状态</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          v-permission="{action: 'edit', effect: 'disabled'}"
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          v-permission="{action: 'delete', effect: 'disabled'}"
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-table
    :data="tableData2"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <div>{{props.row.name}}</div>
      </template>
    </el-table-column>
    <el-table-column
      label=""
      prop="id">
    </el-table-column>
    <el-table-column
      label=""
      prop="name">
      <template slot-scope="scope">
        <el-button
          v-permission="{action: 'edit', effect: 'disabled'}"
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          v-permission="{action: 'delete', effect: 'disabled'}"
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <h2>动态表格和表头合并</h2>
    <el-table
      :data="tableData4"
      border
      height="400px"
      max-height="400px"
      size="small"
      row-class-name="row"
      cell-class-name="column"
      :header-cell-style="headerStyle"
      :highlight-current-row="true"
      fit
    >
      <el-table-column
        v-for="(item, index) in tableLabel"
        :key="index"
        :prop="item.prop"
        :min-width="item.width"
        :label="item.label"
        show-overflow-tooltip
        align="center"
      >
        <el-table-column
          v-for="(itemchildren, indexchildren) in item.list"
          :key="indexchildren"
          :prop="itemchildren.prop"
          :min-width="itemchildren.width"
          :label="itemchildren.label"
          show-overflow-tooltip
          align="center"
        >
          <el-table-column
            v-for="(itemchildrenson, indexchildrenson) in itemchildren.list"
            :key="indexchildrenson"
            :prop="itemchildrenson.prop"
            :min-width="itemchildrenson.width"
            :label="itemchildrenson.label"
            show-overflow-tooltip
            align="center"
          >
          </el-table-column>
        </el-table-column>
      </el-table-column>
    </el-table>
  <!-- <formValidate/> -->
  <dynamicIP/>
</div>

</template>

<script>
import { getTableData, deleteTableData } from '@/api/table'
import formValidate from './componnts/formValidate.vue'
import dynamicIP from './componnts/dynamicIP.vue'
import Sortable from 'sortablejs'
import { mapState } from 'vuex'
export default {
  name: 'TableIndex',
  components: {formValidate, dynamicIP},
  props: {},
  data () {

    return {
      ruleForm:{
        email:''
      },
      ipForm:{
        ip1:'172',
        ip2:'0',
        ip3:'1',
        ip4:'3',
      },
      errorIpMsg:'',
      rules:{
        email:[{ validator: this.checkEmail, trigger: 'blur' }]
      },
      multipleSelection:[],
      isStop:false,
      isStartUp:false,
      tableData: [

      ],
      // restaurants: [
      //   { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
      // ],
      loading: true,
      state1: '',
      newArr:[],
      isInput:false,
      isButton:true,
      blurPassVal:false,
       tableData2: [{
          id: '存款保险接入说明合辑',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '存款保险接入说明合辑',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '存款保险接入说明合辑',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '存款保险接入说明合辑',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }],

        tableLabel: [
        {
          label:'省行',
          prop:'provice'
        },
        {
          label: "大标题",
          list: [
            {
              label: "二标题",
              list: [
                { label: "业务1", prop: "sale" },
                { label: "业务2", prop: "const" },
                { label: "业务3", prop: "profit" },
              ],
            },
          ],
        },
        {
          label: "销售量1",
          list: [
            { label: "内容1", list: [{ label: "内容1", prop: "sale1" }] },
            { label: "内容2", list: [{ label: "内容2", prop: "sale1" }] },
          ],
        },
        {
          label: "销售量22",
          list: [
            { label: "内容1", list: [{ label: "内容1", prop: "sale2" }] },
            { label: "内容2", list: [{ label: "内容2", prop: "sale2" }] },
          ],
        },
      ],
      tableData4: [
        { id: 1, provice:'石家庄',sale:'11',const:102203.71,date: "2018-07-24", profit: 35394.05 },
        { id: 2, provice:'石家庄',const: 102203.71, profit: 35394.05 },
      ],
    }
  },
  computed: {
    ...mapState(['restaurants']),
    newX(){
      var arry = []
      var obj = {}
      this.restaurants.map(item =>{
        let data = item.value;
        if(!obj[data]){
          arry.push(item)
          obj[data] = true;
        }
      })
      return arry;

    }

  },
  watch: {},
  created () {
    const data = {
      a:null,
      name:null,
      age:null,
      b:1,
      c:{},
      d:[],
      e:undefined,
      f:''
    }
    data.name = data.name === null ?   '' : data.name
    data.age = data.age ? data.age: ''
    console.log(data,'转换后的');
  },
  mounted () {
    this.newArr = this.restaurants
    getTableData().then(res => {
      this.tableData = res.data
      this.loading = false
    })
    this.rowDrop()
  },
  methods: {
    headerStyle({ row, rowIndex }) {
      if (rowIndex == 0) {  // 把第1行的第2、3列变为占两行高度的表格
        row[1].rowSpan = 2;
        row[2].rowSpan = 2;
        row[3].rowSpan = 2;
      }
      if (rowIndex == 1) { // 第2行的原本第2行的1、2、3、4列高度变成0
        row[1].rowSpan = 0;
        row[2].rowSpan = 0;
        row[3].rowSpan = 0;
        row[4].rowSpan = 0;
      }
    },
    checkEmail(rule, value, callback){
      const reg = /^[a-zA-Z0-9.]{0.}$/
        // if(this.blurPass){
          if (value === '') {
            callback(new Error('请输入邮箱'));
          }else if(!reg.test(value)){
            callback(new Error('请输入正确的邮箱'));
          }
           else {
            callback();
            console.log(111);
          // if(this.isButton)this.getCheckParam()

          }
        // }
    },
    submit(){

    },
    getCheckParam(){
      console.log('item失去焦点事件');
    },
    sendEmail(){
      this.blurPass = true
      // this.$refs.input.focus()
      this.$refs.ruleForm.validateField(['email'],(Error) =>{
        if(!Error){
          // 通过
          // this.isButton = false
          // console.log('通过！！');
          // if(this.isButton)this.getCheckParam()
          // this.isButton = true
        }else {
          return false
        }
      })
    },
    //行拖拽
    rowDrop() {
      const tbody = document.querySelector('.el-table__body-wrapper tbody')
      const _this = this
      Sortable.create(tbody, {
        onEnd({ newIndex, oldIndex }) {
          const currRow = _this.tableData.splice(oldIndex, 1)[0]
          _this.tableData.splice(newIndex, 0, currRow)
        }
      })
    },

    handleSelectionChange(val) {
      console.log(val);
      this.isStartUp = true
      this.isStop = true
      val.forEach(item =>{
        console.log(item);
        if(item.state == '01'){
          // this.isStartUp = true
          this.isStop = false
        }else if(item.state == '00' || item.state == '02'){
          this.isStartUp = false
          // this.isStop = false
        }
      })
      if(val.length == 0){
        this.isStartUp = false
        this.isStop = false
      }
        this.multipleSelection = val;
      },

    handleClick(){
      console.log(1);
      let info = {
        value:this.state1
      }
        this.$store.commit('restaurants', info)
      // console.log(this.restaurants);
    },
    handleSelect(item) {
        console.log(item);
      },
    querySearch(queryString, cb) {
        this.state1 = queryString;
        var restaurants = this.newX;
        // var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(restaurants);
      },

      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
    handleEdit (index, row) {
      console.log(index, row)
      // 点击按钮可进行拖拽
      this.rowDrop()
    },
    handleDelete (index, row) {
      console.log(index, row)
      deleteTableData().then(res => {
        console.log(res)
        this.$message.success('删除成功')
      })
    }
  }
}
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
