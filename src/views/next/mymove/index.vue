<template>
  <div class="mymovie">
    <van-nav-bar left-arrow @click-left="onClickLeft" title="我的电影"/>
    <div class="top">
      <div class="left">
        <van-image
          width="40px"
          height="40px"
          fit="cover"
          round
          :src="info.img"
        />
        <div class="center">
          <h1>Hi,{{info.name}}</h1>
          <p>完成任务领取更多的观影劵</p>
        </div>
      </div>
      <div class="right" v-if="info">
        电影卷:{{info.count}}
      </div>
    </div>
    <div class="item">
      <div class="title">
        <span><i></i>兑换记录</span>
      </div>
      <hot :mymove="true" />
    </div>
  </div>
</template>

<script>
import { onClickLeft } from '../../../assets/js'
import hot from '../../../components/hot'
import { useStore } from 'vuex'
import { computed, reactive, toRefs } from 'vue'
export default {
  name: 'index',
  components: {
    hot
  },
  setup () {
    const { state } = useStore()
    const data = reactive({
      info: computed(e => state.userInfo)
    })
    const methods = {
      onClickLeft
    }
    return {
      ...methods,
      ...toRefs(data)
    }
  }
}
</script>

<style scoped lang="scss">
.mymovie {
  width: 100%;
  height: 100%;
  background: $bg;
  .top{
    width: 95%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    border-radius: 6px;
    padding: 3%;
    margin: 20px auto;
    .right{
      border: 1px solid #7e5678;
      color: #7e5678;
      font-size: 23px;
      padding: 10px 30px;
      border-radius: 60px;
    }
    .left{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      text-align: left;
      flex: 1
    ;
     .center{
       padding-left: 5%;
       >*{
         padding: 6px 0;
       }
     }
      h1{
        font-size: 28px;
      }
      p{
        color: #979799;
        font-size: 23px;
      }
    }
  }
  .item{
    width: 95%;
    margin: 40px auto 10px;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;

      span {
        font-weight: 600;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: #848484;
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
</style>
