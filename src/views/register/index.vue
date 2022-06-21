<template>
  <div class="register">
    <van-nav-bar
      left-arrow
      @click-left="onClickLeft"
    />
    <img src="../../assets/img/logo.png" alt="">
    <div class="title">
      注册
    </div>
    <form>
      <div class="ipt">
        <input v-model="sub.account" type="text" placeholder="请输入用户名">
      </div>
      <div class="ipt">
        <input autocomplete v-model="sub.password" :type="cheket?'password':'text'" placeholder="请输入登录密码">
        <van-icon size="20" color="#979799" @click="cheket=!cheket" :name="cheket?'closed-eye':'eye-o'"/>
      </div>
      <div class="ipt">
        <input autocomplete v-model="sub.transaction_password" :type="cheket?'password':'text'" placeholder="请输入交易密码">
        <van-icon size="20" color="#979799" @click="cheket=!cheket" :name="cheket?'closed-eye':'eye-o'"/>
      </div>
      <div v-if="false" class="ipt">
        <input v-model="sub.mobile" type="number" placeholder="请输入手机号">
      </div>
      <div class="ipt">
        <input v-model="sub.invitation_code" :readonly="$route.query.uid?true:false" type="text" @input="sub.invitation_code=sub.invitation_code.replace(/[\W]/g,'')" placeholder="请输入邀请码(没有则不填)">
      </div>
      <div class="ipt" v-if="ptcode">
        <input v-model="sub.ptcode"  type="text" @input="sub.invitation_code=sub.invitation_code.replace(/[\W]/g,'')" placeholder="请输入安全码">
      </div>
    </form>

    <div class="res">
      <van-checkbox icon-size="16px" checked-color="#7E5678" v-model="checked"></van-checkbox><a href="#/agree">我已经知晓并同意"开户协议"各项条约</a>
    </div>
    <div @click="active&&submit()" class="btn" :class="{active:active}">
      注册
    </div>
  </div>
</template>

<script>
import { onClickLeft } from '../../assets/js'
import { computed, reactive, toRefs, watch } from 'vue'
import { APIcpbuy } from '../../assets/js/api'
import { Toast } from 'vant'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'index',
  setup () {
    // vuex
    const { commit, state } = useStore()
    // router
    const { push } = useRouter()
    const { query } = useRoute()
    // data
    const data = reactive({
      ptcode: computed(e => state.indexAll && state.indexAll.ptcode_status),
      sub: {
        account: null,
        password: null,
        invitation_code: query.uid || '',
        transaction_password: null,
        mobile: 13888888888,
        ptcode: null
      },
      cheket: true,
      active: false,
      checked: true
    })
    // 监听
    watch(() => (data.sub), (val) => {
      if (val.password && val.account && val.transaction_password) {
        data.active = true
      } else {
        data.active = false
      }
    }, {
      deep: true,
      immediate: true
    })
    // 方法
    const methods = {
      onClickLeft,
      async submit () {
        if (!data.checked) {
          return Toast({
            type: 'fail',
            message: '请点击同意用户协议'
          })
        }
        if (data.ptcode === 0) {
          delete data.sub.ptcode
        }
        const res = await APIcpbuy(data.sub)
        if (res.data.sign) {
          Toast.success('注册成功，正在跳转首页')
          commit('UPDATETOKEN', res.data.data.access_token)
          setTimeout(e => {
            push('/')
          }, 1000)
        } else {
          Toast.fail(res.data.msg)
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
.register {
  width: 100%;
  height: 100%;
  background: url("../../assets/img/login-bg.png") no-repeat center/100% 100%, $gbcolor;
  padding-bottom: 100px;

  > img {
    width: 300px;
  }

  .title {
    font-size: 35px;
    color: #fff;
    font-weight: 600;
    padding: 50px 0;
  }

  .ipt {
    width: 90%;
    height: 90px;
    margin: 30px auto;
    border-radius: 100px;
    overflow: hidden;
    background: #fff;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 40px;

    input {
      flex: 1;
      height: 100%;
      border: none;
      background: none;
      outline: none;
      text-align: center;
      font-size: 28px;

      &::placeholder {
        font-size: 30px;
      }
    }
  }

  .forget {
    width: 100%;
    text-align: right;
    padding: 0 40px;

    a {
      color: #fff;
      font-size: 24px;
    }
  }

  .res {
    width: 100%;
    padding: 0 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      color: #fff;
      font-size: 24px;
      margin-left: 10px;
    }

  }

  .btn {
    width: 90%;
    margin: 50px auto;
    background: #cacacc;
    height: 88px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    border-radius: 100px;
    font-size: 32px;

    &.active {
      background: #7e5678;
    }
  }

  .van-nav-bar {
    background: none;

    :deep() .van-icon {
      color: #fff;
    }
  }

  .van-hairline--bottom:after {
    border-width: 0px;
  }
}
</style>
