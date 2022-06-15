<template>
  <div class="all">
    <p>总佣金: <span>{{ list.all_tol }}</span></p>
    <p>今日佣金: <span>{{ list.day_tol }}</span></p>
    <p>总人数: <span style="color: red">{{ list.count_users }}</span></p>
  </div>
  <van-cell-group class="agency">
    <van-cell v-for="(i,k) in list.user" :key="k">
      <template #value>
        <p class="sy">收益 <span>{{ i.count_yongjin }}</span>元</p>
        <p style="color:#d5132f;font-size:12px">流水 <span>{{ i.liushui }}</span>元</p>
      </template>
      <template #label>{{ formatDate(i.time_add) }}</template>
      <template #title>
        <span>用户：{{ i.account }}</span>
        <span class="pd">{{ i.level }}级下线</span>
      </template>
    </van-cell>
  </van-cell-group>

</template>

<script>
import { formatDate } from '../../assets/js/index'

export default {
  name: 'index',
  props: {
    list: null
  },
  setup () {
    const methods = {
      formatDate
    }
    return {
      ...methods
    }
  }
}
</script>

<style scoped lang="scss">
.all {
  background: $bg;
  padding: 20px 4%;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  p{
    margin-right: 20px;
  }
  span {
    font-size: 28px;
    font-weight: 600;
    color: #f0ae6d;
  }
}

.agency {
  :deep().van-cell__title {
    .pd {
      color: #fff;
      background: $btn;
      font-size: 12px;
      border-radius: 4px;
      padding: 2px 8px;
      margin-left: 10px;
    }

  }

  :deep().van-cell__label {
    color: #cdcaca;
  }

  :deep().van-cell__value {
    .sy{
      span {
        font-size: 16px;
        font-weight: 600;
        color: #f0ae6d;
      }
    }
  }
}
</style>
