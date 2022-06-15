<template>
  <van-tabbar v-if="show" active-color="#d71778" inactive-color="#979799" v-model="active">
    <van-tabbar-item v-for="(i,k) in navlist" :key="k" :to="i.url" :class="{active:active}" :icon="i.ico">
      {{ k === 2 ? '' : i.name }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { reactive, toRefs, computed } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'index',
  setup () {
    // router
    const route = useRoute()
    const sliceRoute = ['/', '/game', '/beauty', '/movie', '/mine'] // 需要展示nav的路由,按顺序
    // data
    const data = reactive({
      active: computed({
        get: () => sliceRoute.indexOf(route.path),
        set: val => val
      }),
      show: computed(e => sliceRoute.includes(route.path)),
      navlist: [
        {
          name: '首页',
          ico: ' icon-shouye1',
          ico2: require('../../assets/img/nav/a1.jpg'),
          url: '/'
        },
        {
          name: '预约大厅',
          ico: ' icon-yuyue1',
          ico2: require('../../assets/img/nav/b1.jpg'),
          url: '/game'
        },
        {
          name: '',
          ico: require('../../assets/img/nav/b.png'),
          ico2: require('../../assets/img/nav/b.png'),
          url: '/beauty'
        },
        {
          name: '影院',
          ico: ' icon-a-ziyuan8',
          ico2: require('../../assets/img/nav/c1.jpg'),
          url: '/movie'
        },
        {
          name: '个人',
          ico: ' icon-user ',
          ico2: require('../../assets/img/nav/d1.jpg'),
          url: '/mine'
        }
      ]
    })
    return {
      ...toRefs(data)
    }
  }
}
</script>

<style scoped lang="scss">
.van-tabbar {
  &:after{
    border-width: 0px;
  }
  :deep() .van-tabbar-item{
    .van-icon{
      font-size: 22px;
    }
    &:nth-child(3){
      .van-icon__image {
        width: 66.98px;
        height: 66.98px;
        border: 6px solid #fff;
        border-radius: 50%;
      }
    }
  }
  :deep() .van-icon__image {
    width: 30px;
    height: 30px;
  }
}

</style>
