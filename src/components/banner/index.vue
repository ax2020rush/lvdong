<template>
  <div class="banner">
    <div class="swiper">
      <div class="swiper-wrapper">
        <div v-for="(i,k) in list" :key="k" :title="i.title" class="swiper-slide">
          <a v-if="i.href.indexOf('http')<0"><img :src="i.pic_url" alt=""></a>
          <a v-else :href="i.href"><img :src="i.pic_url" alt=""></a>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs, onMounted } from 'vue'
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
export default {
  name: 'index',
  props: {
    list: Object
  },
  setup (props) {
    // data
    const data = reactive({
    })
    // 方法
    const methods = {
      runSwiper () {
        // eslint-disable-next-line no-new
        new Swiper('.swiper', {
          autoplay: {
            delay: 3000
          },
          loop: true,
          slidesPerView: 3,
          centeredSlides: true,
          spaceBetween: 0,
          coverflow: {
            rotate: 0,
            stretch: 10,
            depth: 300,
            modifier: 1,
            slideShadows: false

          }
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
.banner {
  width: 100%;
  height: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
  .swiper {
    width: calc(100% + 1000px);
    height: 100%;
    margin: 0 auto;
    .swiper-slide {
      border-radius: 10px;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 106%;
        height: auto;
      }
      &.swiper-slide-prev,&.swiper-slide-next{
        transform: scale(.9);
      }
    }
  }
}
</style>
