<template>
  <div class="people_lists g-wrap g-hp100" v-show="cardList">
    <div class="m_01">
      <div class="card-list" v-if="cardList.length">
        <div class="card-face-container f-mb15" v-for="(c,i) in cardList" :key="i" @click="toDetail(c)">
          <img class="card-bg" src="../../assets/img/register/cardnewbg.png">
          <div class="card-top-info">
            <div class="card-top-org">湖南省卫生健康委员会</div>
            <div class="card-top-title">
              <img src="../../assets/img/register/icon2.png" alt="">
              <span class="f-fwb">电子健康卡</span>
            </div>
          </div>
          <div class="card-detail-info">
            <div class="card-user-info">
              <div class="card-user-name f-mb3"><span class="f-fwb">{{c.xm}}</span>
                <van-tag v-if="c.bz=='1'" color="#3D98FF" text-color="#fff">默认</van-tag>
              </div>
              <span class="card-user-id ">{{regNumber(c.cnum,4)}}</span>
            </div>
            <div class="card-qrcode">
              <img class="card-qrcode-logo" src="../../assets/img/register/logo_.png" alt="">
              <!-- <div v-if="c.QRCODE" class="qrcode" :ref="`qrCodeUrl${i}`"></div> -->
              <qrcode-vue v-if="c.qrcode" size="76" level="H" :value="c.qrcode"></qrcode-vue>
              <img v-else class="qrcode" src="../../assets/img/register/qrcode.png" alt="">
            </div>
          </div>
          <div class="card-footer">中华人民共和国国家卫生健康委员会监制</div>
        </div>
      </div>
      <div class="emptycard" v-else>
        <img class="g-w50 g-h50 f-mb10" src="../../assets/img/register/nocard.png" />
        <p>暂无健康卡</p>
      </div>
    </div>
    <div class="button">
      <div class="addbtn" id="addcard" @click="doAddCard">+ 新增健康卡</div>
    </div>
    <div class="quick-bind f-df f-dfc" @click="doChooseCard" id="chooseCard"><span>选择授权人，一键绑卡，免填身份信息</span><i class="iconfont f-ml5 icon-arrow-right f-fs12"></i></div>
  </div>
</template>
<script>
  import QrcodeVue from 'qrcode.vue'

  var openid, headimgurl
  export default {
    name: 'people_lists',
    components: {
      QrcodeVue
    },
    computed: {},
    created() {
      var t = this
      t.updateTitle('电子健康卡管理')
      console.log(t.wx_userInfo)
      var Request = undefined
      Request = t.GetRequest()
      openid = Request["openid"] || t.wx_userInfo.openid
      headimgurl = Request["headimgurl"] || t.wx_userInfo.headimgurl
      sessionStorage.wx_userInfo = JSON.stringify({
        openid: openid,
        headimgurl: headimgurl
      })
      t.$store.state.wx_userInfo = JSON.parse(sessionStorage.wx_userInfo)
      headimgurl = Request["headimgurl"] || t.wx_userInfo.headimgurl
      t.searchForm.OPENID = t.wx_userInfo.openid || openid
      t.peopleForm.OPENID = t.wx_userInfo.openid || openid
      // 判断是否注册
      t.isRegister({
        openid: t.wx_userInfo.openid,
        type: 0
      }, function(sucFun) {
        console.log(sucFun)
        t.getCardList()
      })

    },
    data() {
      return {
        cardList: '',
        searchForm: {
          OPENID: '',
          FLAG: 'Query'
        },
        peopleForm: {
          FLAG: 'Insert',
          OPENID: '',
          QRCODETEXT: '',
          HEALTHCARDID: '',
          PHID: '',
          CNUM: '',
          SJHM: '',
          XM: '',
          XB: '',
          CSRQ: '',
          NL: '',
          HKDZ: '',
          MZ: '',
          TX: '',
          CARDTYPE: '01',
          BZ: '0',
          CHANNELNUM: '0'
        },
      }
    },
    methods: {
      getCardList() {
        var t = this
        t.ajax({
          serverId: 'WXBM00044',
          url: t.serverPath1,
          params: t.searchForm,
          success: function(data) {
            console.log(data)
            t.cardList = data[0].CONTENTS || []
          },
          error: function(data) {
            t.$toast(data.MSG)
          }
        })
      },
      // 电子健康卡详情页
      toDetail(data) {
        var t = this
        t.linkToPage('people_detail', data)
      },
      doAddCard() {
        var t = this
        sessionStorage.setItem("prevUrl", 'people_lists')
        var redirect_uri = t.wx_health_card + "/register_card?isRegister=true&openid=" + openid + '&headimgurl=' + headimgurl + '&prevUrl=' + 'people_lists'
        window.location.href = 'https://health.tengmed.com/open/getUserCode?redirect_uri=' + encodeURIComponent(redirect_uri);
        // console.log(7897, 'https://health.tengmed.com/open/getUserCode?redirect_uri=' + encodeURIComponent(redirect_uri))
      },
      doChooseCard() {
        var t = this
        sessionStorage.setItem("prevUrl", 'people_lists')
        var redirect_uri = t.wx_health_card + "/oper_people_detils?openid=" + openid + '&headimgurl=' + headimgurl + '&prevUrl=' + 'people_lists'
        window.location.href = 'https://health.tengmed.com/open/getHealthCardList?redirect_uri=' + encodeURIComponent(redirect_uri);
      }
    },
    mounted() {}
  }
