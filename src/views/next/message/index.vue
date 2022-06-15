<template>
  <div class="message">
    <van-nav-bar left-arrow @click-left="onClickLeft" title="会员消息" />
    <van-cell-group v-if="msg&&msg.length>0">
      <van-cell v-for="(i,k) in msg" :key="k" :title="i.title"  >
        <template #label>
          <a class="ck" @click="chakan(i)">查看</a>
        </template>
        <template #value>
          <span>{{i.content}}</span>
          <span class="stu" v-if="i.status===0">未读</span>
          <van-icon color="#8bc34a" v-if="i.status===1" name="success" />

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
import { onClickLeft } from '../../../assets/js'
import { useStore } from 'vuex'
import { computed, reactive, toRefs } from 'vue'
import { Dialog } from 'vant'
import { APImailTo } from '../../../assets/js/api'

export default {
  name: 'index',
  setup () {
    const { state, dispatch } = useStore()
    dispatch('getUserMsg')
    const data = reactive({
      msg: computed(e => state.usermsg)
    })
    const methods = {
      onClickLeft,
      async chakan (i) {
        Dialog({ allowHtml: true, title: i.title, message: i.content })
        if (i.id) {
          const res = await APImailTo({
            id: i.id
          })
          if (res.data.sign) {
            dispatch('getUserMsg')
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
.message{
  width: 100%;
  height: 100%;
  background: $bg;
  :deep().van-cell__value{
    display: flex;
    flex-direction: column;
    .stu{
      margin-right: 0px;
      font-size: 12px;
      color: #ff5858;
    }
  }
}
.ck{
  background: #e0bd9e;
  color: #fff;
  padding: 4px 20px;
  border-radius: 4px;
}

</style>
