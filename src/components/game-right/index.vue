<template>
  <van-pull-refresh
    v-model="isLoading"
    success-text="刷新成功"
    @refresh="onRefresh"
  >
    <ul class="game-right">
      <li @click="$router.push({path:'/lottery',query:i})" v-for="(i,k) in list" :key="k">
        <div>
          <img :src="i.logo_pic" alt="">
        </div>
        <p>{{i.title}}</p>
        <p>每{{i.expecttime}}分钟开一次</p>
      </li>
    </ul>
  </van-pull-refresh>

</template>

<script>
import { reactive, toRefs } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'index',
  props: {
    list: {
      type: Object
    }
  },
  setup () {
    // vuex
    const { dispatch } = useStore()
    // data
    const data = reactive({
      isLoading: false
    })
    // 方法
    const methods = {
      onRefresh () {
        setTimeout(() => {
          dispatch('getReserveAll')
          data.isLoading = false
        }, 1000)
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
.game-right{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 180px;
  li{
    background: #fff;
    border-radius: 20px;
    overflow: hidden;
    width: calc(50% - 10px);
    height: 310px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    >div{
      width: 180px;
      height: 180px;
      border-radius: 20px;
      overflow: hidden;
      img{
        width: 100%;
      }
    }
  }
}
</style>
