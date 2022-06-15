<template>
  <div>
    <van-nav-bar  left-arrow @click-left="onClickLeft" title="代理中心" />
    <van-tabs color="transparent" title-active-color="#805879" title-inactive-color="#b0b0b0" v-model:active="active">
      <van-tab title="全部">
        <agency v-if="list&&list.user.length" :list="list"  />
        <van-empty
          v-else
          style="margin-top: 100px"
          image="https://cdn.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
          image-size="80"
          description="暂无数据"
        />
      </van-tab>
      <van-tab >
        <template #title>
          一级下线<span style="font-size: 12px" v-if="list2&&list2.user.length">({{list2.user.length}})</span>
        </template>
        <agency v-if="list&&list.user.length" :list="list2"  />
        <van-empty
          v-else
          style="margin-top: 100px"
          image="https://cdn.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
          image-size="80"
          description="暂无数据"
        />
      </van-tab>
      <van-tab>
        <template #title>
          二级下线 <span style="font-size: 12px" v-if="list3&&list3.user.length">({{list3.user.length}})</span>
        </template>
        <agency v-if="list&&list.user.length" :list="list3"  />
        <van-empty
          v-else
          style="margin-top: 100px"
          image="https://cdn.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
          image-size="80"
          description="暂无数据"
        />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { onClickLeft } from '../../../assets/js'
import { APITg } from '../../../assets/js/api'
import { reactive, toRefs } from 'vue'
import agency from '../../../components/agency'

export default {
  name: 'index',
  components: {
    agency
  },
  setup () {
    const data = reactive({
      active: 0,
      list: null,
      list2: null,
      list3: null
    })

    const methods = {
      onClickLeft,
      async init () {
        const res = await APITg({
          page: 1,
          limit: 100
        })
        if (res.data.sign) {
          const arr = res.data.data
          data.list = arr
          data.list2 = { ...arr, user: arr.user.filter(b => b.level === 1) }
          data.list3 = { ...arr, user: arr.user.filter(b => b.level === 2) }
        }
      }

    }
    methods.init()
    return {
      ...methods, ...toRefs(data)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
