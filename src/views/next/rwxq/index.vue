<template>
  <div>
    <van-nav-bar left-arrow @click-left="onClickLeft" title="任务详情"/>
    <div class="top">
      <h1>{{ $route.query.cptitle }}</h1>
      <span>第{{ $route.query.expect }}期</span>
    </div>
    <div class="status">
      <div class="left">
        <h1>{{ $route.query.amount }}积分</h1>
        <span>任务积分</span>
      </div>
      <div class="right">
        <h1 :style="{color:sliceStr(parseInt($route.query.isdraw)).color}">
          {{ sliceStr(parseInt($route.query.isdraw)).text }}</h1>
      </div>
    </div>
    <div class="ls">
      <!--      <div class="title">任务内容</div>-->
      <p>投注内容: <span>{{ $route.query.tzcode }}</span></p>
      <p>投注时间: <span>{{ formatDate($route.query.addtime) }}</span></p>
    </div>
    <div v-if="cpall&&$route.query.cptitle" class="btn">
      <a @click="$router.push({path:'/lottery',query:sets(cpall,$route.query.cptitle)})">再来一单</a>
    </div>

  </div>
</template>

<script>
import { onClickLeft, formatDate } from '../../../assets/js'
import { useStore } from 'vuex'
import { computed, reactive, toRefs } from 'vue'

export default {
  name: 'index',
  setup () {
    const { state } = useStore()
    const data = reactive({
      cpall: computed(e => state.reserveAll && state.reserveAll.cp_data_all)
    })
    const methods = {
      sets (arr, t) {
        if (arr) {
          return arr.filter(e => e.title === t)[0]
        } else {
          return ''
        }
      },
      onClickLeft,
      sliceStr (n) {
        if (n === 0) {
          return {
            text: '待开奖',
            color: 'red'
          }
        } else if (n === 1) {
          return {
            text: '已中奖',
            color: 'green'
          }
        } else if (n === -1) {
          return {
            text: '未中奖',
            color: 'red'
          }
        }
      },
      formatDate
    }
    return {
      ...methods,
      ...toRefs(data)
    }
  }
}
</script>

<style scoped lang="scss">
.top {
  width: 90%;
  margin: 0 auto;
  padding: 30px 0;
  border-bottom: 1px solid #f2f2f5;

  h1 {
    font-size: 34px;
    padding: 0px 0 10px;
  }

  span {
    font-size: 24px;
    color: #7d7c7c;
    padding: 10px 0 0;
  }
}

.ls {
  width: 100%;
  border-top: 10px solid #f2f2f5;
  padding: 5%;
  text-align: left;

  .title {
    font-size: 30px;
    color: #000;
    font-weight: 600;
    padding-bottom: 40px;

  }

  > p {
    padding: 15px 0;
    font-size: 23px;
    color: #000;

    span {
      font-size: 28px;
    }
  }
}

.btn {
  a {
    width: 90%;
    display: flex;
    background: $btn;
    color: #fff;
    justify-content: center;
    align-items: center;
    margin: 40px auto;
    padding: 20px 0;
    border-radius: 100px;
  }
}

.status {
  width: 90%;
  margin: 0 auto;
  display: flex;
  height: 200px;
  justify-content: space-between;
  align-items: center;
  position: relative;

  &:before {
    content: '';
    width: 1px;
    height: 30%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background: #f2f2f5;
  }

  > div {
    width: 50%;

    h1 {
      font-size: 34px;
    }

    span {
      font-size: 26px;
      color: #979799;
      padding-top: 20px;
      display: inline-block;
    }
  }
}
</style>
