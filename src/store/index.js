import Vue from 'vue'
import Vuex from 'vuex'
import home from './home'
import details from './details'

Vue.use(Vuex)
export const initState = {
  role: sessionStorage.getItem('role'),
  rightList: JSON.parse(sessionStorage.getItem('rightList') || '[]'),
  username: sessionStorage.getItem('username'),
  photo: sessionStorage.getItem('photo'),
  restaurants: [],
  obj:{},
  homeInfo:''
}
export default new Vuex.Store({
  // state: {
  //   role: sessionStorage.getItem('role'),
  //   rightList: JSON.parse(sessionStorage.getItem('rightList') || '[]'),
  //   username: sessionStorage.getItem('username'),
  //   photo: sessionStorage.getItem('photo'),
  //   restaurants: [],
  //   obj:{}
  // },
  state:sessionStorage.getItem('state')? JSON.parse(sessionStorage.getItem('state')):JSON.parse(JSON.stringify(initState)),
  mutations: {
    setHomeInfo(state,info){
      state.homeInfo = info
      console.log(state.homeInfo,'vuex');
    },
    setRole (state, data) {
      state.role = data
      sessionStorage.setItem('role', data)
    },
    setRightList (state, data) {
      state.rightList = data
      sessionStorage.setItem('rightList', JSON.stringify(data))
    },
    setUsername (state, data) {
      state.username = data
      sessionStorage.setItem('username', data)
    },
    setPhoto (state, data) {
      state.photo = data
      sessionStorage.setItem('photo', data)
    },

    restaurants(state, info){

    state.restaurants.push(info);
    console.log(state.restaurants);

    }
  },
  actions: {},
  getters: {},
  modules: {
    home,
    details
  }
})
