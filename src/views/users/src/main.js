import Vue from 'vue';
import Main from './main.vue';
import { PopupManager } from 'element-ui/src/utils/popup';
import { isVNode } from './utils/vdom';
import { isObject } from './utils/types';
let MessageConstructor = Vue.extend(Main);
let instance;
let instances = [];
let seed = 1;
const Message = function(options) {
  // debugger
  console.log(options,'00000');
  if (Vue.prototype.$isServer) return;
  options = options || {};
  if (typeof options === 'string') {
    options = {
      message: options
    };
  }
  let userOnClose = options.onClose;
  let id = 'message_' + seed++;
console.log(options,'弹窗消失时');
// 给options添加onclose方法，在弹窗多少秒关闭弹窗触发的方法
  options.onClose = function() {
    // debugger
    Message.close(id, userOnClose);
  };
  // 创建message实例
  instance = new MessageConstructor({
    data: options //这里的options会覆盖组件中的data
  });
  // console.log(instance,'9999999');
  instance.id = id;
  if (isVNode(instance.message)) {
    instance.$slots.default = [instance.message];
    instance.message = null;
  }
  instance.$mount();
  document.body.appendChild(instance.$el);
  let verticalOffset = options.offset || 20;
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16;
  });
  instance.verticalOffset = verticalOffset;
  instance.visible = true;
  instance.$el.style.zIndex = PopupManager.nextZIndex();
  instances.push(instance);
  console.log(instances,'========');
  return instance;
};
// 如果是this.$msg.success('提示信息')才会触发以下的放法
['success', 'warning', 'info', 'error'].forEach(type => {
  Message[type] = (options) => {
    // console.log(isObject({}),'====');
    if (isObject(options) && !isVNode(options)) {
      return Message({
        ...options,
        type
      });
    }
    return Message({
      type,
      message: options
    });
  };
});
// debugger
// 当消息弹窗消失时触发的方法
Message.close = function(id, userOnClose) {
  console.log(instances,'instances');
  // console.log(id,userOnClose,'=====');
  let len = instances.length;
  console.log(len,'len');
  let index = -1;
  let removedHeight;
  for (let i = 0; i < len; i++) {
    console.log(instances[i],'instances[i].id');
    if (id === instances[i].id) {
      removedHeight = instances[i].$el.offsetHeight;
      index = i;
      if (typeof userOnClose === 'function') {
        userOnClose(instances[i]);
      }
      instances.splice(i, 1);
      break;
    }
  }
  if (len <= 1 || index === -1 || index > instances.length - 1) return;
  for (let i = index; i < len - 1 ; i++) {
    let dom = instances[i].$el;
    dom.style['top'] =
      parseInt(dom.style['top'], 10) - removedHeight - 16 + 'px';
  }
};

Message.closeAll = function() {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close();
  }
};

export default Message;
