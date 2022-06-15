// mutations的方法请用UP开头全大写方式
export const mutations = {
  UPDATETOKEN (state, res) {
    state.token = res
  },
  UPDATEindexAll (state, res) {
    state.indexAll = res
  },
  UPDATEreserveAll (state, res) {
    state.reserveAll = res
  },
  UPDATEVodList (state, res) {
    state.VodList = res
  },
  UPDATEINFO (state, res) {
    state.userInfo = res
  },
  UPDATEdonation (state, res) {
    state.donation = res
  },
  UPDATElastCode (state, res) {
    state.lastCode = res
  },
  UPDATEbanklist (state, res) {
    state.banklist = res
  },
  UPDATEbankInfo (state, res) {
    state.bankInfo = res
  },
  UPDATEusermsg (state, res) {
    state.usermsg = res
  },
  UPDATEnotion (state, res) {
    state.notion = res
  },
  UPDATEsystu (state, res) {
    state.systu = res
  }
}
