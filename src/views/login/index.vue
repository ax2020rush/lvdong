<template>
  <div class="login">
    <van-nav-bar
      left-arrow
      @click-left="onClickLeft"
    />
    <img src="../../assets/img/logo.png" alt="">
    <div class="title">
      登录
    </div>
    <form>
      <div class="ipt">
        <input v-model="sub.username" type="text" placeholder="请输入用户名">
      </div>
      <div class="ipt">
        <input autocomplete v-model="sub.password" :type="cheket?'password':'text'" placeholder="请输入登录密码">
        <van-icon size="20" color="#979799" @click="cheket=!cheket" :name="cheket?'closed-eye':'eye-o'"/>
      </div>
    </form>
    <div class="forget">
<!--      <a href="">忘记密码</a>-->
    </div>
    <div class="res">
      <a href="#/res">没有账号？马上注册</a>
    </div>
    <div class="btn" @click="submit()" :class="{active:active}">
      登录
    </div>
  </div>
</template>

<script>
import { onClickLeft } from '../../assets/js'
import { reactive, toRefs, watch } from 'vue'
import { APIlogin } from '../../assets/js/api'
import { Toast } from 'vant/lib/'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'index',
  setup () {
    // vuex
    const { commit } = useStore()
    // router
    const { push } = useRouter()
    // data
    const data = reactive({
      sub: {
        username: null,
        password: null
      },
      cheket: true,
      active: false
    })
    // 监听
    watch(() => (data.sub), (val) => {
      if (val.password && val.username) {
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
        const obj = {
          account: data.sub.username, // 账号
          password: data.sub.password // 密码
        }
        const res = await APIlogin(obj)
        if (res.data.sign) {
          Toast.success('登录成功')
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
.login {
  width: 100%;
  height: 100%;
  background: url("../../assets/img/login-bg.png") no-repeat center/100% 100%, $gbcolor;

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

    a {
      color: #fff;
      font-size: 28px;
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
      background: $btn;
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
