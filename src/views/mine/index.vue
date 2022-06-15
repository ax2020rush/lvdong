<template>
  <div class="mine">
    <div class="top">
      <div class="setting">
        <van-icon @click="$router.push('/setting')" size="21" color="#fff" name="setting-o" />
      </div>
      <div @click="$router.push('/info')" class="avatar">
        <van-image
          width="3.9rem"
          height="3.9rem"
          fit="cover"
          round
          :src="info&&info.img"
        />
        <div v-if="info" class="me" @click="$router.push('/login')">
          <div class="user">
            <p>{{info.account}}</p>
            <img src="../../assets/img/vip.png" alt="">
            <span>{{info.level_name}}</span>
          </div>
          <div class="proess">
            <span></span>
          </div>
          <div v-if="false" class="jf">
            <p>2421/30000</p>
          </div>
        </div>
        <div v-else class="login" @click="$router.push('/login')">
          <p>登录/注册</p>
          <span>登录可享受服务</span>
        </div>
      </div>
    </div>

    <div class="center">
      <div class="integral">
        <div @click="$router.push('/recharge')">
          <van-icon size="24" color="#000" name=" icon-chongzhi" />
          <span>充值积分</span>
        </div>
        <div @click="$router.push('/withdraw')">
          <van-icon size="24" color="#000" name=" icon-tixian" />
          <span>兑换积分</span>
        </div>
      </div>
      <div class="mineJf" v-if="info">
        <div class="title">
          <p>我的活动积分</p>
        </div>
        <div class="reload">
          <h1>{{info&&info.jifen}}</h1>
          <div>
            <span>积分(CNY)</span>
            <van-icon @click="reload" name="replay" />
          </div>
        </div>
      </div>
      <div class="list">
        <div @click="i.path==='dl'?info?showShare=true:$router.push('/login'):$router.push(i.path)" v-for="(i,k) in list" :key="k">
          <van-icon size="21" color="#868686" :name="i.ico" />
          <span>{{i.name}}<van-icon color="#868686" name="arrow" /></span>
        </div>
      </div>
    </div>
    <van-share-sheet
      v-model:show="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onSelect">
      <template #description>
        <!--       <span>推广链接: {{loction+info.uid}}</span>-->
        <span>我的推荐ID： {{info.uid}}</span>
      </template>
    </van-share-sheet>
  </div>

</template>

<script>
import { computed, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { copy } from '../../assets/js'

export default {
  name: 'index',
  setup () {
    // vuex
    const { state, dispatch } = useStore()
    dispatch('getUserInfo', { time: 5 })
    // data
    const data = reactive({
      info: computed(e => state.userInfo),
      list: [
        { ico: ' icon-yinhangqia', name: '积分明细', path: '/jfdetail' },
        { ico: ' icon-a-tupianyihuifu-20', name: '任务记录', path: '/rwdetail' },
        { ico: ' icon-gonggaopai', name: '信息公告', path: '/notion' },
        { ico: ' icon-dianying', name: '我的电影', path: '/mymove' },
        { ico: 'friends', name: '代理中心', path: '/dl' },
        { ico: 'share', name: '分享链接', path: 'dl' }
      ],
      showShare: false,
      options: null,
      loction: window.location.origin + '/#/res?uid='
    })
    data.options = [
      // { name: '复制推广链接', icon: 'link', text: data.loction + data.info.uid, msg: '复制推广链接成功' },
      { name: '复制推荐ID', icon: 'link', text: '233', msg: '复制推荐ID成功' }
    ]
    // 方法
    const methods = {
      reload () {
        dispatch('getUserInfo', { reload: true })
      },
      onSelect  (option) {
        copy(event, option.text, option.msg)
        data.showShare = false
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
.mine{
  width: 100%;
  height: 100%;
  background: #F2F2F5;
  :deep().van-share-sheet__description{
    //text-align: left;
    span{
      background: $gbcolor;
      padding: 10px 20px;
      font-size: 14px;
      display: inline-block;
      border-radius: 4px;
      color: #fff;
      margin: 4px 0;
    }
  }
  .top{
    width: 100%;
    height: 300px;
    background: $gbcolor;
    .setting{
      width: 100%;
      padding: 20px;
      text-align: right;
    }
    .avatar{
      width: 100%;
      padding:0 6%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .login{
        text-align: left;
        padding-left: 30px;
        >*{
          padding: 4px 0;
        }
        p{
          font-size: 34px;
          color: #fff;
        }
        span{
          font-size: 24px;
          color: rgba(255,255,255,.6);
        }
      }
      .me{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding-left: 40px;
        flex: 1;
        .user{
          display: flex;
          justify-content: center;
          align-items: center;
          p{
            font-size: 30px;
            color: #fff;
          }
          img{
            width: 30px;
            margin: 0 10px;
          }
          span{
            color: #ffd849;
            font-size: 26px;
            font-weight: 600;
          }
        }
        .proess{
          width: 70%;
          height: 8px;
          background: #E5D3CB;
          margin: 14px 0;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          border-radius: 20px;
          overflow: hidden;
          span{
            background: #FFFFFF;
            height: 100%;
            width: 50%;
          }
        }
        .jf{
          color: #fff;
          font-size: 24px;
        }
      }
    }
  }
  .center{
    width: 90%;
    margin: -46px auto 0 ;
    .integral{
      width: 100%;
      background: #fff;
      display: flex;
      justify-content: center;
      padding: 26px 0;
      align-items: center;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0,0,0,.04);
      &:before{
        content: '';
        position: absolute;
        width: 1PX;
        height: 30px;
        background: #ccc;
      }
      >div{
        width: 50%;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        span{
          margin-left: 20px;
        }
      }
    }
    .mineJf{
      width: 100%;
      background: #fff;
      display: flex;
      justify-content: center;
      flex-direction: column;
      padding: 26px 0;
      margin-top: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0,0,0,.04);
      .title{
        display: flex;
        padding: 0px 0px 20px;
        width: 90%;
        margin: 0 auto;
        justify-content: flex-start;
        align-items: center;
        border-bottom: 1px solid #F7F8F9;
      }
      .reload{
        width: 90%;
        margin: 0 auto;
        display: flex;
        padding-top: 40px;
        justify-content: space-between;
        align-items: center;
        h1{
          color: #7e5678;
          font-size: 40px;
        }
        >div{
          color: #868686;
          font-size: 26px;
          span{
            padding-right: 20px;
          }
          i{
            background: #e6c3a1;
            color: #fff;
            border-radius: 50%;
            padding: 10px;

          }
        }
      }
    }
    .list{
      width: 100%;
      background: #fff;
      display: flex;
      justify-content: center;
      padding: 26px 0;
      align-items: center;
      flex-wrap: wrap;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0,0,0,.04);
      margin-top: 24px;

      >div{
        width: 50%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 30px 0 30px 6%;

        span{
          color: #868686;
          padding-left: 30px;
          >i{
            padding-left: 4px;
          }
        }
        >i{
          border: 1px solid #D5D3D3;
          border-radius: 50%;
          padding: 6px;
        }
      }
    }
  }
}
</style>
