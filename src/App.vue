<template>
  <router-view/>
  <navbar />
</template>

<script>
import navbar from './components/navbar'

import { useStore } from 'vuex'
export default {
  name: 'App',
  setup () {
    // vuex
    const { dispatch } = useStore()
    dispatch('getIndexAll') // 进入页面更新首页全部
    dispatch('getReserveAll') // 进入页面更新预约大厅
    dispatch('getVodList') // 进入页面更新电影大厅
  },
  components: {
    navbar
  }
}
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
  font-style: normal;
  box-sizing: border-box;
  //user-select: none;
  font-family: vant-icon,iconfont, Avenir, Helvetica, Arial, sans-serif;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  position: absolute;
  width: 500PX;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  left: 0;
  right: 0;
  bottom: 0;
  font-size: 26px;
  color: #000;
  top: 0;
  margin: auto;
  box-shadow: 0 0 4px rgba(0,0,0,.2);
}
@media (max-width: 500PX) {
  #app{
    width: 100%;
  }
}
</style>
