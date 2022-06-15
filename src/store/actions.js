import {
  APIBankInfo,
  APIdonation,
  APIDonationHall,
  APIgetBank,
  APIInfo,
  APIlotteryList, APImail,
  APIVodlist, APIxtNotice
} from '../assets/js/api'
import { Toast } from 'vant'

export const actions = {
  async getIndexAll ({ commit }) {
    const res = await APIlotteryList()
    if (res.data.sign) {
      document.title = res.data.data.web_title
      commit('UPDATEindexAll', res.data.data)
    }
  }, // 首页所有内容
  async getReserveAll ({ commit }) {
    const res = await APIDonationHall()
    if (res.data.sign) {
      commit('UPDATEreserveAll', res.data.data)
    }
  }, // 预约大厅数据
  async getVodList ({ commit }) {
    const res = await APIVodlist()
    if (res.data.sign) {
      commit('UPDATEVodList', res.data.data)
    }
  },
  async getUserInfo ({ commit, state }, obj) {
    if (state.token) {
      const res = await APIInfo()
      if (res.data.sign) {
        if (obj && obj.reload) {
          Toast({
            message: '刷新成功'
          })
        }
        if (obj && obj.time) {
          setTimeout(e => {
            actions.getUserInfo({ commit, state }, { time: 5 })
          }, 5000)
        }
        commit('UPDATEINFO', res.data.data)
      }
    }
  },
  async getDonation ({ commit }, e) {
    const res = await APIdonation(e)
    if (res.data.sign) {
      if (res.data.data.cpinfo.lastopencode) {
        commit('UPDATElastCode', res.data.data.cpinfo.lastopencode)
      } else {
        commit('UPDATElastCode', res.data.data.cpinfo.lastopencode)
        actions.getLastcode({ commit }, e)
      }
      commit('UPDATEdonation', res.data.data)
    }
  },
  async getLastcode ({ commit }, e) {
    const res = await APIdonation(e)
    if (res.data.sign) {
      if (res.data.data.cpinfo.lastopencode) {
        commit('UPDATElastCode', res.data.data.cpinfo.lastopencode)
      } else {
        setTimeout(() => {
          actions.getLastcode({ commit }, e)
        }, 2000)
      }
    }
  },
  async getBanklist ({ commit }) {
    const res = await APIgetBank()
    if (res.data.sign) {
      commit('UPDATEbanklist', res.data.data)
    }
  },
  async getBankInfo ({ commit }) {
    const res = await APIBankInfo()
    if (res.data.sign) {
      commit('UPDATEbankInfo', res.data.data || '未绑定')
    }
  },
  async getUserMsg ({ commit, state }) {
    if (!state.token) {
      return
    }
    const res = await APImail()
    if (res.data.sign) {
      commit('UPDATEusermsg', res.data.data)
    }
  },
  async getNotion ({ commit }) {
    const res = await APIxtNotice()
    if (res.data.sign) {
      commit('UPDATEnotion', res.data.data)
    }
  }
}
