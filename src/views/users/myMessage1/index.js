import Vue from 'vue'
import MyMessage from './MyMessage.vue'
// 官网的例子连续点击好几个的话几个会有一段距离的，所以弄一个变量来存储组件实例
const instances = []
const Message =  Vue.extend(MyMessage)//构建一个message的组件实例
function open(options = {}){
  console.log(options,'=======');
 const instance =  new Message({//创建实例化对象，两个参数节点el和要传的参数
   el:document.createElement('div'),
   propsData:options // 通过props给组件传参数，也可编写：data：options，在组件的data定义msg变量
 })
 instance.visible = true
//  动态放到dom树上
  document.body.appendChild(instance.$el)
  // console.log(instance,'instance');
  // 设置出现叠加时的位置
  let messageTop = 20 //获取传入的据顶端的偏移量，默认为20
  instances.forEach(item =>{
    messageTop += item.$el.offsetHeight + 16 //根据偏移量叠加
  })
  instance.top = messageTop
  //  console.log(instance);
  instances.push(instance)
  return instance
}
export default{
  open:(options = {}) =>{
    return open(options)
  },
  // typeFun:
  success:(options) =>{
    const _options = Object.assign({}, options, {type:'el-icon-success'})
    return open(_options)
    // console.log(options);
  }
}
