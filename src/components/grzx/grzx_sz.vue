<template>
  <div class="grzx_sz g-wrap g-hp100 s-bgcfff">
    <div class="list-item f-pt10 f-pb15 f-df f-dfj" v-for="(c,i) in List" :key="i" @click="handlerMenu(c)">
      <div class="f-df">
        <div :class="['list-item-1 f-mr15 f-fs20  s-cfff wsdfont',c.icon]" :style="{background:c.bgcolor}"></div>
        <div class="f-fs16 f-pt6">{{c.tit}}</div>
      </div>
      <i class="f-pt3 s-cC8C9CC wsdfont wsd-jiantouyou f-fs20"></i>
    </div>
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
      return {
        List: [{
          icon: 'wsd-xiaoxifangxingqipaof',
          bgcolor: '#13C2C2',
          tit: '留言反馈',
          link: ''
        }, {
          icon: 'wsd-shoujidianhuaxinxilianxifangshif',
          bgcolor: '#1479FF',
          tit: '更换手机号',
          link: 'grzx_xg_sjhm'
        }, {
          icon: 'wsd-jichengshitupeizhiwendangshezhiduogef',
          bgcolor: '#722ED1',
          tit: '版本信息',
          link: 'grzx_xx'
        }],
      }
    },
    methods: {
      handlerMenu(data) {
        console.log(data)
        var t = this
        if (data.islink == '1') {
          window.location.href = data.link
        } else if (data.link == 'grzx_xg_sjhm') {
          t.linkToPage(data.link, t.userInfo)
        } else if (data.link) {
          t.linkToPage(data.link)
        } else {
          if (data.tit) {
            t.$toast('正在建设中')
          }
        }
      },
    },
    mounted() {}
  }
</script>
<style scoped>
  .grzx_sz {
    padding: 16px;
  }

  .grzx_sz .list-item {
    flex: 100%;
    align-items: center;
  }

  .grzx_sz .list-item .list-item-1 {
    border-radius: 4px;
    padding: 3px 3px 1px 3px
  }
</style>