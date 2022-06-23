<template>
  <div class="grzx_index g-wrap g-hp100 s-bgcfff">
    <div v-if="userInfo">
      <div class="user-top f-df f-dfj s-bgcfff">
        <div>
          <img class="img-item f-fl" :src="userInfo.TX||wx_userInfo.headimgurl||$store.state.def_headimg">
          <div class="cont-item s-cfff">
            <div class="f-pt4">
              <span class=" f-fs16">{{userInfo.NAME}}</span>
            </div>
            <div class="f-pt8">
              {{regNumber(userInfo.SJHM)}}
            </div>
          </div>
        </div>
        <div class="s-cfff f-pt15" @click="linkToPage('grzx_grzl',userInfo)"> <i class="iconfont icon-arrow-right f-fs14"></i></div>
      </div>
      <div class="box-wrap ">
        <div class="menu-list">
          <div class="list-item f-pt20 f-df f-dfj" v-for="(c,i) in jzjlList" :key="i" @click="handlerMenu(c)">
            <div class="f-df">
              <div :class="['list-item-1 f-mr10 f-fs20  s-cfff wsdfont',c.icon]" :style="{background:c.bgcolor}"></div>
              <div class="f-fs16 f-pt6">{{c.tit}}</div>
            </div>
            <i class="f-pt3 s-cC8C9CC wsdfont wsd-jiantouyou f-fs20"></i>
          </div>
        </div>
      </div>
      <van-divider />
      <div class="box-wrap ">
        <div class="menu-list">
          <div class="list-item f-pb20 f-df f-dfj" v-for="(c,i) in gdfwList" :key="i" @click="handlerMenu(c)">
            <div class="f-df">
              <div :class="['list-item-1 f-mr10 f-fs20  s-cfff wsdfont',c.icon]" :style="{background:c.bgcolor}"></div>
              <div class="f-fs16 f-pt6">{{c.tit}}</div>
            </div>
            <i class="f-pt3 s-cC8C9CC wsdfont wsd-jiantouyou f-fs20"></i>
          </div>
          <!-- 池州、广德移动BI -->
          <!-- <div class="list-item f-df" v-if="(serverType=='gd'||serverType=='cz')&&userInfo.LDJOB" @click="towebBI">
            <img class="item-l" src="../../assets/img/grzx/ldcx_icon.png">
            <span class="item-r">运营监管</span>
          </div>
          <div class="list-item f-df" v-if="serverType=='gd'&&userInfo.LDJOB" @click="toXGYMYY">
            <img class="item-l" src="../../assets/img/grzx/ldcx_icon.png">
            <span class="item-r">新冠疫苗预约</span>
          </div> -->
        </div>
      </div>
    </div>
    <div class="g-h50"></div>
  </div>
</template>
<script>
  export default {
    name: 'grzx_index',
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

      // console.log(t.searchTree(t.treeData, '00'))
    },
    computed: {},
    data() {
      return {
        userInfo: '',
        gdfwList: [{
          icon: 'wsd-renyisheng1f',
          bgcolor: '#EB2F96',
          tit: '我的医生',
          link: 'doctor_lists'
        }, {
          icon: 'wsd-yingyongxiangzif',
          bgcolor: '#722ED1',
          tit: '我的收藏',
          link: ''
        }, {
          icon: 'wsd-shezhif',
          bgcolor: '#1479FF',
          tit: '设置',
          link: 'grzx_sz'
        }],
        jzjlList: [{
          icon: 'wsd-binglirilirizhif',
          bgcolor: '#1479FF',
          tit: '我的挂号',
          link: 'grzx_ghjl'
        }, {
          icon: 'wsd-jianchabaogaowendangchazhaof',
          bgcolor: '#13C2C2',
          tit: '我的报告',
          link: 'bgcx_index'
        }, {
          icon: 'wsd-renhuanzhe1f',
          bgcolor: '#FA8C16',
          tit: '电子健康卡管理',
          link: 'people_lists'
        }, {
          icon: 'wsd-xiaoxif',
          bgcolor: '#52C41A',
          tit: '我的消息',
          link: ''
        }]
      }
    },
    methods: {

      // searchTree(data, id) {
      //   var i;
      //   // 首先循环所有父节点，根据判断条件返回对应数据
      //   for (i = 0; i < data.length; i++) {
      //     if (data[i].id == id) {
      //       return data[i];
      //     }
      //   }

      //   var childRes = [];
      //   // 再回调，循环遍历所有子节点
      //   for (i = 0; i < data.length; i++) {
      //     childRes[i] = this.searchTree(data[i].children, id);
      //     if (childRes[i] != 0) {
      //       return childRes[i];
      //     }
      //   }

      //   return 0;
      // },
      towebBI() {
        var t = this
        if (t.serverType == 'gd') {
          window.location.href = 'http://www.jkgd12320.com:8086/pages/app/templates/gnlb/'
        }
      },
      toXGYMYY() {
        let t = this
        t.ajax({
          loading: false,
          serverId: 'WXGDYYGHTZH09',
          url: t.serverPath1,
          params: {
            OPENID: t.wx_userInfo.openid
          },
          success: function(data) {
            if (data[0].CONTENTS.length) {
              t.linkToPage('xgymyy_qryy')
            } else {
              t.linkToPage('xgymyy_index')
            }
          }
        })
      },
      handlerMenu(data) {
        console.log(data)
        var t = this
        if (data.islink == '1') {
          window.location.href = data.link
        } else {
          if (data.link) {
            t.linkToPage(data.link)
          } else {
            if (data.tit) {
              t.$toast('正在建设中')
            }
          }
        }
      },
    },
    mounted() {}
  }
</script>
<style scoped>
  .grzx_index {
    background: linear-gradient(180deg, #8FCBFF 0%, #FFFFFF 34.48%);
    padding: 16px;
  }

  .grzx_index .user-top {
    background: linear-gradient(96.21deg, #66B3FF 45.09%, #3D98FF 100%);
    border-radius: 8px;
    padding: 16px;
    font-size: 14px;
  }

  .grzx_index .user-top .img-item {
    width: 45px;
    height: 45px;
    border-radius: 4px;
  }

  .grzx_index .user-top .cont-item {
    margin-left: 56px;
    height: 45px;
  }


  .grzx_index .box-wrap {
    color: #323233;
  }

  .grzx_index .box-wrap .menu-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .grzx_index .box-wrap .list-item {
    flex: 100%;
    align-items: center;
  }

  .grzx_index .box-wrap .list-item .list-item-1 {
    border-radius: 4px;
    padding: 3px 3px 1px 3px
  }

  .grzx_index .box-wrap .list-item:nth-child(even) {
    flex: 35%;
  }
</style>