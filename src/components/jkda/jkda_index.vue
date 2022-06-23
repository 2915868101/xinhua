<template>
  <div class="jkda_index g-wrap">
    <div class="head-wrap">
      <div class="head-cont ">
        <img class="user-img" :src="peopleInfo.TX || $store.state.def_headimg">
        <div class="user-info f-dfc">
          <div class="f-mb5 f-mt2">
            <span class="name f-mr10">{{peopleData.XM||peopleInfo.NAME}}</span>
            <span v-if="peopleInfo.XB=='1'" class="icons iconbg1 f-mr10"><i class="iconfont  icon-male f-fs14"></i></span>
            <span v-else class="icons iconbg2 f-mr10"><i class="iconfont icon-female f-fs14"></i></span>
            <span>{{peopleData.AGE||peopleInfo.AGE}} 岁</span>
          </div>
          <div v-if="peopleData.TELEPHONE">{{regNumber(peopleData.TELEPHONE)}}</div>
          <div v-else-if="peopleInfo.SJHM">{{regNumber(peopleInfo.SJHM)}}</div>
          <div v-else>暂无联系方式</div>
        </div>
        <div class="user-more f-mt2 f-df" @click="linkToPage('jkda_grzl',peopleInfo)">
          <span>更多</span> <i class="iconfont icon-arrow-right f-fs12 f-mt2 f-ml5"></i>
        </div>
      </div>
    </div>
    <div class="relative-wrap s-c606266">
      <div class="info-box box-wrap f-mb10">
        <div class="item f-fs15 f-mb20">
          <i class="iconfont icon-idcard s-c00c792 f-fs16 f-ml25 f-mr20"></i>
          <span class="tit f-mr8">身份证号</span>
          <span class="txt" v-if="peopleData.ID_NUM">{{regNumber(peopleData.ID_NUM,4)}}</span>
          <span class="txt" v-else-if="peopleInfo.CARD_NUMBER">{{regNumber(peopleInfo.CARD_NUMBER,4)}}</span>
          <span class="txt" v-else>--</span>
        </div>
        <div class="item f-fs15 f-mb20">
          <i class="iconfont icon-hjdz s-c00c792 f-fs16 f-ml25 f-mr20"></i>
          <span class="tit f-mr8">户籍地址</span>
          <span class="txt">{{peopleData.ADDRESS ||peopleInfo.HKDZ|| "--"}}</span>
        </div>
        <div class="item f-fs15">
          <i class="iconfont icon-jdrq s-c00c792 f-fs16 f-ml25 f-mr20"></i>
          <span class="tit f-mr8">建档日期</span>
          <span class="txt" v-if="peopleData.FILING_DATE">{{$moment(peopleData.FILING_DATE).format('YYYY-MM-DD')}}</span>
          <span class="txt" v-else>--</span>
        </div>
      </div>
      <div class="doctor-box box-wrap f-mb10 f-bs3">
        <div class="b-head"><i class="b-border f-mr8"></i><span>{{serverType=='cz'?'家庭医生':'责任医生'}}</span></div>
        <div class="b-cont">
          <div class="list-item f-mt20 f-pl15" v-if="peopleData.DOCTOR_NAME">
            <div class="item-icon f-df4">
              <i class="iconfont icon-doctor"></i>
            </div>
            <div class="item-cont f-df20 f-pl20 f-dfv g-wp90">
              <div class="name s-c606266 f-lh20">{{peopleData.DOCTOR_NAME}}</div>
              <div class="s-c909399 f-mt10 line1" v-show="peopleData.ORG_NAME">机构名称：{{peopleData.ORG_NAME || '--'}}</div>
            </div>
          </div>
          <div v-else class="f-mt20 f-pl15">暂无</div>
        </div>
      </div>
      <div class="menu-box box-wrap f-bs3">
        <div class="list-item" @click="linkToPage('jkda_jkzb',{CNUM:searchForm.CNUM})">
          <div class="item-icon f-df4 f-ml20">
            <i class="iconfont icon-jkda1"></i>
          </div>
          <div class="item-cont f-df20 f-pl15">
            <div class="name s-c606266">健康指标</div>
            <div class="s-c909399 f-mt10">基础健康指标数</div>
          </div>
        </div>
        <div class="list-item" @click="linkToPage('jkda_jks',{CNUM:searchForm.CNUM})">
          <div class="item-icon f-df4 f-ml20">
            <i class="iconfont icon-jkda2"></i>
          </div>
          <div class="item-cont f-df20 f-pl15">
            <div class="name s-c606266">健康史</div>
            <div class="s-c909399 f-mt10">历史健康档案参考</div>
          </div>
        </div>
        <div class="list-item" @click="linkToPage('jkda_ylda',{MPI:peopleData.MPI,CNUM:searchForm.CNUM})">
          <div class="item-icon f-df4 f-ml20">
            <i class="iconfont icon-jkda3"></i>
          </div>
          <div class="item-cont f-df20 f-pl15">
            <div class="name s-c606266">健康档案</div>
            <div class="s-c909399 f-mt10">医疗卫生事件全册</div>
            <div class="qx-btn" v-if="serverType=='cz'" @click.stop="linkToPage('jkda_ylda_qxsz',{EXTCA:peopleData.ID_NUM||peopleInfo.CARD_NUMBER,ROLEFLAG:peopleData.ROLEFLAG||'0'})">权限设置</div>
          </div>
        </div>
        <!-- <div class="list-item" @click="linkToPage('jkda_tjbg',{MPI:peopleData.MPI})">
          <div class="item-icon f-df4 f-ml20">
            <i class="iconfont icon-jkda4"></i>
          </div>
          <div class="item-cont f-df20 f-pl15 f-fdc f-fdj">
            <div class="name s-c606266">体检报告</div>
            <div class="s-c909399">电子体检报告单</div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'jkda_index',
  components: {},
  computed: {},
  created() {
    var t = this
    t.updateTitle('健康档案')
    // 判断是否注册
    var Request = undefined
    Request = t.GetRequest()
    var sfzh = Request["sfzh"] || ''
    if (sfzh) {
      t.searchForm.CNUM = sfzh
      t.peopleInfo={}
      t.peopleInfo.CARD_NUMBER= sfzh
      t.getPeopleData()
    } else {
      t.isRegister({ openid: t.wx_userInfo.openid, type: 0 }, function(sucFun) {
        t.peopleInfo = sucFun.CONTENTS[0]
        t.peopleInfo.AGE = t.IdCard(t.peopleInfo.CARD_NUMBER, 3)
        t.searchForm.CNUM = t.peopleInfo.CARD_NUMBER
        t.getPeopleData()

        // 人脸对比识别
        if (!t.$cookies.get('FACE_MATCH') && t.serverType == 'hz') {
          t.$dialog.confirm({
              title: '',
              message: '为了保护用户信息\n需要认证是否是本人',
            })
            .then(() => {
              sessionStorage.setItem("prevUrl", t.$route.fullPath)
              t.linkToPage('/face_verify', { type: 'match' })
            })
            .catch(() => {
              t.goBack()
            })
        }
      })
    }
  },
  data() {
    return {
      searchForm: {
        CNUM: '',
      },
      peopleInfo: '',
      peopleData: '',
    }
  },
  methods: {
    // 获取个人健康档案
    getPeopleData() {
      var t = this
      t.ajax({
        serverId: 'WXBM00035',
        url: t.serverPath2,
        params: t.searchForm,
        success: function(data) {
          console.log(t.searchForm)
          console.log(data)
          t.peopleData = data[0].CONTENTS ? data[0].CONTENTS[0] : []
          if (t.peopleData.ID_NUM) {
            t.peopleData.AGE = t.IdCard(t.peopleData.ID_NUM, 3)
          }
          console.log(t.peopleData)
        }
      })
    },
  },
  mounted() {}
}
</script>
<style scoped>
@media screen and (max-width: 320px) {}

