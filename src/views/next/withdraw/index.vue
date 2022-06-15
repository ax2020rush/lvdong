<template>
  <div class="withdraw">
    <van-nav-bar left-arrow @click-right="$router.push('/rechargedetail')" @click-left="onClickLeft" title="积分兑换">
      <template #right>
        <span style="color: #fff">提现记录</span>
      </template>
    </van-nav-bar>
    <div class="top">
      <p v-if="bankInfo">{{ bankInfo.bankname }} ({{ bankInfo.banknumber }})</p>
      <van-icon name="success"/>
    </div>
    <div class="top center">
      <p>兑换积分 (CNY)</p>
      <div class="ipt">
        <p>CNY</p>
        <input v-model="money" type="number">
        <span @click="money=info.jifen">全部</span>
      </div>
      <div class="sm">
        <div class="tips">
          <van-popover teleport="#app" v-model:show="showPopover">
            <div class="popover-body" data-v-53d4ff85="" style="padding: 10px;">
              <p>
                1.单笔限额：最低100.00CNY，最高1000000.00CNY</p>
              <p data-v-53d4ff85="">2.每日提现：最高10000000.00CNY</p>
              <p data-v-53d4ff85="">3.提现次数：每日最高999次(免手续费500次)</p>
              <p data-v-53d4ff85="">4.到账时间：一般到账时间在5分钟左右，最快2分钟内到账</p>
            </div>
            <template #reference>
              <van-icon name="question-o"/>
              限额说明
            </template>
          </van-popover>
        </div>
        <div v-if="info">
          剩余积分：<span>{{ info.jifen }}CNY</span>
        </div>
      </div>
    </div>
    <div class="btn">
      <a @click="submit">马上兑换积分</a>
    </div>
  </div>
  <van-dialog v-model:show="show" @confirm="submits" title="请输入支付密码" show-cancel-button>
    <van-field v-model="password" type="password"/>
  </van-dialog>
</template>

<script>
import { onClickLeft } from '../../../assets/js'
import { computed, reactive, toRefs, watch } from 'vue'
import { useStore } from 'vuex'
import { Toast } from 'vant'
import { useRouter } from 'vue-router'
import { APIwithdraw } from '../../../assets/js/api'

export default {
  name: 'index',
  setup () {
    const { push } = useRouter()
    const { state, dispatch } = useStore()
    dispatch('getBanklist')
    dispatch('getBankInfo')
    const data = reactive({
      info: computed(e => state.userInfo),
      money: null,
      show: false,
      bankInfo: computed(e => state.bankInfo),
      showPopover: false,
      password: null
    })
    watch(() => state.bankInfo, value => {
      if (value === '未绑定') {
        Toast({
          message: '您还未绑定银行，请前往绑定'
        })
        push('/bind')
      }
    }, {
      immediate: true
    })
    const methods = {
      onClickLeft,
      async submit () {
        if (data.money) {
          data.show = true
        } else {
          Toast({
            message: '请输入兑换金额'
          })
        }
      },
      async submits () {
        const res = await APIwithdraw({
          transaction_password: data.password,
          jifen: data.money,
          banknumber: data.bankInfo.banknumber
        })
        Toast({
          message: res.data.msg
        })
        data.password = null
        data.money = null
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
.popover-body {
  font-size: 12px;
  width: 100%;

  p {
    text-align: justify;
    padding: 8px;
  }
}

.van-field {
  width: 50%;
  margin: 0 auto;

  :deep() .van-field__value {
    border: 1px solid #c5c5c5;

    input {
      text-align: center;
    }
  }
}

.withdraw {
  width: 100%;
  height: 100%;
  background: $bg;

  .top {
    width: 100%;
    background: #fff;
    margin: 18px 0;
    padding: 20px 5%;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    &.center {
      flex-direction: column;
      align-items: flex-start;
    }

    p {
      margin-right: 20px;
    }

    > .ipt {
      display: flex;
      width: 100%;
      padding: 30px 0 15px;
      justify-content: space-between;
      align-items: center;

      input {
        border: none;
        flex: 1;
        border-bottom: 1px solid #F5F6F7;
        padding: 20px 0;
      }

      p {
        padding-right: 20px;
      }

      span {
        padding-left: 30px;
        color: #ff253f;
      }
    }

    .sm {
      width: 100%;
      padding: 20px 0;
      border-top: 1px solid #F5F6F7;;

      .tips {
        text-align: right;
        width: 100%;
        color: #979799;
        font-size: 23px;

      }

      > div {
        width: 100%;
        text-align: left;
        padding-top: 20px;

        span {
          color: #d10404;
        }
      }
    }
  }

  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;

    a {
      background: $btn;
      width: 100%;
      color: #fff;
      padding: 26px 0;
      border-radius: 20px;
      font-size: 26px;
    }
  }
}
</style>
