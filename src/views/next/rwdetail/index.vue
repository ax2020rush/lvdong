<template>
  <div class="history-content">
    <van-nav-bar  left-arrow @click-left="onClickLeft" title="任务记录">
      <template #right>
        <van-icon @click="show=true" size="24" name="apps-o" />
      </template>
    </van-nav-bar>
    <van-tabs animated color="#fff" :background="gbcolor" title-active-color="#fff"
              title-inactive-color="#f2f2f5" v-model:active="active">
      <van-tab title="全部"><history :cpname="cpname" /></van-tab>
      <van-tab title="已获积分"><history :isdraw="1" :cpname="cpname" /></van-tab>
      <van-tab title="待公布"><history :isdraw="0" :cpname="cpname" /></van-tab>
      <van-tab title="未中奖"><history :isdraw="-1" :cpname="cpname" /></van-tab>
    </van-tabs>
    <van-popup position="right" class="his" v-model:show="show">
      <p>全部任务</p>
      <ul>
        <li :class="{active:index===k}" @click="index=k" v-for="(i,k) in allCp" :key="k">{{i.title}}</li>
      </ul>
      <div class="btn">
        <p @click="cpname=null,show=false">重置</p>
        <p @click="cpname=index!==null?allCp[index].name:null,show=false">确定</p>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { onClickLeft } from '../../../assets/js'
import { computed, reactive, toRefs } from 'vue'

import history from '../../../components/history'
import { useStore } from 'vuex'
import { gbcolor } from '../../../assets/css/index.scss'

export default {
  name: 'index',
  components: {
    history
  },
  setup () {
    const { state } = useStore()
    const data = reactive({
      active: 0,
      show: false,
      gbcolor: gbcolor,
      allCp: computed(e => (state.reserveAll && state.reserveAll.cp_data_all) || null),
      index: null,
      cpname: null
    })
    const methods = {
      onClickLeft
    }
    return {
      ...methods,
      ...toRefs(data)
    }
  }
}
</script>

<style scoped lang="scss">
.van-hairline--bottom:after {
  border-width: 0px;
}
.history-content{
  :deep().his{
    width: 80%;
    height: 100%;
    padding: 5%;
    p{
      text-align: left;
      font-size: 30px;
    }
    ul{
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
      padding-top: 50px;
      li{
        width: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #979799;
        border: 1px solid #979799;
        border-radius: 10px;
        margin-right: 20px;
        margin-bottom: 20px;
        padding: 14px 0;
        &.active{
          color: #fff;
          border: none;
          background: #e6c3a1;
        }
      }
    }
    .btn{
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      padding: 5%;
      p{
        color: #e6c3a1;
        border: 1px solid #e6c3a1;
        border-radius: 100px;
        padding: 14px 80px;
        font-size: 28px;
        &:last-child{
          color: #fff;
          border: none;
          background: #e6c3a1;
        }
      }
    }
  }
}

</style>