.jkda_index .head-wrap {
  position: relative;
  width: 100%;
  height: 160px;
  background: #fff url(../../assets/img/jkda/head-bg.png);
  background-size: 100%;
}

.jkda_index .head-wrap .head-cont {
  color: #fff;
  font-size: 15px;
  padding: 25px 15px 0;
  display: flex;
  justify-content: space-between;
}

.jkda_index .head-wrap .head-cont .user-img {
  margin-left: 10px;
  width: 50px;
  height: 50px;
  border-radius: 100%;
}

.jkda_index .head-wrap .head-cont .user-info {
  width: 200px;
  line-height: 20px;
}

.jkda_index .head-wrap .head-cont .user-info .name {
  font-size: 16px;
  font-weight: bold;
}

.jkda_index .head-wrap .head-cont .user-info .icons {
  border-radius: 10px;
  height: 15px;
  padding: 1px 6px;
}

.jkda_index .head-wrap .head-cont .user-info .icons.iconbg1 {
  background: #7d95ff;
}

.jkda_index .head-wrap .head-cont .user-info .icons.iconbg2 {
  background: #ffcd7d;
}

.jkda_index .relative-wrap {
  position: relative;
  top: -70px;
  padding: 15px;
}

.jkda_index .box-wrap {
  font-size: 14px;
  padding: 20px;
  border-radius: 3px;
  background: #fff;
}

