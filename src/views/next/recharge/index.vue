<template>
  <div class="recharge">
    <van-nav-bar left-arrow @click-right="$router.push('/rechargedetail')" @click-left="onClickLeft" title="充值">
      <template #right>
        <!--        <span style="color: #fff">充值记录</span>-->
      </template>
    </van-nav-bar>
    <div class="top">
      <div>
        <van-image
          width="49px"
          height="49px"
          fit="cover"
          position="center"
          round
          :src="info.img"
        />
        <div class="info">
          <p>{{info.account}}</p>
          <p>积分：{{info.jifen}} CNY</p>
        </div>
      </div>
      <p>如要线下充值请联系客服，部分支付渠道充值金额随机1位小数 ,请您在付款时确认</p>
    </div>
    <van-tabs v-if="list" @click-tab="money=null,index=null" color="transparent" title-active-color="#d67117" v-model:active="active">
      <van-tab v-for="(i,k) in list" :title="i.title" :key="k">
        <p class="title">金币充值</p>
        <nav>
          <a :class="{active:index===t?true:false}" @click="index=t,money=n" v-for="(n,t) in i.jine.split('-')" :key="t"><span>￥{{n}}</span>(CNY)
            <van-icon name="success" />
          </a>
        </nav>
      </van-tab>
    </van-tabs>
    <div class="kf">
      <van-button v-if="kfurl" :url="kfurl" type="success" color="#e6c3a1">联系客服</van-button>
    </div>
    <div class="foot animate__animated animate__fadeInUp" v-if="money">
      <p>总金额:<span>￥{{ money }}</span></p>
      <a @click="submit">确认支付</a>
    </div>
    <van-popup
      v-model:show="show"
      closeable
      position="bottom"
      :style="{ height: '100%' }">
      <p v-if="list">{{ list[active].title }}</p>
      <iframe v-if="palyUrl" :src="palyUrl" >

      </iframe>
      <!-- 通用错误 -->
      <van-empty v-else style="margin-top: 20%;color: #fff" description="当前通道不可用，请联系客服" />
    </van-popup>
  </div>

</template>

<script>
import { onClickLeft } from '../../../assets/js'
import { computed, reactive, toRefs, watch } from 'vue'
import { useStore } from 'vuex'
import { APIpayset, APItongdao } from 'assets/js/api'
import { Toast } from 'vant'

export default {
  name: 'index',
  setup () {
    const { state } = useStore()
    const data = reactive({
      info: computed(e => state.userInfo),
      kfurl: computed(e => (state.indexAll && state.indexAll.kefu) || ''),
      list: null,
      active: 0,
      index: null,
      money: null,
      show: false,
      palyUrl: null
    })
    watch(() => data.show, e => {
      if (!e) {
        data.palyUrl = null
      }
    })
    const methods = {
      onClickLeft,
      async submit () {
        Toast.loading({
          duration: 0,
          message: '正在调用支付...',
          forbidClick: true,
          loadingType: 'spinner'
        })

        const res = await APIpayset({
          id: data.list[data.active].id,
          amount: data.money
        })
        if (data.list[data.active].type_id === 1) {
          if (res.data.retCode === 'SUCCESS') {
            Toast.success(res.data.retMsg)
            setTimeout(e => {
              data.palyUrl = res.data.payParams.payUrl
              data.show = true
            }, 500)
          } else {
            Toast.fail(res.data.retMsg)
          }
        } else if (data.list[data.active].type_id === 2) {
          if (res.data.content) {
            // Toast.success('正在跳转...')
            setTimeout(e => {
              data.palyUrl = res.data.content
              data.show = true
            }, 500)
          } else {
            Toast.fail('当前支付通道不可用，请联系客服')
          }

          // open(res.data.content)
        } else if (data.list[data.active].type_id === 3) {
          if (res.data.status === '1') {
            // Toast.success('正在跳转...')
            setTimeout(e => {
              data.palyUrl = res.data.data.payUrl
              data.show = true
            }, 500)
          } else {
            Toast.fail('当前支付通道不可用，请联系客服')
          }
        }
      },
      async init () {
        const res = await APItongdao()
        if (res.data.sign) {
          data.list = res.data.data
        }
      }
    }
    methods.init()
    return {
      ...methods,
      ...toRefs(data)
    }
  }
}
</script>

<style scoped lang="scss">
.van-hairline--bottom:after {
  border-bottom-width: 0px;
}
.foot{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  width: 100%;
  padding-left: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p{
    font-size: 24px;
    span{
      color: #f65567;
      font-size: 34px;
    }
  }
  a{
    padding: 20px;
    background: $btn;
    color: #fff;
  }
}
.recharge {
  width: 100%;
  height: 100%;
  background: $bg;
  :deep().van-popup{
    background: $gbcolor;
    padding-top: 50px;
    overflow: hidden;
    >p{
      position: absolute;
      top: 14px;
      left: 0;
      right: 0;
      margin: auto;
      font-size: 16px;
      color: #fff;
    }
    iframe{
      width: 100%;
      height: 100%;
      background: #fff;
      border: none;
    }
  }
  .van-tab__panel{
    background: #fff;
    border-top: 5px solid #f2f2f5;
    .title{
      padding: 10px 5%;
      text-align: left;
      font-size: 14px;
      font-weight: 600;
    }
    nav{
      display: flex;
      flex-wrap: wrap;
      justify-content:space-between;
      align-items: center;
      padding: 5%;
      a{
        width: 48%;
        height: 50px;
        border: 1px solid #e4e4e4;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        color: #999;
        font-size: 13px;
        font-weight: 600;
        margin: 6px 0;
        position: relative;
        overflow: hidden;
        i{
          display: none;

        }
        &.active{
          border-color: #f65567;
          color: #f65567;
          span{
            color: #f65567;
          }

        }
        span{
          font-weight: 600;
          font-size: 18px;
          color: #999;
          margin-right: 5px;
        }
      }
    }
  }
  .top {
    width: 100%;
    background: $gbcolor;
    padding: 5% 5% 0;
    >div{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .info{
        text-align: left;
        color: #fff;
        padding-left: 30px;
        >p{
          padding: 10px 0;
        }
      }
    }
    >p{
      color: #fff;
      text-align: justify;
      padding: 20px 0;
    }
  }
  .kf{
    margin-top: 100px;
  }
}
</style>
