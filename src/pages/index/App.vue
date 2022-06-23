<template>
  <div id="app" class="g-wrap f-pr">
    <div class="f-fdc g-hp100">
      <div class="f-df1 f-pr">
        <transition :name="transitionName" v-if="$store.state.wx_userInfo">
          <router-view class="child-view animated"></router-view>
        </transition>
      </div>
      <div class="footer g-h50" v-if="$route.fullPath=='/index'||$route.fullPath=='/grzx_index'||$route.fullPath=='/gnzy_index'">
        <van-tabbar class="f-bs3" active-color="#1479ff">
          <van-tabbar-item @click.native.stop="linkToPage('index','fade')">
            <span :class="[$route.fullPath=='/index'?'s-c1479ff':'s-c000']">首页</span>
            <template #icon>
              <i :class="[$route.fullPath=='/index'?'s-c1479ff':'s-c000','wsdfont' ,'wsd-shouyefangzi1f']"></i>
            </template>
          </van-tabbar-item>
          <van-tabbar-item @click.native.stop="linkToPage('gnzy_index','fade')">
            <span :class="[$route.fullPath=='/gnzy_index'?'s-c1479ff':'s-c000']">功能指引</span>
            <template #icon>
              <i :class="[$route.fullPath=='/gnzy_index'?'s-c1479ff':'s-c000','wsdfont' ,'wsd-suolvetudaohangguanli']"></i>
            </template>
          </van-tabbar-item>
          <van-tabbar-item @click.native.stop="linkToPage('grzx_index','fade')">
            <span :class="[$route.fullPath=='/grzx_index'?'s-c1479ff':'s-c000']">我的</span>
            <template #icon>
              <i :class="[$route.fullPath=='/grzx_index'?'s-c1479ff':'s-c000','wsdfont' ,'wsd-ren1']"></i>
            </template>
          </van-tabbar-item>
        </van-tabbar>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'App',
    components: {},
    computed: {},
    created() {
      var t = this
      //获取微信用户信息及 JS-SDK 配置信息
      t.initWxDataInfo()

    },
    data() {
      return {
        transitionName: 'slide-left'
      }
    },
    watch: {
      '$route'(to, from) {
        var t = this
        t.skipPage(to, from)
      },
    },
    methods: {
      aa() {
        this.$toast('正在建设中')
      }
    },
    mounted() {
      var t = this
      t.updateNowDate()
    }
  }
</script>
<style>
  body {
    font-size: 15px;
    background-color: #f4f9f9;
    -webkit-font-smoothing: antialiased;
    background-size: auto;
  }

  #app .footer>>>.van-tabbar {
    height: 50px
  }
</style>