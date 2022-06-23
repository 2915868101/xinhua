<template>
  <div class="gnzy_index">
    <div class="m-list s-c000">
      <div class="m-list-1 f-mb10">看病指引</div>
      <div class="f-df f-dfj f-ml16 f-mr16">
        <div v-for="(c,i) in list1.slice(0,3)" :key="i" @click="tz(c)">
          <div class="m-list-item f-tac" :style="{background:c.background}">
            <img :src="c.img" width="50px" />
            <div>{{c.titlt}}</div>
          </div>
        </div>
      </div>
      <div class="f-df f-dfj f-ml16 f-mr16 f-mt10">
        <div v-for="(c,i) in list1.slice(3,6)" :key="i" @click="tz(c)">
          <div class="m-list-item f-tac" :style="{background:c.background}">
            <img :src="c.img" width="50px" />
            <div>{{c.titlt}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="m-list s-c323233 f-mt12">
      <div class="m-list-1">个人指引</div>
      <div class="f-df f-dfj f-ml10 f-mr10 f-pt12">
        <div v-for="(c,i) in list2.slice(0,4)" :key="i" @click="tz(c)">
          <div class="m-list-item2 f-tac" :style="{background:c.background}">
            <img :src="c.img" width="25px" />
            <div class="f-pt6">{{c.titlt}}</div>
          </div>
        </div>
      </div>
      <div class="f-df f-dfj f-ml10 f-mr10 f-pt15 f-pb10">
        <div v-for="(c,i) in list2.slice(4,8)" :key="i" @click="tz(c)">
          <div class="m-list-item2 f-tac" :style="{background:c.background}">
            <img :src="c.img" width="25px" />
            <div>{{c.titlt}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'gnzy_index',
    components: {},
    created() {
      var t = this
      t.updateTitle('功能指引')
      // 判断是否注册
      t.isRegister({
        openid: t.wx_userInfo.openid,
        type: 0
      }, function(sucFun) {
        t.userInfo = sucFun.CONTENTS[0]
        console.log(sucFun)
      })
    },
    computed: {},
    data() {
      return {

        list1: [{
          titlt: '预约挂号',
          img: require('../../assets/img/index/yuyue.png'),
          background: 'linear-gradient(135deg,#F8FCFF 0%, #E6F5FF 100%)',
          url: 'yygh_index'
        }, {
          titlt: '报告查询',
          img: require('../../assets/img/index/baogao.png'),
          background: 'linear-gradient(135deg,#F6F9FF 0%, #F0F5FF 100%)',
          url: 'bgcx_index'
        }, {
          titlt: '智能导诊',
          img: require('../../assets/img/index/zhineng.png'),
          background: 'linear-gradient(135deg,#F0FFFD 0%, #E6FFFB 100%)',
          url: 'guidance_index'
        }, {
          titlt: '电子健康卡',
          img: require('../../assets/img/index/dianzi.png'),
          background: 'linear-gradient(135deg,#FBF6FF 0%, #F9F0FF 100%)',
          url: 'people_lists'
        }, {
          titlt: '慢病管理',
          img: require('../../assets/img/index/manbing.png'),
          background: 'linear-gradient(135deg,#FFF6F9 0%, #FFF0F6 100%)',
          url: 'mbgl_index'
        }, {
          titlt: '搜索医院/医生',
          img: require('../../assets/img/index/yiyuan.png'),
          background: 'linear-gradient(135deg,#FFFAF0 0%, #FFF7E6 100%)',
          url: 'index_search'
        }],
        list2: [{
          titlt: '健康档案',
          img: require('../../assets/img/index/zj.png'),
          url: 'jkda_index'
        }, {
          titlt: '我的挂号',
          img: require('../../assets/img/index/rlrz.png'),
          url: 'grzx_ghjl'
        }, {
          titlt: '就诊人管理',
          img: require('../../assets/img/index/renxz.png'),
          url: ''
        }, {
          titlt: '我的医生',
          img: require('../../assets/img/index/renys.png'),
          url: 'doctor_lists'
        }, {
          titlt: '我的收藏',
          img: require('../../assets/img/index/yy.png'),
          url: ''
        }, {
          titlt: '我的消息',
          img: require('../../assets/img/index/xx.png'),
          url: ''
        }, {
          titlt: '个人信息',
          img: require('../../assets/img/index/ren1.png'),
          url: 'grzx_grzl'
        }, {
          titlt: '设置',
          img: require('../../assets/img/index/sz.png'),
          url: 'grzx_sz'
        }]
      }
    },
    methods: {
      tz(val) {
        var t = this
        if (val.url == 'grzx_grzl') {
          t.linkToPage(val.url, t.userInfo)
        } else if (val.url) {
          t.linkToPage(val.url)
        } else {
          t.$toast('正在建设中')
        }

      }
    },
    mounted() {}
  }
</script>
<style scoped>
  .gnzy_index {
    background: linear-gradient(180deg, #8FCBFF 0%, #F4F7FB 34.48%);
    padding: 16px;
  }

  .gnzy_index .m-list {
    background: #fff;
    border-radius: 8px;
    font-size: 12px;
    padding: 15px 0
  }

  .gnzy_index .m-list-1 {
    border-left: 3px solid #3D98FF;
    padding: 0 13px;
    color: #969799;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
  }

  .gnzy_index .m-list-item {
    border-radius: 8px;
    padding: 10px 9px 20px 9px;
    width: 97px;
  }

  .gnzy_index .m-list-item2 {
    border-radius: 8px;
    padding: 10px;
    width: 80px;
  }
</style>