<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      :finished-text="status||list.length===0?'':'没有更多了'"
      @load="onLoad"
    >
      <ul class="hot" v-if="(array&&array.length)||list.length">
<!--        {{data.vod_type_id}}-->
        <li @click="$router.push({path:'/moviedetail',query:i})" v-for="(i,k) in (array||list)" :key="k">
          <img :src="i.vod_pic" alt="">
          <div>
            <span>{{i.title}}</span>
            <span>播放:{{Math.floor(Math.random()*9000)+1000}}</span>
          </div>
        </li>
      </ul>
      <van-empty
        v-if="(list.length===0&&(array&&array.length===0))||(list.length===0&&mymove)"
        style="margin-top: 100px"
        image="https://cdn.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
        image-size="80"
        description="暂无数据"
      />
    </van-list>
  </van-pull-refresh>

</template>

<script>
import { reactive, toRefs } from 'vue'
import { APIvodRecord, APIVodType } from '../../assets/js/api'
import { Toast } from 'vant'

export default {
  name: 'index',
  props: {
    status: {
      type: Boolean,
      default: false
    },
    mymove: {
      type: Boolean,
      default: false
    },
    array: Object,
    data: null
  },
  setup (props) {
    // data
    const data = reactive({
      list: [],
      loading: props.status,
      finished: props.status,
      refreshing: props.status,
      page: 1
    })
    // 方法
    const methods = {
      onLoad () {
        setTimeout(async () => {
          if (data.refreshing) {
            data.list = []
            data.refreshing = false
          }
          let res
          if (props.mymove) {
            res = await APIvodRecord({
              page: data.page++,
              limit: 20
            })
            if (res.data.sign) {
              data.list = data.list.concat(res.data.data)
            } else {
              data.finished = true
              Toast.fail(res.data.msg)
            }
          } else {
            res = await APIVodType({
              vod_type_id: props.data.vod_type_id,
              page: data.page++,
              limit: 20
            })
            if (res.data.sign) {
              data.list = data.list.concat(res.data.data)
            } else {
              data.finished = true
              Toast.fail(res.data.msg)
            }
          }

          data.loading = false
          if (res.data.data.length < 20) {
            data.finished = true
          }
        }, 500)
      },
      onRefresh () {
        if (props.status) {
          data.refreshing = false
          return
        }
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
      ...toRefs(data),
      ...methods
    }
  }
}
</script>

<style scoped lang="scss">
.hot{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  li{
    width: calc(50% - 10px);
    border-radius: 20px;
    overflow: hidden;
    margin-top: 20px;
    height: 260px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      height: 100%;
    }
    >div{
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
      background: rgba(0,0,0,.4);
      padding: 10px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span{
        color: #fff;
        font-size: 24px;
        width: 50%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 0 10px;
      }
    }
  }
}
</style>
