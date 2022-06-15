<template>
  <div class="beauty">
    <van-nav-bar title="选妃"/>
    <van-tabs @click="item=null" title-active-color="#000" line-width="50%" color="#7e5678" v-model:active="active">
      <van-tab  title="城市大全">
        <div class="sm">
          注：本平台全网最真实空降约炮，为保证每个用户的个人隐私，入会仅限通过联系接待员或有过约炮成功人员实名推荐才可加入。
        </div>
        <div class="city" v-if="!item">
          <span v-for="(i,k) in arr" @click="item=i.list" :key="k">{{ i.city}}</span>
          <span class="ds" @click="active=1 ">解锁更多</span>
        </div>
        <div class="girl" v-else>
          <div v-for="(n,m) in item" :key="m">
            <p>{{n.name}}</p>
            <img :src="n.src" alt="">
          </div>
        </div>
      </van-tab>
      <van-tab title="流程价格">
        <div class="sm">
          注：本平台全网最真实空降约炮，为保证每个用户的个人隐私，入会仅限通过联系接待员或有过约炮成功人员实名推荐才可加入。
        </div>
        <div class="cs">
          <div data-v-0a1431e5=""><span data-v-0a1431e5="">有哪些资源?</span>
            <p data-v-0a1431e5="">网红、模特、空姐、嫩模、大学生，只有您想不到，没有本平台办不到</p></div>
          <div data-v-0a1431e5=""><span data-v-0a1431e5="">服务范围?</span>
            <p data-v-0a1431e5="">同城免费约炮，任意地点全国空降，国内一二线城市当地均有，三线城市也可通过联系接待员预约安排。</p>
            <p data-v-0a1431e5="">注：本平台全网最真实空降约炮，为保证每个用户的个人隐私，入会仅限通过联系接待员或有过约炮成功人员实名推荐才可加入。</p></div>
          <div data-v-0a1431e5=""><span data-v-0a1431e5="">解锁更多城市，请联系接待员即可</span></div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { girl } from '../../assets/js/mv'

export default {
  name: 'index',
  setup () {
    console.log()
    const data = reactive({
      active: 0,
      arr: girl,
      item: null
    })
    return {
      ...toRefs(data)
    }
  }
}
</script>

<style scoped lang="scss">
.beauty {
  width: 100%;
  height: 100%;
  background: $bg;

  .sm {
    width: 90%;
    margin: 20px auto;
    padding: 20px;
    background: #7E5678;
    color: #fff;
    border-radius: 10px;
    font-size: 29px;
  }
  .girl{
    width: 100%;
    padding: 5% 5% 120px;

    p{
      font-size: 30px;
      padding: 20px;
    }
    img{
      width: 100%;
    }
  }
  .city {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;

    span {
      width: 25%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
      font-size: 30px;
      font-weight: 600;

      &.ds {
        color: #7e5678;
        text-decoration: underline;
      }
    }
  }

  .cs {
    > div {
      padding: 5% 2%;
      text-align: left;

      span {
        font-size: 30px;
        font-weight: 600;
        color: red;
        padding: 20px 0;
        display: inline-block;
      }

      p {
        font-size: 30px;

      }
    }
  }
}
</style>
