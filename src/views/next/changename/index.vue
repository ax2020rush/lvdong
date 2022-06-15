<template>
  <div class="name">
    <van-nav-bar left-arrow @click-right="submit" @click-left="onClickLeft" title="修改真实姓名" >
      <template #right>
        <span style="color: #fff">保存</span>
      </template>
    </van-nav-bar>
    <van-cell-group>
      <van-field readonly label="旧姓名" v-model="des" />
      <van-field v-model="value" label="新姓名" placeholder="请输入新姓名" />
    </van-cell-group>
    <p>为了您账户安全,真实姓名需要与绑定银行卡姓名一致</p>
  </div>
</template>

<script>
import { onClickLeft } from '../../../assets/js'
import { computed, reactive, toRefs } from 'vue'
import { APImodifyinfo } from '../../../assets/js/api'
import { Toast } from 'vant'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'index',
  setup () {
    const { state, dispatch } = useStore()
    const { push } = useRouter()
    const data = reactive({
      value: null,
      des: computed(e => state.userInfo && state.userInfo.name),
      mobile: computed(e => state.userInfo && state.userInfo.mobile)
    })
    const methods = {
      onClickLeft,
      async submit () {
        if (!data.value) {
          return Toast({
            message: '请输入修改的内容'
          })
        }
        const res = await APImodifyinfo({
          name: data.value,
          mobile: data.mobile
        })
        if (res.data.sign) {
          Toast({
            message: res.data.msg
          })
          dispatch('getUserInfo')
          push('/info')
        }
      }
    }
    return {
      ...methods,
      ...toRefs(data)
    }
  }
}
</script>

<style scoped lang="scss">
.name{
  width: 100%;
  height: 100%;
  background: $bg;
  >p{
    color: #dc2037;
    font-size: 24px;
    padding: 30px 0;
  }
}
</style>
