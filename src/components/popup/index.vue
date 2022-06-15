<template>
  <van-popup v-if="list&&list.length" class="ps" position="top" v-model:show="show" >
   <div class="popue">
     <van-icon name="comment-circle" />
     <h1>{{list[index].title}}</h1>
     <div class="content">
       {{list[index].content}}
     </div>
     <div class="foot">
       {{index+1}}/{{list.length}}
     </div>
     <div v-if="index<list.length-1" @click="index+=1" class="click">
       下一页
     </div>
     <div v-if="index>0" @click="index-=1" class="click click2">
       上一页
     </div>
     <van-icon @click="show=false,submit()" class="close" name="close" />
   </div>
  </van-popup>
</template>

<script>
import { reactive, toRefs, watch } from 'vue'
import { APImailTo } from '../../assets/js/api'
import { useStore } from 'vuex'

export default {
  name: 'index',
  props: {
    list: null
  },
  setup (props) {
    const { dispatch, commit } = useStore()
    const data = reactive({
      show: true,
      index: 0,
      arr: []
    })
    watch(() => data.index, (val) => {
      if (!(data.arr.includes(val))) {
        data.arr.push(val)
      }
    }, {
      immediate: true
    })
    const methods = {
      async submit (num = 0) {
        if (num === data.arr.length) {
          dispatch('getUserMsg')
          commit('UPDATEsystu', true)
        } else {
          console.log()
          const res = await APImailTo({
            id: props.list[num].id
          })
          if (res.data.sign) {
            num++
            return methods.submit(num)
          }
        }
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
.popue{
  width: 80%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border-radius: 10px;
  overflow: visible;
  padding: 0 5% 80px;
  background: #fff;
  position: relative;

  :deep() .van-icon-comment-circle{
    color: #e6c3a1 !important;
    font-size: 40px !important;
    margin-top: -20px;
    background: #fff;
    border-radius: 50%;
    padding: 6px;
  }
  .close{
    color: #fff !important;
    position: absolute;
    bottom: -100px;
    left: 0;
    right: 0;
    margin: auto;
    font-size: 60px !important;
  }
  h1{
    color: #979799;
    font-size: 32px;
  }
  .content{
    color: #979799;
    text-align: justify;
    padding: 5% 0;
    min-height: 500px;
  }
  .foot{
    position: absolute;
    bottom: 0;
    left: 0;
    color: #969696;
    right: 0;
    margin: auto;
    padding: 20px 0;
  }
  .click{
    position: absolute;
    right: 5%;
    bottom: 0;
    padding: 20px 0;
    &.click2{
      left: 5%;
      right: auto;
    }
  }

}
</style>
