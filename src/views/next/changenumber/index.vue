<template>
  <div class="name">
    <van-nav-bar left-arrow @click-right="submit" @click-left="onClickLeft" title="修改手机号" >
      <template #right>
        <span style="color: #fff">保存</span>
      </template>
    </van-nav-bar>
    <van-cell-group>
      <van-field readonly label="旧手机号" v-model="des" />
      <van-field v-model="value" label="新手机号" placeholder="请输入新手机号" />
    </van-cell-group>
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
      des: computed(e => state.userInfo && state.userInfo.mobile),
      name: computed(e => state.userInfo && state.userInfo.name)
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
          name: data.name,
          mobile: data.value
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
