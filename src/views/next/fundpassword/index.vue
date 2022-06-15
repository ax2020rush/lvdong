<template>
<div class="fundpas">
  <van-nav-bar left-arrow  @click-left="onClickLeft" title='修改资金密码' />
  <div class="ipt">
    <p>请输入旧的资金密码</p>
    <!-- 密码输入框 -->
    <van-password-input
      :value="value"
      :focused="showKeyboard"
      @focus="showKeyboard = true,(showKeyboard3=false,showKeyboard2=false)"
    />
    <!-- 数字键盘 -->
    <van-number-keyboard
      v-model="value"
      :show="showKeyboard"
      @blur="showKeyboard = false"
    />
  </div>
  <div class="ipt">
    <p>请输入新的资金密码</p>
    <!-- 密码输入框 -->
    <van-password-input
      :value="value2"
      :focused="showKeyboard2"
      @focus="showKeyboard2 = true,(showKeyboard=false,showKeyboard3=false)"
    />
    <!-- 数字键盘 -->
    <van-number-keyboard
      v-model="value2"
      :show="showKeyboard2"
      @blur="showKeyboard2 = false"
    />
  </div>
  <div class="ipt">
    <p>再次输入新的资金密码</p>
    <!-- 密码输入框 -->
    <van-password-input
      :value="value3"
      :focused="showKeyboard3"
      @focus="showKeyboard3 = true,(showKeyboard=false,showKeyboard2=false)"
    />
    <!-- 数字键盘 -->
    <van-number-keyboard
      v-model="value3"
      :show="showKeyboard3"
      @blur="showKeyboard3 = false"
    />
  </div>
  <div class="btn">
    <a :class="{active:active}" @click="submit">完成</a>
  </div>
</div>
</template>

<script>
import { onClickLeft } from '../../../assets/js'
import { computed, reactive, toRefs } from 'vue'
import { Toast } from 'vant'
import { APImodifyTpassword } from '../../../assets/js/api'
import { useRouter } from 'vue-router'

export default {
  name: 'index',
  setup () {
    const { push } = useRouter()
    const data = reactive({
      value: '',
      showKeyboard: false,
      value2: '',
      showKeyboard2: false,
      value3: '',
      showKeyboard3: false
    })
    data.active = computed(e => (data.value.length === 6 && data.value2.length === 6 && data.value3.length === 6))
    const methods = {
      onClickLeft,
      async submit () {
        if (!data.value) {
          return Toast({
            message: '请输入旧交易密码'
          })
        } else if (!data.value2) {
          return Toast({
            message: '请输入新交易密码'
          })
        } else if (!data.value3) {
          return Toast({
            message: '请确认新交易密码'
          })
        } else if (data.value2 !== data.value3) {
          return Toast({
            message: '新密码输入不一致'
          })
        }
        if (data.active) {
          const res = await APImodifyTpassword({
            jiu_tpassword: data.value,
            new_tpassword: data.value3
          })
          if (res.data.sign) {
            Toast.success(res.data.msg)
            push('/setting')
          } else {
            Toast({
              message: res.data.msg
            })
          }
        } else {
          const res = await APImodifyTpassword({
            jiu_tpassword: data.value,
            new_tpassword: data.value3
          })
          if (res.data.sign) {
            Toast.success(res.data.msg)
            push('/setting')
          } else {
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
.fundpas{
  width: 100%;
  height: 100%;
  .btn{
    width: 90%;
    margin: 60px auto 0;
    display: flex;
    justify-content: center;
    align-items: center;
    a{
      width: 80%;
      color: #fff;
      background: #cacaca;
      border-radius: 100px;
      padding: 20px 0;
      &.active{
        background: linear-gradient(270deg,#e6c3a1,#7e5678);
      }
    }
  }
  .ipt{
    p{
      padding: 30px 0;
    }

    :deep().van-password-input__item--focus{
      animation: moves .2s;
      background: rgba(229,229, 229,.35);
      @keyframes moves {
        0%{}
        50%{}
        100%{}
      }
    }
  }
}
</style>
