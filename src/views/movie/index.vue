<template>
  <div class="movie">
    <van-nav-bar title="影院" />
    <van-tabs color="#ffffff"
              @change="selectTab"
              :background="scss.gbcolor"
              title-inactive-color="#ffffff"
              title-active-color="#ffffff"
              v-model:active="active">
      <van-tab  v-for="(i,k) in list" :title="i.title"  :key="k">
        <hot v-if="list" :data="item||list[0]" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { computed, reactive, toRefs } from 'vue'
import hot from '../../components/hot'
import { useStore } from 'vuex'
import scss from '../../assets/css/index.scss'

export default {
  name: 'index',

  setup () {
    // vuex
    const { state } = useStore()
    // data
    const data = reactive({
      active: 0,
      list: computed(e => state.VodList),
      item: null,
      scss: scss
    })
    // 方法
    const methods = {
      selectTab (id) {
        data.item = data.list[id]
      }
    }
    return {
      ...toRefs(data),
      ...methods
    }
  },
  components: {
    hot
  }
}
</script>

<style scoped lang="scss">
.movie{
  width:100%;
  min-height:100%;
  background:#F2F2F5;
  :deep().van-tab__panel, .van-tab__panel-wrapper{
    padding: 0 10px 68px;
    background: #F2F2F5;
  }
}
</style>
