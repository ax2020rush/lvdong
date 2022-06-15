<template>
  <div class="lottery">
    <van-nav-bar left-arrow @click-left="onClickLeft" @click-right="show=true" right-text="切换任务" :title="query.title"/>
    <div v-if="his" class="history">
      <div class="animate__animated animate__fadeInDown">
        <div class="left" v-if="lottery">
          <p>期号</p>
          <ul>
            <li v-for="(a,g) in lottery.opencode20" :key="g">{{ a.expect }}</li>
          </ul>
        </div>
        <div class="right" v-if="lottery">
          <p>开奖号码</p>
          <ul>
            <li class="mak" v-for="(v,x) in lottery.opencode20" :key="x">
              <div class="ball" v-if="v.opencode">
                <span :class="'idem'+s" v-for="s in v.opencode.split(',')" :key="s"></span>
              </div>
              <div class="ball" v-else>
                <p>正在开奖中</p>
              </div>
              <div class="res" v-if="v.opencode">
                <span>{{ v.opencode.split(',').reduce((a, b) => (parseInt(a) + parseInt(b))) }}</span>
                <span>{{ v.opencode.split(',').reduce((a, b) => (parseInt(a) + parseInt(b))) >= 11 ? '大' : '小' }}</span>
                <span>{{
                    v.opencode.split(',').reduce((a, b) => (parseInt(a) + parseInt(b))) % 2 === 0 ? '双' : '单'
                  }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="top">
      <div class="qs">
        <div>
          <div class="ico">
            <img :src="query.logo_pic" alt="">
          </div>
          <h1 v-if="lottery">{{ lottery.cpinfo.currFullExpect }}期</h1>
        </div>
        <span v-if="lottery">{{ TimeFormat(times) }}</span>
      </div>
      <div class="linear-gradient" data-v-4b83e44e="" data-v-46ba940e=""
           style="width:100%;height: 1px;background: linear-gradient(to right, rgba(126, 86, 120, 0), rgb(230, 195, 161), rgba(126, 86, 120, 0));"></div>
      <div class="number">
        <div class="left">
          <div class="ball" v-if="lastcode">
            <span :class="'idem'+s" v-for="s in lastcode" :key="s"></span>
          </div>
          <div class="ball" v-else>
            <p>正在开奖中</p>
          </div>
          <div class="res" v-if="lastcode">
            <span>{{ lastcode.reduce((a, b) => (parseInt(a) + parseInt(b))) }}</span>
            <span>{{ lastcode.reduce((a, b) => (parseInt(a) + parseInt(b))) >= 11 ? '大' : '小' }}</span>
            <span>{{ lastcode.reduce((a, b) => (parseInt(a) + parseInt(b))) % 2 === 0 ? '双' : '单' }}</span>
          </div>
        </div>
        <div class="right">
          <van-icon @click="his=!his" :style="{transition:'.2s',transform:his?'rotate(180deg)':'rotate(0deg)'}"
                    name="arrow-down"/>
        </div>
      </div>

    </div>
    <div class="lottery-content">
      <div class="left" v-if="lottery">
        <div @click="idx=k" class="item" v-for="(i,k) in wanfa" :key="k">
          <span v-if="i.show">{{ i.title }}</span>
            <div :style="{display:n.show?'':'none'}" @click="str=n.title,idx2=t,clearData(n,t)"
                 :class="{active:!str&&k===0&&t===0?true:str===n.title}"
                 class="slide"
                 v-for="(n,t) in i.data" :key="t">
              {{ n.title.indexOf('-') >= 0 ? n.title.split('-')[1] : n.title }}
            </div>
        </div>
      </div>
      <div class="right" id="toBottom" v-if="lottery">
        <div class="ball" id="eidet" :style="{paddingBottom:maskShow?'220px':'60px',transition: '.2s'}">
          <div v-if="idx===0">
            <div :class="{active:numberArray.includes(i.playid)}" @click="addlottery({
            item:i,
            type:0
            })" class="idx0" v-for="(i,k) in wanfa[idx].data[idx2].data" :key="k">
              <p>{{ i.number }}</p>
              <span>赔率({{ i.rate }})</span>
            </div>
          </div>
          <div class="idx1" v-if="idx===1&&idx2===0">
            <span v-if="idx2===0">号码</span>
            <div @click="addlottery({
            number:r,
            type:1,
            item:wanfa[idx].data[idx2].data
            })" v-for="(r,t) in wanfa[idx].data[idx2].data.number.split('-')[0].split(',')"
                 :class="{active:numberArray.includes(r)}" :key="t">
              <p>{{ r }}*</p>
            </div>
          </div>
          <div :class="'idx'+idx" class="ebth" v-if="idx===1&&idx2===1">
            <div>
              <span v-if="idx2===1">二同号</span>
              <div
                :class="{active:one===r}"
                @click="addlottery({number:r,type:2,eth:true,item:wanfa[idx].data[idx2].data})"
                v-for="(r,t) in wanfa[idx].data[idx2].data.number.split('-')[0].split(',')" :key="t">
                <p>{{ r }}</p>
              </div>
            </div>
            <div>
              <span v-if="idx2===1">不同号</span>
              <div
                :class="{active:numberArray.includes(r)}"
                @click="addlottery({number:r,type:2,eth:false,item:wanfa[idx].data[idx2].data})"
                v-for="(r,t) in wanfa[idx].data[idx2].data.number.split('-')[1].split(',')"
                :key="t">
                <p>{{ r }}</p>
              </div>
            </div>
          </div>
          <div :class="'idx1'" class="ebth" v-if="idx===2">
            <div v-if="wanfa[idx].data[idx2]">
              <span>号码</span>
              <div @click="addlottery({
              type:3,
              item:wanfa[idx].data[idx2].data,
              number:r})"
                   :class="{active:numberArray.includes(r)}"
                   v-for="(r,t) in wanfa[idx].data[idx2].data.number.split(',')" :key="t">
                <p>{{ r }}</p>
              </div>
            </div>
          </div>
          <div :class="'idx1'" class="ebth" v-if="idx===3">
            <div>
              <span>号码</span>
              <div @click="addlottery({
              type:4,
              item:wanfa[idx].data[idx2].data
              })"
                   :class="{active:wanfa[idx].data[idx2].data.playid===one}"
                   v-for="(r,t) in ['123','234','345','456']" :key="t">
                <p>{{ r }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mask animate__animated animate__fadeInUp" v-if="maskShow">
      <div class="title">
        <p>当前选号: <span>{{ idx !== 2 ? orderList.map(e => (e.number)).join(',') : numberArray.join(',') }}</span></p>
        <div>
          <van-icon name="arrow"/>
          <van-icon name="arrow"/>
        </div>
      </div>
      <div class="c1">
        <p>每注积分:</p>
        <input type="number" v-model="nowMoney">
        <p>CNY</p>
      </div>
      <div class="c2">
        <p>总共<span>{{ orderList.length }}</span>注 金额<span>{{ orderList.length * nowMoney }}</span>CNY</p>
        <div class="cm">
          <div @click="selectMoney(k,i)" :class="{active:cmindex===k}" v-for="(i,k) in cmlist" :key="k">
            {{ i.text }}
          </div>
        </div>
      </div>
    </div>
    <div class="foot">
      <p>可用积分<span>{{ info&&info.jifen }}</span>CNY</p>
      <a @click="tips">提交</a>
    </div>
    <van-popup v-model:show="show" v-if="lottery" position="right" :style="{ height: '100%',width:'65%' }">
      <div v-for="(i,k) in lottery.cpinfo_list" :key="k" class="popups" v-show="i.cp_data.length">
        <p>{{ i.title }}</p>
        <div class="ite" @click="$router.push({query:i}),show=false" v-for="(i,k) in i.cp_data" :key="k">
          <div>
            <img :src="i.logo_pic" alt="">
          </div>
          <p>{{ i.title }}</p>
        </div>
      </div>
    </van-popup>
    <van-popup class="order" v-model:show="orderShow">
      <div class="title">
        <span></span>
        <span>任务单</span>
        <van-icon @click="orderShow=false" name="cross"/>
      </div>
      <div class="content">
        <div>
          <span>{{ idx !== 2 ? orderList.map(e => (e.number)).join(',') : numberArray.join(',') }}</span>
          <p>标注选号 {{ orderList.length }}注X{{
              parseFloat(nowMoney).toFixed(2)
            }}CNY={{ parseFloat(orderList.length * nowMoney).toFixed(2) }}CNY</p>
        </div>
        <span @click="clearData"></span>
      </div>
      <div class="btn">
        <a @click="clearData">清空任务</a>
        <a @click="submit">确认提交</a>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { computed, reactive, toRefs, watch } from 'vue'
import { choose, onClickLeft, TimeFormat } from '../../../assets/js'
import { useStore } from 'vuex'
import { Toast } from 'vant'
import { APISUB } from '../../../assets/js/api'

export default {
  name: 'index',
  setup () {
    // vuex
    const { state, dispatch } = useStore()
    dispatch('getUserInfo', { time: 5 })
    // router
    const { push } = useRouter()
    const route = useRoute()
    if (!route.query.id) {
      push('/index')
    }

    const data = reactive({
      query: computed(e => route.query),
      show: false,
      lottery: computed(e => state.donation),
      wanfa: computed(e => {
        const arrs = state.donation && state.donation.wanfa
        if (arrs) {
          for (let i = 0; i < arrs.length; i++) {
            if (i === 0) { // 和值
              arrs[i].data = arrs[i].data.map(s => ({ ...s, show: s.data.some(d => d.isopen === 1) }))
              arrs[i].show = arrs[i].data.some(d => d.show)
            } else if (i === 1) { // 二同号
              arrs[i].data = arrs[i].data.map(s => ({ ...s, show: s.data.isopen === 1 }))
              arrs[i].show = arrs[i].data.some(d => d.show)
            } else if (i === 2) {
              arrs[i].data = arrs[i].data.map(s => ({ ...s, show: s.data.isopen === 1 }))
              arrs[i].show = arrs[i].data.some(d => d.show)
            } else if (i === 3) {
              arrs[i].data = arrs[i].data.map(s => ({ ...s, show: s.data.isopen === 1 }))
              arrs[i].show = arrs[i].data.some(d => d.show)
            }
          }
        }
        return arrs
      }),
      reserveAll: computed(e => state.reserveAll),
      str: null,
      idx: 0,
      idx2: 0,
      lastcode: computed(e => (state.lastCode && state.lastCode.split(','))),
      info: computed(e => state.userInfo),
      cmlist: [
        { num: 25, text: '25' },
        { num: 100, text: '100' },
        { num: 500, text: '500' },
        { num: 1000, text: '1k' },
        { num: 2500, text: '2.5k' },
        { num: 5000, text: '5k' }
      ],
      cmindex: 0,
      maskShow: false,
      numberArray: [],
      orderList: [],
      one: null,
      nowMoney: '',
      orderShow: false,
      timer: null,
      times: 0,
      his: false,
      dbcli: true
    })
    data.nowMoney = data.cmlist[0].num
    // 方法
    const methods = {
      onClickLeft,
      addlottery (i) {
        if (i.type === 0) {
          if (data.numberArray.includes(i.item.playid)) {
            data.numberArray = data.numberArray.filter(e => e !== i.item.playid)
            data.orderList = data.orderList.filter(e => e.playid !== i.item.playid)
          } else {
            data.numberArray.push(i.item.playid)
            data.orderList.push({
              playid: i.item.playid,
              number: i.item.number,
              price: '',
              playtitle: i.item.playtitle
            })
          }
        } else if (i.type === 1) {
          if (data.numberArray.includes(i.number)) {
            data.numberArray = data.numberArray.filter(e => e !== i.number)
            data.orderList = data.orderList.filter(e => e.number !== i.number)
          } else {
            data.numberArray.push(i.number)
            data.orderList.push({
              playid: i.item.playid,
              number: i.number,
              price: '',
              playtitle: i.item.playtitle
            })
          }
        } else if (i.type === 2) { // 二同号计算方法
          if (i.eth) {
            if (data.one === i.number) {
              data.one = null
            } else {
              data.one = i.number
            }
            data.numberArray = data.numberArray.filter(e => e !== (data.one ? data.one[0] : data.one))
          } else {
            if (data.numberArray.includes(i.number)) {
              data.numberArray = data.numberArray.filter(e => e !== i.number)
            } else {
              data.numberArray.push(i.number)
            }
            if (data.one && data.numberArray.includes(data.one[0])) {
              data.one = null
            }
          }
          if (data.one && data.numberArray.length > 0) {
            data.orderList = data.numberArray.map(e => ({
              playid: i.item.playid,
              number: data.one + e,
              price: '',
              playtitle: i.item.playtitle
            }))
          } else {
            data.orderList = []
          }
        } else if (i.type === 3) {
          if (data.numberArray.includes(i.number)) {
            data.numberArray = data.numberArray.filter(e => e !== i.number)
          } else {
            data.numberArray.push(i.number)
          }
          if (data.numberArray.length >= 3) {
            const arr = choose(data.numberArray, 3)
            data.orderList = arr.map(e => ({
              playid: i.item.playid,
              number: e.join(','),
              price: '',
              playtitle: i.item.playtitle
            }))
          } else {
            data.orderList = []
          }
        } else if (i.type === 4) {
          if (data.one) {
            data.one = null
            data.orderList = []
          } else {
            data.orderList = [{
              playid: i.item.playid,
              number: i.item.number,
              price: '',
              playtitle: i.item.playtitle
            }]
            data.one = i.item.playid
          }
        }
        if (data.orderList.length) {
          data.maskShow = true
        } else {
          data.maskShow = false
        }
      }, // 计算注数金额
      selectMoney (k, i) {
        data.cmindex = k
        data.nowMoney = i.num
      },
      clearData (n, t) {
        data.orderShow = false
        data.numberArray = []
        data.orderList = []
        data.one = null
        data.maskShow = false
      },
      async submit () {
        if (data.dbcli) {
          data.dbcli = false
        } else {
          return
        }
        const obj = {
          expect: data.lottery.cpinfo.currFullExpect,
          cpname: data.lottery.cpinfo.cpname,
          orderList: data.orderList.map(e => ({ ...e, price: data.nowMoney }))
        }
        const res = await APISUB(obj)
        if (res.data.sign) {
          Toast({
            type: 'success',
            message: res.data.msg
          })
          methods.clearData()
          dispatch('getUserInfo')
          setTimeout(e => (data.dbcli = true), 1000)
        } else {
          Toast({
            type: 'fail',
            message: res.data.msg
          })
          methods.clearData()
          setTimeout(e => (data.dbcli = true), 1000)
        }
      },
      TimeFormat,
      diffTime (time) {
        data.timer = setInterval(e => {
          data.times = time--
          if (data.times <= 0) {
            clearInterval(data.timer)
            setTimeout(e => {
              dispatch('getDonation', { id: data.query.id })
            }, 1000)
          }
        }, 1000)
      },
      tips () {
        if (data.orderList.length) {
          data.orderShow = true
        } else {
          Toast.fail('请选择号码')
        }
      }
    }
    // watch
    watch(route, (val) => {
      if (val.query.id) {
        dispatch('getDonation', { id: val.query.id })
        methods.clearData()
      }
    }, {
      immediate: true
    })
    // watch(() => data.maskShow, (val) => {
    //   const dom = document.getElementById('eidet')
    //   if (val) {
    //   //
    //
    //     dom.style.transition = '.2s'
    //     dom.style.paddingBottom = '220px'
    //     setTimeout(e => {
    //       document.getElementById('toBottom').scrollTop = dom.scrollHeight
    //     }, 500)
    //   } else {
    //     dom.style.transition = '.2s'
    //     dom.style.paddingBottom = '60px'
    //   }
    // })
    watch(() => data.lottery, (val, old) => {
      if (old) {
        Toast({
          message: '期数已更新为' + val.cpinfo.currFullExpect,
          duration: 4000
        })
      }
      methods.diffTime(val.cpinfo.remainTime)
    })// 每次获取接口更新时间
    watch(() => data.timer, (val, old) => {
      clearInterval(old)
    })
    return {
      ...toRefs(data),
      ...methods
    }
  }
}
</script>

<style scoped lang="scss">
.lottery {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: absolute;

  :deep() .order {
    width: 80%;
    border-radius: 10px;

    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 5%;
      border-bottom: 1px solid #F7F8F9;

      span {
        color: #7e5678;
        font-size: 31px;
      }

      i {
        font-size: 40px;
      }
    }

    .content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 20px 5%;
      border-bottom: 1px solid #F7F8F9;

      > div {
        text-align: left;

        span {
          color: #ff253f;
          font-size: 24px;
          text-align: left;
          display: inline-block;
          padding: 10px 0;
        }

        p {
          color: #979799;
          font-size: 26px;
        }
      }

      > span {
        display: flex;
        width: 36px;
        height: 40px;
        background: #ff253f;
        border-radius: 6px;
        position: relative;

        &:before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          width: 90%;
          height: 4px;
          background: #fff;
          margin: auto;
        }
      }
    }

    .btn {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 50% 5% 5%;

      a {
        border: 1px solid #979799;
        color: #979799;
        font-size: 24px;
        padding: 16px 50px;
        border-radius: 100px;

        &:last-child {
          background: $gbcolor;
          color: #fff;
          border: none;
        }
      }
    }
  }

  .mask {
    position: absolute;
    bottom: 0;
    min-height: 420px;
    width: 100%;
    background: #fff;
    box-shadow: 0 -4px 4px rgba(0, 0, 0, .07);
    padding: 0 3%;

    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 0;

      span {
        color: #ff253f;
        font-size: 24px;
      }

      > div {
        i {
          color: #ff253f;
          font-size: 26px;

          &:first-child {
            position: relative;
            left: 18px;
          }
        }
      }
    }

    .c1 {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 10px 0;

      input {
        text-align: center;
        border: 0;
      }

      span {
        min-width: 200px;
      }
    }

    .c2 {
      border-top: 1px solid #F7F8F9;
      padding: 20px 0;
      margin-top: 20px;

      p {
        text-align: left;

        span {
          color: #ff253f;
          padding: 0 10px;
        }
      }

      .cm {
        display: flex;
        justify-content: space-between;
        padding: 20px 0;

        > div {
          width: 16.666%;
          height: 78px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          background: url("../../../assets/img/cm.png") no-repeat center/auto 100%;

          &.active {
            animation: moves .2s;

            &:nth-child(1) {
              background: url("../../../assets/img/cm1.png") no-repeat center/auto 100%;
            }

            &:nth-child(2) {
              background: url("../../../assets/img/cm2.png") no-repeat center/auto 100%;
            }

            &:nth-child(3) {
              background: url("../../../assets/img/cm3.png") no-repeat center/auto 100%;
            }

            &:nth-child(4) {
              background: url("../../../assets/img/cm4.png") no-repeat center/auto 100%;
            }

            &:nth-child(5) {
              background: url("../../../assets/img/cm5.png") no-repeat center/auto 100%;
            }

            &:nth-child(6) {
              background: url("../../../assets/img/cm6.png") no-repeat center/auto 100%;
            }

            @keyframes moves {
              from {
                background-size: auto 80%;
              }
              to {
                background-size: auto 100%;
              }
            }
          }
        }
      }
    }
  }

  .foot {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 96px;
    background: #fff;
    box-shadow: 0 -4px 4px rgba(0, 0, 0, .1);
    padding: 0 3%;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    p {
      padding-right: 20px;
      font-size: 26px;

      span {
        color: #ff253f;
        padding: 0 10px;
      }
    }

    a {
      background: $btn;
      color: #fff;
      border-radius: 100px;
      padding: 16px 40px;
      font-size: 30px;
    }
  }

  .van-nav-bar {
    width: 100%;
  }

  .top {
    width: 100%;
    padding: 20px 20px 0;
    box-shadow: 0 0 20px rgba(0, 0, 0, .2);
    position: relative;
    z-index: 10;

    .qs {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 14px;

      > span {
        color: #ff253f;
        font-size: 34px;
      }

      > div {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        h1 {
          font-size: 29px;
          color: #000;
          padding-left: 20px;
        }

        .ico {
          width: 60px;
          height: 60px;

          img {
            width: 100%;
          }
        }

      }
    }

    .number {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 10px;

      .left {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .res {
          width: 200px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-left: 40px;

          span {
            font-size: 28px;
            font-weight: 600;
          }
        }

        .ball {
          display: flex;
          justify-content: flex-start;
          align-items: center;

          p {
            height: 54px;
            width: 208px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-size: 24px;
            color: #9b9a9a;
          }

          span {
            width: 54px;
            height: 54px;
            margin-right: 15px;

            &.idem4 {
              background: url("../../../assets/img/k3/4.png") no-repeat center/100%;
            }

            &.idem1 {
              background: url("../../../assets/img/k3/1.png") no-repeat center/100%;
            }

            &.idem2 {
              background: url("../../../assets/img/k3/2.png") no-repeat center/100%;
            }

            &.idem3 {
              background: url("../../../assets/img/k3/3.png") no-repeat center/100%;
            }

            &.idem5 {
              background: url("../../../assets/img/k3/5.png") no-repeat center/100%;
            }

            &.idem6 {
              background: url("../../../assets/img/k3/6.png") no-repeat center/100%;
            }
          }
        }
      }
    }

  }

  .history {
    position: absolute;
    width: 100%;
    height: calc(100% - 278px);
    background: rgba(0, 0, 0, .2);
    z-index: 9;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: flex-start;

    > div {
      overflow-y: auto;
      width: 100%;
      height: 600px;
      background: #fff;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding-top: 20px;

      > div {
        p {
          font-size: 23px;
          font-weight: 600;
        }

        ul {
          width: 100%;
          padding-top: 20px;

          li {
            width: 100%;
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }

      .left {
        width: 220px;

      }

      .right {
        flex: 1;
        background: #fff;

        ul {
          li {

            .res {
              width: 200px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding-left: 40px;

              span {
                font-size: 24px;
                font-weight: 600;
              }
            }

            .ball {
              display: flex;
              justify-content: flex-start;
              align-items: center;

              p {
                height: 54px;
                width: 208px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                font-size: 23px;
                color: #9b9a9a;
              }

              span {
                width: 54px;
                height: 54px;
                margin-right: 15px;

                &.idem4 {
                  background: url("../../../assets/img/k3/4.png") no-repeat center/100%;
                }

                &.idem1 {
                  background: url("../../../assets/img/k3/1.png") no-repeat center/100%;
                }

                &.idem2 {
                  background: url("../../../assets/img/k3/2.png") no-repeat center/100%;
                }

                &.idem3 {
                  background: url("../../../assets/img/k3/3.png") no-repeat center/100%;
                }

                &.idem5 {
                  background: url("../../../assets/img/k3/5.png") no-repeat center/100%;
                }

                &.idem6 {
                  background: url("../../../assets/img/k3/6.png") no-repeat center/100%;
                }
              }
            }
          }
        }
      }
    }

  }

  .lottery-content {
    width: 100%;
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    background: $bg;
    overflow: hidden;

    .left {
      width: 182px;
      height: 100%;
      background: #fff;

      .item {
        width: 100%;

        &:first-child {
          span {
            border-radius: 10px 10px 0 0;
          }
        }

        span {
          width: 100%;
          background: #e6c3a1;
          color: #fff;
          display: inline-block;
          font-size: .24rem;
          padding: 6px 0;
        }

        > .slide {
          padding: 30px 0;
          background: #fff;

          &.active {
            background: #ECE6EB;
            color: #7e5678;
            position: relative;

            &:after {
              content: '';
              position: absolute;
              width: 6px;
              height: 40px;
              left: 10px;
              top: 0;
              bottom: 0;
              margin: auto;
              background: $ico;
            }
          }
        }
      }
    }

    .right {
      flex: 1;
      height: 100%;
      overflow-y: auto;

      .ball {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        padding: 5% 5% 120px;
        position: relative;

        > div {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;

          .idx0 {
            width: 46%;
            height: 156px;
            background: #fff;
            border-radius: 10px;
            margin-bottom: 5%;
            box-shadow: 0 0 10px rgba(0, 0, 0, .1);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            &.active {
              background: #ff253f;

              p, span {
                color: #fff;
              }
            }

            p {
              color: #7d7c7c;
              font-size: 35px;
              font-weight: 600;
            }

            span {
              color: #ff253f;
              font-size: 23px;
              padding-top: 20px;
            }
          }
        }

        .idx1 {
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          align-items: center;
          padding-top: 40px;

          &.ebth {
            display: flex;
            flex-direction: column;
            padding-top: 0;

            > div {
              width: 100%;
              display: flex;
              flex-wrap: wrap;
              justify-content: flex-start;
              position: relative;
              padding-top: 60px;
              padding-bottom: 20px;

              > div {
                width: 25%;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: 5%;

                &.active {
                  p {
                    background: #ff253f;
                    color: #fff;
                  }
                }
              }

              > span {
                position: absolute;
                top: 0px;
                left: 0px;
                color: #b4b4b5;

              }
            }
          }

          > span {
            position: absolute;
            top: 20px;
            left: 20px;
            color: #b4b4b5;
          }

          > div {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 25%;
            margin-bottom: 5%;

            &.active {
              p {
                background: #ff253f;
                color: #fff;
              }
            }

            p {
              width: 100px;
              height: 100px;
              background: #fff;
              color: #7d7c7c;
              border-radius: 50%;
              font-size: 31px;
              display: flex;
              justify-content: center;
              align-items: center;
              box-shadow: 0 0 10px rgba(0, 0, 0, .04);

            }
          ;
          }
        }
      }
    }
  }
}

.popups {
  width: 90%;
  padding: 80px 20px 0;
  background: #E4E4E7;
  margin: 20px auto;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  position: relative;

  > p {
    position: absolute;
    font-weight: 600;
    font-size: 28px;
    top: 20px;
    left: 20px;
  }

  .ite {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 50%;
    padding-bottom: 20px;

    div {
      width: 100px;
      height: 100px;

      img {
        width: 100%;
      }
    }

    p {
      font-size: 26px;
      padding: 20px 0;
    }
  }
}
</style>
