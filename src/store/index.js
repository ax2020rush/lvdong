import { createStore } from 'vuex'
import { state } from './state'
import { actions } from './actions'
import { getters } from './getters'
import { mutations } from './mutations'
import createLogger from 'vuex-persistedstate'

export default createStore({
  state,
  mutations,
  actions,
  getters,
  plugins: [
    createLogger({
      storage: localStorage,
      reducer (state) {
        return {
          // 需要储存的state值
          token: state.token,
          indexAll: state.indexAll,
          reserveAll: state.reserveAll,
          VodList: state.VodList,
          userInfo: state.userInfo,
          banklist: state.banklist
        }
      }
    })
  ]

})
