<template>
  <div class="agree">
    <van-nav-bar left-arrow @click-left="onClickLeft" title="开户协议"/>
    <div class="main-content" data-v-ef3b4d0c="">
      <h2 class="head-title" data-v-ef3b4d0c="">{{title.web_title}}开户协议</h2>
      <div class="hint" data-v-ef3b4d0c="">{{title.web_title}}郑重提示：任务有风险，参与需谨慎。不向未满18周岁的青少年派发任务！</div>
      <div class="title" data-v-ef3b4d0c="">一. 服务协议的接纳</div>
      <div class="content" data-v-ef3b4d0c="">
        合法参与任务年龄的用户在注册过程中勾选"同意"《{{title.web_title}}开户协议》即表示用户完全接受本协议项下的全部条款。在任何情况下，用户使用{{title.web_title}}的任何服务，即视为用户完全同意并接受本服务协议，受到本服务协议的指引和约束。
      </div>
      <div class="title" data-v-ef3b4d0c="">二. 服务协议的修订与新增</div>
      <div class="content" data-v-ef3b4d0c="">
        {{title.web_title}}有权在必要时修改服务条款，服务条款一旦发生变动，将会在重要页面上提示修改内容。如果用户不同意所改动的内容，用户可以主动取消获得的相关服务。如果用户继续享用服务，则视为接受服务条款的变动。
        {{title.web_title}}将不定期提供其它服务，而这些其它服务可能是受不同的服务条款和条件约束的，若新服务未发布服务条款和条件时，则适用于本条款，其它未尽事宜，{{title.web_title}}有限公司拥有最终解释权利。
      </div>
      <div class="title" data-v-ef3b4d0c="">三. 相关定义</div>
      <div class="content" data-v-ef3b4d0c="">1、用户：指在{{title.web_title}}注册登记，并得到{{title.web_title}}在线认可，有资格享受{{title.web_title}}服务的注册会员。</div>
      <div class="content" data-v-ef3b4d0c="">2、任务帐户：指用户按{{title.web_title}}的要求，在{{title.web_title}}网站上设立的账户。任务账户用于存放用户通过{{title.web_title}}各充值渠道充值现金和完成任务派发的奖金。</div>
      <div class="title" data-v-ef3b4d0c="">四. 本协议服务范围</div>
      <div class="content" data-v-ef3b4d0c="">本协议服务范围包括：提供参与任务的平台；提供任务相关资讯；提供在线预付支付结算服务。任务包括预约和空降等。</div>
      <div class="content" data-v-ef3b4d0c="">本协议服务范围不包括向注册会员提供电脑终端及其附属设备、网络和通信等资源。</div>
      <div class="title" data-v-ef3b4d0c="">五. 用户资料隐私和安全</div>
      <div class="content" data-v-ef3b4d0c="">
        {{title.web_title}}承诺对用户注册资料隐私信息绝对保密。{{title.web_title}}对用户注册信息提供最大限度的安全保障。同时，用户务必对其用户密码、个人帐号等信息自行保密，免被盗用或篡改。另外每个用户都要对其帐户中的所有活动和事件负全责。用户若发现任何非法使用用户帐号或安全漏洞的情况，请立即与{{title.web_title}}联系。
        为保障用户的合法权益，避免在中奖提款时因用户注册资料与真实情况不符而发生纠纷，请用户注册时务必按照真实、全面、准确的原则填写个人资料。对因用户自身原因而造成的不能兑奖情况，{{title.web_title}}概不负责。
      </div>
      <div class="title" data-v-ef3b4d0c="">六. 免责条款</div>
      <div class="content" data-v-ef3b4d0c="">发生下列情况时，{{title.web_title}}不予承担任何法律责任：</div>
      <div class="content" data-v-ef3b4d0c="">
        1、用户资料泄露：由于用户将密码告知他人或与他人共享注册帐户，或由于用户的疏忽，由此导致的任何个人资料泄露，以及由此产生的纠纷。无论何种原因导致的用户资料未授权使用、修改，用户密码、个人帐号或注册信息被未授权篡改、盗用而产生的一切后果。
      </div>
      <div class="content" data-v-ef3b4d0c="">
        2、不可抗力及不可预见的情势发生：不可抗力和不可预见情势包括：自然灾害、政府行为、罢工、战争等；黑客攻击、计算机病毒侵入或发作、政府管制、任务派发系统服务的故障、网络故障、国家政策变化、法律法规之变化等。因不可抗力和不可预见情势造成：暂时性关闭。因不可抗力和不可预见的情势造成本协议不能履行的。
      </div>
      <div class="content" data-v-ef3b4d0c="">3、用户原因或第三方原因造成损失：由于用户自身原因、或违反法律法规，以及第三方的原因，造成用户无法使用任务服务或产生其他损失的。</div>
      <div class="content" data-v-ef3b4d0c="">
        4、用户使用链接或下载资料产生的损害：由于使用与{{title.web_title}}链接的其它网站，或者使用通过{{title.web_title}}下载或取得的资料，造成用户资料泄露、用户电脑系统损坏等情况及由此而导致的任何争议和后果。
      </div>
    </div>
  </div>
</template>

<script>
import { onClickLeft } from '../../../assets/js'
import { computed, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'index',
  setup () {
    console.log(document.title)
    const { state } = useStore()
    const data = reactive({
      title: computed(e => state.indexAll)
    })
    // 方法
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
.agree {
  .main-content{
    height: 90%;
    overflow: auto;
    padding: 20px;
    .head-title{
      padding: 20px;
      text-align: center;
      font-size: 32px;
      color: #000;
    }
    .hint{
      color: #f56c6c;
      text-align: left;
      font-size: 24px;
    }
    .title{
      color: #409eff;
      text-align: left;
      padding: 10px 0;
    }
    .content{
      font-size: 24px;
      text-align: left;
    }
  }
}
</style>
