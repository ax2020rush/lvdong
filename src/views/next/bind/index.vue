<template>
  <div class="bind">
    <van-nav-bar left-arrow @click-left="$router.push('/mine')" title="绑定银行卡"/>
    <van-cell-group v-if="bankInfo==='未绑定'">
      <van-cell v-if="binklist">
        <van-dropdown-menu>
          <van-dropdown-item v-model="value" :options="binklist"/>
        </van-dropdown-menu>
        <p>请选择银行卡</p>
      </van-cell>
      <van-field v-model="sub.banknumber" type="number" label="银行卡" placeholder="请输入银行卡号"/>
      <van-field v-model="sub.zhihang" label="支行名称" placeholder="请输入支行名称"/>
      <van-field v-model="sub.name" label="真实姓名" placeholder="请输入真实姓名"/>
      <van-field v-model="sub.transaction_password" type="password" label="交易密码" placeholder="请输入交易密码"/>
    </van-cell-group>
    <div class="btn" v-if="bankInfo==='未绑定'">
      <a @click="submit">添加银行卡</a>
    </div>
    <div class="bank" v-else-if="bankInfo==='未绑定'||bankInfo">
      <p>{{bankInfo.bankname}}</p>
      <p>{{bankInfo.name}}</p>
      <h1>{{bankInfo.banknumber}}</h1>
      <span>{{bankInfo.status}}</span>
      <van-icon name=" icon-yinhang-zhongguoyinhang"  />
    </div>
  </div>
</template>

<script>
import { onClickLeft } from '../../../assets/js'
import { computed, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { Toast, Dialog } from 'vant'
import { APIaddBank } from '../../../assets/js/api'
import { useRouter } from 'vue-router'

export default {
  name: 'index',
  setup () {
    const { push } = useRouter()
    const { state, dispatch } = useStore()
    dispatch('getBanklist')
    dispatch('getBankInfo')
    const data = reactive({
      value: 0,
      sub: {
        zhihang: null,
        name: null,
        transaction_password: null,
        banknumber: null
      },
      bankInfo: computed(e => state.bankInfo),
      binklist: computed(e => state.banklist && state.banklist.map((a, b) => ({ ...a, text: a.bankname, value: b })))
    })
    const methods = {
      onClickLeft,
      submit () {
        if (Object.values(data.sub).indexOf('') < 0) {
          Dialog.confirm({
            title: '消息确认',
            allowHtml: true,
            message: `银行名称：<span style="color: #805879;display: inline-block;width: 70%">${data.binklist[data.value].bankname}</span> \n银行卡号：<span style="color: #805879;display: inline-block;width: 70%">${data.sub.banknumber}</span> \n支行名称：<span style="color: #805879;display: inline-block;width: 70%">${data.sub.zhihang}</span>\n真实姓名：<span style="color: #805879;display: inline-block;width: 70%">${data.sub.name}</span>`
          })
            .then(async () => {
              // on confirm
              const obj = { ...data.sub, sysbank_id: data.binklist[data.value].sysbank_id }
              const res = await APIaddBank(obj)
              if (res.data.sign === true) {
                Toast({
                  message: res.data.msg
                })
                push('/withdraw')
              } else {
                Toast({
                  message: res.data.msg
                })
              }
            })
        } else {
          Toast({
            message: '信息输入不完整'
          })
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
.bind {
  width: 100%;
  height: 100%;
  background: $bg;

  .btn {
    width: 100%;
    padding: 10%;
    display: flex;
    justify-content: center;
    align-items: center;

    a {
      width: 100%;
      background: $btn;
      color: #fff;
      padding: 20px 0;
      border-radius: 10px;
    }
  }
  .bank{
    width: 90%;
    height: 300px;
    background: linear-gradient(90deg, #705b65, #46423e);
    border-radius: 20px;
    margin: 30px auto;
    text-align: left;
    padding: 5%;
    position: relative;
    overflow: hidden;
    p{
      color: #ede7e7;
      padding: 4px 0;
      position: relative;z-index: 9;
    }
    h1{
      color: #fff;
      letter-spacing: 6px;
      padding: 10px 0;
      position: relative;z-index: 9;
    }
    span{
      position: absolute;
      right: 20px;
      bottom: 20px;
      color: #dfbb9e;
      z-index: 9;
    }
    i{
      position: absolute;
      right: -100px;
      top: 0;
      color: #877f7e;
      font-size: 300px;
      opacity: .4;
    }
  }

  :deep().van-cell__value {
    justify-content: space-between;
    align-items: center;
    display: flex;

    .van-dropdown-menu__bar {
      height: auto;
      box-shadow: none;

      .van-dropdown-menu__item {
        justify-content: flex-start;
      }
    }

    .van-dropdown-menu__title {
      padding-left: 0;
    }
  }
}
</style>
