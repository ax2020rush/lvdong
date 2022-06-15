<template>
  <div class="password">
    <van-nav-bar left-arrow @click-right="submit" @click-left="onClickLeft" title="修改登录密码" >
      <template #right>
        <span style="color: #fff">保存</span>
      </template>
    </van-nav-bar>
    <van-cell-group>
      <van-field
        v-model="value"
        @click-right-icon="show=!show"
        :type="show3?'text':'password'"
        :right-icon="show?'closed-eye':'eye-o'"
        placeholder="请输入您的旧密码"
      />
      <van-field
        v-model="value2"
        @click-right-icon="show2=!show2"
        :type="show3?'text':'password'"
        :right-icon="show2?'closed-eye':'eye-o'"
        placeholder="请输入您的新密码"
      />
      <van-field
        v-model="value3"
        :type="show3?'text':'password'"
        @click-right-icon="show3=!show3"
        :right-icon="show3?'closed-eye':'eye-o'"
        placeholder="请再次输入您的新密码"
      />
    </van-cell-group>
  </div>
</template>

<script>
import { onClickLeft, loginOut } from '../../../assets/js'
import { reactive, toRefs } from 'vue'
import { Toast } from 'vant'
import { APImodifyLpassword } from '../../../assets/js/api'
export default {
  name: 'index',
  setup () {
    const data = reactive({
      value: null,
      value2: null,
      value3: null,
      show: false,
      show2: false,
      show3: false
    })
    const methods = {
      onClickLeft,
      async submit () {
        if (!data.value) {
          return Toast({
            message: '请输入旧密码'
          })
        } else if (!data.value2) {
          return Toast({
            message: '请输入新密码'
          })
        } else if (!data.value3) {
          return Toast({
            message: '请再次输入新密码'
          })
        } else if (data.value2 !== data.value3) {
          return Toast({
            message: '新密码两次输入不一致'
          })
        } else if (data.value === data.value2) {
          return Toast({
            message: '新密码与旧密码不能相同'
          })
        } else {
          const res = await APImodifyLpassword({
            jiu_lpassword: data.value,
            new_lpassword: data.value2
          })
          if (res.data.sign) {
            if (res.data.msg === '修改成功') {
              Toast({
                message: res.data.msg + ',请前往重新登录'
              })
              setTimeout(() => (loginOut()), 1000)
              return
            }
            Toast({
              message: res.data.msg
            })
          }
        }
      }
    }
    return {
      ...toRefs(data),
      ...methods
    }
  }
}
</script>

<style scoped lang="scss">
.password {
  width: 100%;
  height: 100%;
  background: $bg;
  .van-cell-group{
    :deep().van-icon{
      font-size: 24px;
      color: #e6c3a1;
    }
  }

}
</style>
