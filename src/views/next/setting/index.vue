<template>
  <div class="setting">
    <van-nav-bar left-arrow @click-left="onClickLeft" title="设置" />
    <van-cell-group class="ff">
      <van-cell title="基本信息设置" to="/info" is-link />
      <van-cell to="/changepas" title="登录密码" is-link />
      <van-cell title="资金密码" to="/fundpas" value="已设置" is-link />
    </van-cell-group>
    <a @click="loginOut" class="btns">
      退出登录
    </a>
  </div>
</template>

<script>
import { onClickLeft, loginOut } from '../../../assets/js'

export default {
  name: 'index',
  setup () {
    // 方法
    const methods = {
      onClickLeft,
      loginOut
    }
    return {
      ...methods
    }
  }
}
</script>

<style scoped lang="scss">
.setting{
  width: 100%;
  height: 100%;
  background: $bg;
}
.btns{
  display: inline-block;
  width: 90%;
  margin: 290px auto;
  background: $btn;
  color: #fff;
  padding: 26px 0px;
  border-radius: 90px;
  font-size: 28px;
  cursor: pointer;
}
</style>
