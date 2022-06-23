<template>
  <div class="zwb_jkzc g-wrap g-hp100">
    <div class="head-wrap s-cfff f-df f-dfv">
      <span class="f-fwb f-fs16">健康自测</span><span class="history" @click="linkToPage('/zwb_jkzc_history',{cnum:userInfo.CARD_NUMBER})">自测历史</span>
    </div>
    <!-- 问卷类型列表 -->
    <div class="tm-content">
      <ul class="m-contList">
        <li class="arrow f-mt15" v-for="(r,i) in listData" :key="i" @click="onSurvEvet(r)">
          <i class="icon" :style="{'background-image':'url('+items[i]+'),none'}"></i>{{r.COLNAME}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'zwb_jkzc',
  components: {},
  created() {
    var t = this
    t.updateTitle('健康自测')
    t.$store.state.cacheFlag = 1
    // 判断是否注册
    t.isRegister({ openid: t.wx_userInfo.openid, type: 0 }, function(sucFun) {
      t.userInfo = sucFun.CONTENTS[0]
      t.getQuesImpl()
    })
  },
  computed: {

  },
  data() {
    return {
      userInfo: '',
      items: [
        require('../../assets/img/zwb/list_icon1.svg'),
        require('../../assets/img/zwb/list_icon2.svg'),
        require('../../assets/img/zwb/list_icon3.svg'),
        require('../../assets/img/zwb/list_icon4.svg'),
        require('../../assets/img/zwb/list_icon5.svg'),
        require('../../assets/img/zwb/list_icon6.svg'),
        require('../../assets/img/zwb/list_icon7.svg'),
      ],
      listData: ""
    }
  },
  methods: {
    /*调用获取问卷类型接口*/
    getQuesImpl: function() {
      var t = this
      t.ajax({
        serverId: 'WXTJ00011',
        params: {},
        url: t.serverPath1,
        success(data) {
          t.listData = data;
        }
      })
    },
    /*调用获取是否可做问卷接口*/
    getFlagImpl: function(r) {
      var t = this
      t.ajax({
        method: 'post',
        serverId: 'WXTJ00029',
        params: {
          openid: t.wx_userInfo.openid,
          columnid: r.COLUMNID,
          cnum: t.userInfo.CARD_NUMBER
        },
        url: t.serverPath1,
        success(data) {
          //进入问卷填写页面
          if (data[0].BEAN == 'YES') {
            t.linkToPage('/zwb_jkzc_detail', Object.assign({}, { openid: t.wx_userInfo.openid, cnum: t.userInfo.CARD_NUMBER }, r))
          }
          //提示填写就诊档案
          else {
            t.show = true;
          }
        }
      })
    },
    /* 问卷列表点击事件 */
    onSurvEvet: function(r) {
      var t = this;
      t.getFlagImpl(r);
    },
  },
  mounted() {}
}
</script>
<style scoped>
.zwb_jkzc .head-wrap {
  position: fixed;
  align-items: center;
  display: flex;
  width: 100%;
  height: 48px;
  background: #21aef3;
}

.zwb_jkzc .head-wrap .history {
  position: absolute;
  right: 10px;
  font-size: 13px;
}

.zwb_jkzc .tm-content {
  font-size: 14px;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  background-image: url('../../assets/img/zwb/index_01.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: fixed;
  z-index: 1;
  margin-top: 46px;
  background-color: #eef1f2;
}

.zwb_jkzc .arrow {
  background-image: url(../../assets/img/zwb/arrow.svg), none;
  background-repeat: no-repeat;
  background-position: right center;
  background-size: 20px 15px;
}

.zwb_jkzc .m-contList li:first-child {
  border-top: 0;
}

.zwb_jkzc .m-contList li {
  height: 55px;
  line-height: 55px;
  background-color: #fff;
  padding: 0 23px 0 8px;
  display: flex;
  display: -webkit-flex;
  border-top: 1px solid #e6e6e6;
}

.zwb_jkzc .m-contList li .icon {
  display: inline-block;
  width: 25px;
  height: 25px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
  top: 14px;
  margin-right: 8px;
}

@media screen and (max-width: 1024px) {
  .m-contList {
    margin-top: 388px;
  }
}

@media screen and (max-width: 834px) {
  .m-contList {
    margin-top: 312px;
  }
}

@media screen and (max-width: 768px) {
  .m-contList {
    margin-top: 287px;
  }
}

@media screen and (max-width: 414px) {
  .m-contList {
    margin-top: 198px;
  }
}

@media screen and (max-width: 375px) and (max-height: 812px) {
  .m-contList {
    margin-top: 215px;
  }
}

@media screen and (max-width: 375px) and (max-height: 667px) {
  .m-contList {
    margin-top: 180px;
  }
}

@media screen and (max-width: 360px) {
  .m-contList {
    margin-top: 171px;
  }
}

@media screen and (max-width: 320px) {
  .m-contList {
    margin-top: 150px;
  }
}
</style>