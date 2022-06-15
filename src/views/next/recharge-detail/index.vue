<template>
<div class="detail">
  <van-nav-bar left-arrow  @click-left="onClickLeft" title="兑换记录">
    <template #right>
<!--      <span style="color: #fff">筛选</span>-->
    </template>
  </van-nav-bar>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      :finished-text="list.length===0?'':'没有更多了'"
      @load="onLoad"
    >
      <van-cell-group v-if="list.length">
        <van-cell v-for="(i,k) in list" :key="k" :title="'兑换积分'+i.amount+'CNY'"   :label="formatDate(i.oddtime)" >
          <template #value>
            <span :style="{color:sliceStr(i.state).color}">{{sliceStr(i.state).t}}</span>
<!--            <van-button type="primary" color="#cfab98" size="mini">查看</van-button>-->
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
import { onClickLeft, formatDate } from '../../../assets/js'
import { toRefs, reactive } from 'vue'
import { APIwithdrawalRecord } from '../../../assets/js/api'

export default {
  name: 'index',
  setup () {
    const data = reactive({
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      page: 1
    })
    const methods = {
      onClickLeft,
      onLoad () {
        setTimeout(async () => {
          if (data.refreshing) {
            data.list = []
            data.refreshing = false
          }
          const res = await APIwithdrawalRecord({
            limit: 20,
            page: data.page++
          })
          if (res.data.sign) {
            data.list = data.list.concat(res.data.data)
          } else {
            data.finished = true
          }

          data.loading = false
          if (res.data.data.length < 20) {
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
      formatDate,
      sliceStr (n) {
        if (n === 0) {
          return {
            t: '待审核',
            color: '#979797'
          }
        } else if (n === 0) {
          return {
            t: '已打款',
            color: '#3ad741'
          }
        } else if (n === -1) {
          return {
            t: '已驳回',
            color: 'red'
          }
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
.detail{
  width: 100%;
  height: 100%;
  background: $bg;
  :deep().van-cell__value{
    display: flex;
    justify-content: flex-end;
    align-items: center;

    button{
      width: 50px;
      font-size: 12px;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      margin: auto;
    }
  }
}
</style>
