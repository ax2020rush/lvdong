<template>
  <div class="move">
    <van-nav-bar left-arrow @click-left="onClickLeft" :title="query.title"/>
    <div :style="{display:loading?'block':'none'}">
      <div id="dplayer" v-show="options.video.url">
      </div>
    </div>
    <div class="poster" v-if="!options.video.url||!loading">
      <div v-if="!loading&&!error">
        <van-loading size="24px">正在载入高清资源，请耐心等候…</van-loading>
      </div>
      <div style="color: #f41b1b" v-if="error">
        加载失败，<a style="color: #e8dede" @click="reload">刷新</a>
      </div>
      <img :src="query.vod_pic" alt="">
    </div>

    <div class="title">
      <p>{{ query.title }}</p>
      <span>{{ Math.floor(Math.random() * 5000) + 1000 }}播放</span>
    </div>
    <div class="item">
      <div class="title">
        <span><i></i>热门推荐</span>
      </div>
      <hot v-if="indexAll.Recommend" :array="indexAll.Recommend" :status="true"/>
    </div>
    <van-popup position="top" v-model:show="show">
      <div class="box">
        <div class="title">
          <span></span>
          <p>视频播放</p>
          <van-icon @click="show=false" name="cross" />
        </div>
        <div class="content">
          <h1>您没有可用观影劵</h1>
          <a :href="kfurl" target="_blank">联系客服或接待员</a>
          <p>我的观影劵：<span>0张</span></p>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import hot from '../../../components/hot'

import { onClickLeft } from '../../../assets/js'
import { computed, reactive, toRefs, watch } from 'vue'
import { useRoute, onBeforeRouteLeave } from 'vue-router'
import { useStore } from 'vuex'
import { APIvodDuihuan, APIvodFind } from '../../../assets/js/api'
import { Dialog, Toast } from 'vant'
import Hls from 'hls.js'

import DPlayer from 'dplayer'
export default {
  name: 'index',
  setup () {
    // vuex
    const { state, dispatch } = useStore()
    // router
    dispatch('getUserInfo')
    // const { push } = useRouter()
    const route = useRoute()
    if (!route.query.vod_url) {
      // push('/')
    }
    onBeforeRouteLeave(e => {
      location.reload()
    })

    const data = reactive({
      loading: false,
      error: false,
      query: computed(e => route.query),
      indexAll: computed(e => state.indexAll),
      info: computed(e => state.userInfo),
      isDh: true,
      timer: null,
      kfurl: computed(e => state.indexAll && state.indexAll.kefu),
      show: false,
      number: 0,
      options: {
        width: '200px',
        video: {
          url: null,
          type: 'customHls',
          muted: true,
          pic: computed(e => route.query.vod_pic),
          customType: {
            customHls: function (video, player) {
              const hls = new Hls()
              hls.loadSource(video.src)
              hls.attachMedia(video)
            }
          }
        }
      }
    })
    // 方法
    const methods = {
      onClickLeft,
      reload () {
        location.reload()
      },
      onPlayer () {
        // eslint-disable-next-line no-new
        const db = new DPlayer({ ...data.options, container: document.getElementById('dplayer') })
        db.on('loadstart', e => {
          data.loading = true
        })
        db.on('loadeddata', e => {
          methods.stop()
        })
        db.on('pause', e => {
          methods.stop()
        })
        db.on('playing', e => {
          methods.timeupdate()
        })
        db.on('error', e => {
          console.log('报错了')
          data.error = true
        })
      },
      timeupdate (ev) {
        if (!data.isDh) {
          data.timer = setInterval(e => {
            data.number++
            if (data.number > 5) {
              clearInterval(data.timer)
              if (!data.info.count) {
                data.show = true
                data.options.video.url = ''
                return
              }
              const str = data.info.count ? '当前视频需要使用1张观影卷，是否使用,\n剩余观影劵' + '(<span style="color: red">' + data.info.count + '</span>)' : '当前视频需使用观影卷，请联系客服兑换'
              data.options.video.url = ''
              Dialog.confirm({
                title: '提示',
                allowHtml: true,
                message: str,
                theme: 'round-button'

              })
                .then(async () => {
                  // on confirm
                  const r = await APIvodDuihuan({
                    vod_id: route.query.id || route.query.vod_id
                  })
                  if (r.data.sign) {
                    Toast.success('兑换成功')
                    const d = await APIvodFind({
                      vod_id: route.query.id || route.query.vod_id
                    })
                    if (d.data.sign) {
                      data.isDh = true
                      data.options.video.url = d.data.data.vod_url
                    } else {
                      data.isDh = false
                      Toast.fail(r.data.msg)
                    }
                    dispatch('getUserInfo')
                  }
                })
                .catch(e => {

                })
            }
          }, 1000)
        }
      },
      stop () {
        clearInterval(data.timer)
      },
      async init () {
        data.loading = false
        data.error = false
        data.options.video.url = null
        const res = await APIvodFind({
          vod_id: route.query.id || route.query.vod_id
        })
        if (res.data.sign) {
          data.isDh = true
          data.options.video.url = res.data.data.vod_url
        } else {
          data.isDh = false
          data.options.video.url = res.data.data.vod_url
        }
      }
    }
    watch(route, (val) => {
      methods.init()
    }, {
      immediate: true
    })
    watch(() => (data.options.video.url), val => {
      methods.onPlayer()
    })
    watch(() => (data.timer), (val, old) => {
      clearInterval(old)
    })
    return {
      ...methods,
      ...toRefs(data)
    }
  },
  components: {
    hot
  }
}
</script>

<style scoped lang="scss">
.move {
  width: 100%;
  min-height: 100%;
  background: $bg;
  :deep().van-popup--top{
    top: 0;
    bottom: 0;
    margin: auto;
    background: none;
    display: flex;
    justify-content: center;
    align-items: center;
    .box{
      width: 90%;
      height: 200px;
      background: #fff;
      border-radius: 10px;
      overflow: hidden;
      .title{
        background: $gbcolor;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #fff;
        padding:4% 5%;
        p{
          font-size: 16px;
        }
        i{
          color: #fff;
        }
      }
      .content{
        h1{
          font-size: 18px;
          padding: 30px 0;
        }
        a{
          background: $btn;
          color: #fff;
          padding: 10px 20px;
          border-radius: 90px;
          font-size: 12px;
        }
        p{
          padding: 20px 0;
          span{
            color: red;
          }
        }
      }
    }
  }
  :deep().d-player-video-main{
    width: 96% !important;
    height: auto !important;
  }
  :deep().d-player-wrap{
    height: auto;
  }

  > .title {
    background: #fff;
    width: 100%;
    padding: 20px 3%;
    text-align: left;

    > * {
      padding: 0px 0;
    }

    p {
      font-weight: 600;
      color: #000;
      font-size: 25px;
      margin-bottom: 30px;
    }

    span {
      color: #979799;
      font-size: 24px;
    }
  }

  .item {
    width: 100%;
    padding: 20px;

    > .title {
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
          background: #7e5678;
          display: inline-block;
          margin-right: 6px;
          border-radius: 10px;
        }
      }

      a {
        color: #979799;
      }
    }
  }
}
.poster{
  width: 100%;
  height: 400px;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  >div{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0,0,0,.8);
    display: flex;
    justify-content: center;
    align-items: center;
    .van-loading{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  img{
    height: 100%;
  }
}
</style>
