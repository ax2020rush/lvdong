<template>
  <div class="index">
    <div class="head">
      <img src="@/assets/img/logo.png" alt="">
      <van-icon :badge="weidu(usermsg)"  @click="$router.push('/message')" name=" icon-xiaoxi"/>
    </div>
    <banner :list="indexAll.rotation" v-if="indexAll&&indexAll.rotation" class="banners"/>
    <!--    滚动公告-->
    <van-notice-bar
      :scrollable="true"
      left-icon=" icon-laba_bg"
      color="#333333"
      background="#ffffff"
      v-if="indexAll&&indexAll.gundong"
      :text="indexAll.gundong"
    />
    <!--    内容-->
    <div class="item">
      <div class="title">
        <span><i></i>约炮活动</span>
        <a href="#/game">查看更多></a>
      </div>
      <ul class="list" v-if="indexAll&&indexAll.cp_data">
        <li @click="$router.push({path:'/lottery',query:i})" v-for="(i,k) in indexAll.cp_data" :key="k">
          <div class="image">
            <img :src="i.logo_pic" alt="">
          </div>
          <p>{{i.title}}</p>
        </li>
      </ul>
    </div>
    <div class="item hot">
      <div class="title">
        <span><i></i>人气最高</span>
        <a href="#/movie">查看更多></a>
      </div>
      <banners v-if="indexAll&&indexAll.Top" :list="indexAll.Top" />
      <div class="title">
        <span><i></i>热门推荐</span>
        <a href="#/movie">查看更多></a>
      </div>
      <hot v-if="indexAll&&indexAll.Recommend" :array="indexAll.Recommend" :status="true" />
      <a @click="$router.push('/movie')">查看更多</a>
    </div>
    <popup v-if="qztc&&token&&!systu" :list="qztc" />
  </div>
</template>

<script>
import popup from '../../components/popup'

import banner from '../../components/banner'
import banners from '../../components/banner2'
import hot from '../../components/hot'
import { useStore } from 'vuex'
import { computed, reactive, toRefs } from 'vue'
export default {
  name: 'index',
  setup () {
    // vuex
    const { state, dispatch } = useStore()
    dispatch('getUserMsg')
    // data
    const data = reactive({
      indexAll: computed(e => state.indexAll),
      usermsg: computed(e => state.usermsg),
      qztc: computed(e => (state.usermsg && state.usermsg.filter(e => e.status === 0 && e.type === 1)) || []),
      token: computed(e => state.token),
      systu: computed(e => state.systu)
    })
    const methods = {
      weidu (arr) {
        if (arr) {
          const wd = arr.filter(e => e.status === 0)
          if (wd.length === 0) {
            return ''
          } else {
            return wd.length
          }
        } else {
          return ''
        }
      }
    }
    return {
      ...toRefs(data),
      ...methods
    }
  },
  components: {
    banner,
    banners,
    hot,
    popup
  }
}
</script>

<style scoped lang="scss">
.index {
  width: 100%;
  :deep().ps{
    width: 100%;
    height: 100%;
    background: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .head {
    padding: 10px 20px;
    height: 180px;
    background: $gbcolor;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    > img {
      width: 164px;
    }

    > i {
      font-size: 54px;
      color: #fff;
      margin-top: 14px;
    }
  }

  .banners {
    margin: -80px auto 0;
  }

  .item {
    width: 100%;
    padding: 20px;
    >a{
      font-size: 24px;
      color: #979799;
      padding: 20px 0;
      display: block;
    }
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;

      span {
        font-weight: 600;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        i {
          width: 8px;
          height: 30px;
          background: $ico;
          display: inline-block;
          margin-right: 6px;
          border-radius: 10px;
        }
      }

      a {
        color: #979799;
      }
    }
    .list{
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      li{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 25%;
        padding-top: 40px;
        .image{
          width: 50%;
          height: 87px;
          border-radius: 30px;
          overflow: hidden;
          img{
            width: 100%;
          }
        }
        p{
          font-size: 24px;
          padding-top: 15px;
        }
      }
    }
    &.hot{
      background: #F2F2F5;
      padding: 20px 20px 120px 20px;
      .title{
        padding: 20px 0;
      }
    }
  }

  :deep() .van-icon {
    font-size: 24px;
    color: #cacaca;
  }

  :deep() .van-notice-bar__wrap {
    padding: 0 10px;
    font-size: 13px;
  }
}
</style>