</script>
<style scoped>
  @media screen and (max-width: 320px) {}

  .people_lists {
    background: linear-gradient(180deg, #8FCBFF 0%, #F4F7FB 34.48%);
    padding: 16px;
  }

  .people_lists .m_01 {
    background: #FFFFFF;
    border-radius: 8px;
    padding: 15px 16px 0px 16px;
  }

  .people_lists .m_01 .van-tag {
    font-size: 14px;
    line-height: 22px;
    padding: 2px 8px;
    margin-left: 4px;
    border-radius: 4px;
  }


  .people_lists .card-list {
    font-family: PingFangSC-Medium, 'PINGFANG MEDIUM';
    font-size: 12px;
    overflow: hidden;
  }

  .people_lists .card-face-container {
    position: relative;
    color: #000;
  }

  .people_lists .card-face-container .card-top-info {
    position: absolute;
    top: 10px;
    left: 17px;
    right: 13px;
    display: flex;
    justify-content: space-between;
    align-items: center
  }

  .people_lists .card-face-container .card-top-info .card-top-org {
    font-size: 9px;
    line-height: 18px;
    color: #000;
    font-weight: 500;
  }

  .people_lists .card-face-container .card-top-info .card-top-title {
    display: flex;
    align-items: center;
    font-size: 15px;
    line-height: 21px;
    color: #2b2b2b;
  }

  .people_lists .card-face-container .card-top-info .card-top-title img {
    width: 27px;
    height: 27px;
    margin-right: 4px;
  }

  .people_lists .card-face-container .card-detail-info {
    position: absolute;
    bottom: 36px;
    width: calc(100% - 17px - 7px);
    left: 17px;
    right: 7px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .people_lists .card-face-container .card-detail-info .card-user-info {
    font-size: 18px;
    color: #2b2b2b;
  }

  .people_lists .card-face-container .card-detail-info .card-user-info .card-user-name {
    font-size: 25px;
    height: 25px;
    display: flex;
    align-items: center;
  }

  .people_lists .card-face-container .card-detail-info .card-user-info .card-user-id {
    font-size: 16px;
    line-height: 19px;
    margin-top: 7px;
    font-weight: 500;
  }

  .people_lists .card-face-container .card-detail-info .card-qrcode {
    margin-right: 6px;
    background: #fff;
    width: 80PX;
    height: 80PX;
    padding: 2PX;
    position: relative;
  }

  .people_lists .card-face-container .card-detail-info .card-qrcode .card-qrcode-logo {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 6;
  }

  .people_lists .card-face-container .card-footer {
    position: absolute;
    bottom: 8px;
    width: 100%;
    text-align: center;
    line-height: 18px;
    font-size: 9px;
    color: #000
  }

  .people_lists .b-tag {
    color: #fff;
    font-size: 12px;
  }

  .people_lists .button {
    padding: 30px 0px 15px 0;
    font-family: PingFangSC-Regular;
  }

  .people_lists .button .addbtn {
    display: block;
    background: #1479FF;
    border-radius: .1rem;
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: #FFFFFF;
    text-align: center;
    border-radius: 5px;
  }

  .people_lists .quick-bind {
    font-size: 14px;
    color: #323232;
    text-align: center;
    margin-top: 10px;
    padding-bottom: 15px;
  }

  .people_lists .emptycard {
    width: 100%;
    height: 200px;
    text-align: center;
    font-size: 14px;
    padding-top: 60px;
  }

  .people_lists .card-face-container img.card-bg {
    width: 100%;
  }
</style>