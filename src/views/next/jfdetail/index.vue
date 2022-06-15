<template>
<div class="jfdetail">
  <van-nav-bar left-arrow @click-left="onClickLeft" title="积分明细" />
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      :finished-text="list.length?'没有更多了':''"
      @load="onLoad"
    >
      <van-cell-group v-if="list.length">
        <van-cell v-for="(i,k) in list" :key="k" :title="i.typename" :label="formatDate(i.oddtime)" >
          <template #value>
            <span :style="{color:parseInt(i.amount)>0?'#4caf50':'#dc2037'}">{{i.amount}}</span>
            <span style="color: #878787;font-size: 12px">({{i.remark}})</span>
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
import { reactive, toRefs } from 'vue'
import { APIIntegral } from '../../../assets/js/api'
import { Toast } from 'vant'

export default {
  name: 'index',
  setup () {
    // data
    const data = reactive({
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      page: 1
    })
    const methods = {
      onClickLeft,
      formatDate,
      onLoad () {
        setTimeout(async () => {
          if (data.refreshing) {
            data.list = []
            data.refreshing = false
          }
          const res = await APIIntegral({
            page: data.page++,
            limit: 20
          })
          if (res.data.sign) {
            data.list = data.list.concat(res.data.data.data)
          } else {
            data.finished = true
            Toast.fail(res.data.msg)
          }
          data.loading = false
          if (res.data.data.data.length < 20) {
            data.finished = true
          }
        }, 500)
      },
      onRefresh () {
        // 清空列表数据
        data.finished = false
        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        data.loading = true
        data.page = 1
        methods.onLoad()
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
.jfdetail{
  width: 100%;
  height: 100%;
  background: $bg;
  :deep() .van-cell__value{
    color: #dc2037;
    font-size: 16px;
    display: flex;
    flex-direction: column;
  }
}

</style>
