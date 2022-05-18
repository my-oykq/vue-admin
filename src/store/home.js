export const initHomeState = {
  name:''
}
const homeModule = {
  // namespaced: true,

  getters:{},
  // state: {
  //   name:''
  // },
  state:sessionStorage.getItem('state')? JSON.parse(sessionStorage.getItem('state')):JSON.parse(JSON.stringify(initHomeState)),
  mutations: {
    setName(state,name){
      state.name = name
      console.log(state.name,'name');
    }
  },
  actions: {
    getHomeInfo({state,commit}){
      setTimeout(() => {
        commit('setName','张三')
      }, 1000);
    }
  }
}
export default homeModule
