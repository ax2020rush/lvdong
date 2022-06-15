<template>
  <div class="game">
    <van-nav-bar title="预约大厅" />
    <div class="list">
      <nav class="left">
        <a :class="{active:index===9999}"  @click="index=9999">全部</a>
        <a  :class="{active:index===k}" v-for="(i,k) in (list&&list.type_data)" :key="k" @click="index=k,selectCp(i)">{{i.title}}</a>
      </nav>
      <div class="right">
        <game-right v-if="index===9999?list:item" :list="index===9999?list.cp_data_all:item" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, toRefs } from 'vue'
import gameRight from '../../components/game-right'
import { Toast } from 'vant'
import { APICpType } from '../../assets/js/api'
import { useStore } from 'vuex'
export default {
  name: 'index',
  setup () {
    // vuex
    const { state } = useStore()
    // data
    const data = reactive({
      index: 9999,
      list: computed(e => state.reserveAll),
      item: null
    })
    // 方法
    const methods = {
      async selectCp (val) {
        data.item = null
        const res = await APICpType({
          type_id: val.type_id
        })
        if (res.data.sign) {
          data.item = res.data.data
        } else {
          Toast.fail(res.data.msg)
        }
      }
    }
    return {
      ...toRefs(data),
      ...methods
    }
  },
  components: {
    gameRight
  }
}
</script>

<style scoped lang="scss">
.game{
  background: #F2F2F5;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .list{
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    height: 100%;
    .left{
      width: 176px;
      display: flex;
      flex-direction: column;
      background: #fff;
      height: 100%;
      a{
        height: 108px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        &:after{
          content: '';
          position: absolute;
          width: 60%;
          height: 1px;
          background: linear-gradient(to right,transparent,#ebebeb,transparent);
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
        }
        &.active{
          color: #7e5678;
          background: #F2F2F5;
          &:after{
            display: none;
          }
          &:before{
            content: '';
            position: absolute;
            left: 4px;
            width: 8px;
            height: 50px;
            border-radius: 10px;
            background: $ico;
          }
        }
      }
    }
    .right{
      flex: 1;
      height: 100%;
      padding: 20px;
      overflow-y: auto;
    }
  }
}
</style>