.jkda_index .box-wrap .b-head {
  padding: 0;
}

.jkda_index .box-wrap .b-head span {
  font-size: 15px;
  font-weight: bold;
}

.jkda_index .info-box .item {
  display: flex;
  line-height: 20px;
}

.jkda_index .info-box .item .tit {
  font-weight: bold;
  font-size: 15px;
  width: 100px;
}

.jkda_index .info-box .item .txt {
  width: 250px;
}

.jkda_index .list-item {
  display: flex;
}

.jkda_index .list-item .item-icon {
  width: 45px;
  height: 45px;
  line-height: 45px;
  border-radius: 5px;
  background: #f2f6fc;
  text-align: center;
}

.jkda_index .list-item .item-icon .iconfont {
  font-size: 32px;
  color: #d7dee8;
}

.jkda_index .list-item .name {
  font-weight: bold;
  font-size: 15px;
}

.jkda_index .menu-box .list-item {
  height: 85px;
  border-radius: 3px;
  margin-bottom: 20px;
  align-items: center;
  position: relative;
}

.jkda_index .menu-box .list-item .name {
  font-size: 16px;
  margin-top: 3px;
}

.jkda_index .menu-box .list-item:nth-child(1) {
  background: url(../../assets/img/jkda/menu-1.png);
  background-size: 100%;
}

.jkda_index .menu-box .list-item:nth-child(2) {
  background: url(../../assets/img/jkda/menu-2.png);
  background-size: 100%;
}

.jkda_index .menu-box .list-item:nth-child(3) {
  background: url(../../assets/img/jkda/menu-3.png);
  background-size: 100%;
  margin-bottom: 0;
}

.jkda_index .menu-box .list-item:nth-child(4) {
  background: url(../../assets/img/jkda/menu-4.png);
  background-size: 100%;
}

.jkda_index .menu-box .item-cont .qx-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  color: #00c792;
  border: 1px solid #00c792;
  border-radius: 24px;
  line-height: 24px;
  height: 24px;
  width: 70px;
  text-align: center;
}

.jkda_index .menu-box .list-item .item-icon {
  border-radius: 100%;
}

.jkda_index .menu-box .list-item .item-icon .iconfont {
  color: #fff;
  font-size: 28px;
}

.jkda_index .menu-box .list-item:nth-child(1) .item-icon {
  background: #7bbbf6;
}

.jkda_index .menu-box .list-item:nth-child(2) .item-icon {
  background: #fcb594;
}

.jkda_index .menu-box .list-item:nth-child(3) .item-icon {
  background: #42e6b2;
}

.jkda_index .menu-box .list-item:nth-child(4) .item-icon {
  background: #fcd694;
}
</style>