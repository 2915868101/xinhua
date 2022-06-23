<template>
  <div class="grzx_sz g-wrap g-hp100 s-bgcfff f-tac">
    <img src="../../assets/img/grzx/logoA.svg">
    <div class="f-fs16 f-fwb f-pt20">新化县卫生健康局</div>
    <div class="f-fs12 f-pt8">当前版本：{{'V3.0.15'}}</div>
    <van-button color="#3D98FF" round size="small" class="f-fs13 f-pl15 f-pr15 f-mt12" @click="handlerMenu()">版本信息</van-button>
  </div>
</template>
<script>
  export default {
    name: 'grzx_sz',
    components: {},
    created() {
      var t = this
      t.updateTitle('个人中心')
      // 个人中心菜单显示配置
      // 判断是否注册
      t.isRegister({
        openid: t.wx_userInfo.openid,
        type: 0
      }, function(sucFun) {
        t.userInfo = sucFun.CONTENTS[0]
      })
    },
    computed: {},
    data() {
      return {}
    },
    methods: {
      handlerMenu() {
        var t = this
        t.$toast('正在建设中')
      },
    },
    mounted() {}
  }
</script>
<style scoped>
  .grzx_sz {
    background: linear-gradient(180deg, #8FCBFF 0%, #FFFFFF 34.48%);
    padding: 100px 0;
  }
</style>