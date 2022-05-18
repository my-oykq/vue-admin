
const detailsModule = {
  // namespaced: true,
  getters:{},
  state: {
    detailInfo:''
  },
  mutations: {
    setDetailInfo(state,name){
      state.detailInfo = name
      console.log(state.detailInfo,'detailInfo');
    }
  },
  actions: {
    getDetailInfoInfo({state,commit}){
      setTimeout(() => {
        commit('setDetailInfo','购物车详情')
      }, 1000);
    }
  }
}
export default detailsModule
