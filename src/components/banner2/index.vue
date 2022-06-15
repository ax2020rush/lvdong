<template>
  <div class="banner2">
    <div class="swiper2">
      <div class="swiper-wrapper">
        <div @click="$router.push({path:'/moviedetail',query:i})" v-for="(i,k) in list" :key="k" class="swiper-slide">
          <div v-if="(k+1)<=3" class="pm"><img :src="require('../../assets/img/no/'+(k+1)+'.png')" alt=""></div>
          <img :src="i.vod_pic" alt="">
          <div class="sm">
            <span>{{i.title}}</span>
            <span>播放:{{Math.floor(Math.random()*5000)+1000}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'
import Swiper from 'swiper'

export default {
  name: 'index',
  props: {
    list: Object
  },
  setup () {
    // data
    const data = reactive({
    })
    // 方法
    const methods = {
      runSwiper () {
        // eslint-disable-next-line no-new
        new Swiper('.swiper2', {
          loop: true,
          spaceBetween: 10
        })
      }
    }
    // dom
    onMounted(e => {
      methods.runSwiper()
    })
    return {
      ...toRefs(data)
    }
  }
}
</script>

<style scoped lang="scss">
.banner2 {
  width: 100%;

  .swiper2 {
    width: 70%;

    .swiper-slide {
      border-radius: 20px;
      overflow: hidden;
      position: relative;
      height: 290px;
      display: flex;
      justify-content: center;
      align-items: center;

      .pm {
        position: absolute;
        left: 0;
        top: 0;
        width: 80px;
        height: 80px;

        img {
          height: 100%;
        }
      }
      .sm{
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

          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding: 0 10px;
          &:first-child{
            width: 70%;
          }
          &:last-child{
            width: 30%;
          }
        }
      }

      img {
        width: 100%;
      }
    }
  }
}
</style>
