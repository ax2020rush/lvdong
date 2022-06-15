<template>
  <div class="history" >
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        :finished-text="list.length===0?'':'没有更多了'"
        @load="onLoad"
      >
        <van-cell-group v-if="list.length">
          <van-cell v-for="(i,k) in list" :key="k" @click="$router.push({path:'/rwxq',query:i})"  :label="'投注内容:'+i.tzcode" >
            <template #title>
              <span class="custom-title">{{i.cptitle}}</span>
              <span style="color: #979799;margin-left: 10px;font-size: 12px">第{{i.expect}}期</span>
            </template>
            <template #value>
              <span :style="{color:sliceStr(i.isdraw).color}" >{{i.isdraw===0?parseFloat(i.amount).toFixed(2):i.isdraw===1?'+'+parseFloat(i.amount).toFixed(2):'-'+parseFloat(i.amount).toFixed(2)}}</span>
              <p >{{sliceStr(i.isdraw).text}}</p>
            </template>
          </van-cell>

        </van-cell-group>
        <van-empty
          v-else
          style="margin-top: 100px"
          image="https://cdn.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
          image-size="80"
          description="暂无数据"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { reactive, toRefs, watch } from 'vue'
import { APIdonationrecord } from '../../assets/js/api'

export default {
  name: 'index',
  props: {
    isdraw: null,
    cpname: null
  },
  setup (props) {
    const data = reactive({
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      page: 1
    })
    const methods = {
      onLoad () {
        setTimeout(async () => {
          if (data.refreshing) {
            data.list = []
            data.refreshing = false
          }
          const res = await APIdonationrecord({
            limit: 20,
            page: data.page++,
            isdraw: props.isdraw,
            cpname: props.cpname
          })
          if (res.data.sign) {
            data.list = data.list.concat(res.data.data.data)
          }

          data.loading = false
          if (res.data.data.data.length < 20) {
            data.finished = true
          }
        }, 1000)
      },
      onRefresh () {
        // 清空列表数据
        data.finished = false
        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        data.loading = true
        data.page = 1
        methods.onLoad()
      },
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
      }
    }
    watch(() => props.cpname, value => {
      data.list = []
      methods.onRefresh()
    })
    return {
      ...toRefs(data),
      ...methods
    }
  }
}
</script>

<style scoped lang="scss">
.custom-title{
  font-size: 30px;
}
.history{
  :deep().van-cell__title{
    flex: auto;
    width: 60%;
  }
  :deep().van-cell__label{
    font-size: 13px;
    color: #000;
  }
}
</style>
