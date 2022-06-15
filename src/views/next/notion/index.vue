<template>
  <div class="message">
    <van-nav-bar left-arrow @click-left="onClickLeft" title="系统公告" />
    <van-cell-group v-if="msg&&msg.length>0">
      <van-cell v-for="(i,k) in msg" :key="k" :title="i.title"  :label="formatDate(i.oddtime)">
        <template #value>
          <span>{{i.content}}</span>
          <a @click="$dialog({allowHtml:true,title:i.title,message:i.content})">查看</a>
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
  </div>
</template>

<script>
import { onClickLeft, formatDate } from '../../../assets/js'
import { useStore } from 'vuex'
import { computed, reactive, toRefs } from 'vue'

export default {
  name: 'index',
  setup () {
    const { state, dispatch } = useStore()
    dispatch('getNotion')
    const data = reactive({
      msg: computed(e => state.notion)

    })
    const methods = {
      onClickLeft,
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
.message{
  width: 100%;
  height: 100%;
  background: $bg;
  :deep() .van-cell__value{
    span{
      display: inline-block;
      width: 100%;
      @include word;

    }
    a{
      border: 1px solid #e0bd9f;
      padding: 4px 14px;
      font-size: 12px;
      border-radius: 4px;
      color: #e0bd9f;
    }
  }
}
</style>
