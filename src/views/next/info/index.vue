<template>
  <div class="info">
    <van-nav-bar left-arrow @click-left="onClickLeft" title="基本信息" />
    <van-cell-group>
      <van-cell @click="$toast({message:'账户名不能修改'})" title="账户名" :value="info.account" is-link></van-cell>
      <van-cell to="/changename" title="真实姓名" :value="info.name" is-link></van-cell>
      <van-cell title="绑定银行卡号" :value="bankInfo" @click="$router.push('/bind')" is-link></van-cell>
      <van-cell to="/changenumber" title="手机号码" :value="info.mobile" is-link></van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { onClickLeft } from '../../../assets/js'
import { useStore } from 'vuex'
import { computed, reactive, toRefs } from 'vue'

export default {
  name: 'index',
  setup () {
    const { state, dispatch } = useStore()
    dispatch('getUserInfo')
    dispatch('getBankInfo')
    const data = reactive({
      info: computed(e => state.userInfo),
      bankInfo: computed(e => (state.bankInfo && state.bankInfo.banknumber) || '未绑定')
    })
    const methods = {
      onClickLeft
    }
    return {
      ...methods,
      ...toRefs(data)
    }
  }
}
</script>

<style scoped lang="scss">
.info{
  width: 100%;
  height: 100%;
  background: $bg;
}

</style>
