<template>
  <div class="people_detail g-wrap g-hp100">
    <div class="wrap-box f-mb12">
      <div class="wrap-top f-pt30  f-pl10 f-pr10">
        <div class="qrcode-block">
          <img
            v-if="show"
            class="qrcode-logo"
            src="../../assets/img/register/logo_.png"
            alt=""
          />
          <div class="qrcode" ref="qrCodeUrl"></div>
          <!-- <div v-if="patientInfo.QRCODE" class="qrcode" ref="qrCodeUrl"></div> -->
          <!-- <qrcode-vue size="170" level="H" :value="patientInfo.QRCODE" :foreground="patientInfo.color"></qrcode-vue> -->
          <img
            v-if="index == 0"
            class="qrcode"
            src="../../assets/img/register/qrcode.png"
            alt=""
          />
        </div>
        <div class="  f-fs14 f-pt5  f-lh22">
          湖南<span
            :style="{ color: patientInfo.color }"
            class="f-fwb f-fs18 f-pl5 f-pr8"
            >{{ colorTXT }}</span
          >
          外省
          <span style="color:#6a6da9" class="f-fwb f-fs18 f-pl5">未查验</span>
        </div>
        <div class="f-fs24 f-fwb f-pt8 f-pb30 s-c1479FF">{{ currentTime }}</div>
      </div>
    </div>
    <div class="wrap-box">
      <van-cell-group>
        <van-cell :value="patientInfo.xm">
          <template #title>
            <div class="f-df">
              <div class="f-fs18 s-c000 f-pr5 icon wsdfont wsd-ren1"></div>
              <div class="custom-title s-c323233">用户姓名：</div>
            </div>
          </template></van-cell
        >
        <van-cell :value="regNumber(patientInfo.cnum, 4)">
          <template #title>
            <div class="f-df">
              <div class="f-fs18 s-c000 f-pr5 icon wsdfont wsd-ren1"></div>
              <div class="custom-title s-c323233">身份证号：</div>
            </div>
          </template></van-cell
        >
        <van-cell :value="regNumber(patientInfo.sjhm, 2)">
          <template #title>
            <div class="f-df">
              <div class="f-fs18 s-c000 f-pr5 icon wsdfont wsd-ren1"></div>
              <div class="custom-title s-c323233">手机号码：</div>
            </div>
          </template></van-cell
        >
        <van-cell title="设为默认：">
          <template #right-icon>
            <van-switch
              v-model="is_def"
              active-color="#1479FF"
              size="18"
              @change="doChoose"
              class="f-mt2"
            />
          </template>
        </van-cell>
      </van-cell-group>
    </div>
    <div class="button">
      <div
        v-if="patientInfo.sfbr != '1'"
        class="addbtn"
        id="addcard"
        @click="doDelete"
      >
        <div class="f-fs15 f-pr2 icon wsdfont wsd-renjianshaoshanchu"></div>
        解除绑定
      </div>
    </div>

    <div class="button">
      <div class="addbtn" id="addcard" @click="doEnter">进入卡包</div>
    </div>
  </div>
</template>
<script>
import QRCode from "qrcodejs2";
// import QrcodeVue from 'qrcode.vue'
export default {
  name: "people_detail",
  components: {
    // QrcodeVue,
    // QRCode
  },
  computed: {},
  created() {
    var t = this;
    t.updateTitle("电子健康卡信息");
    //动态二维码
    t.getCODE();
    t.searchForm.OPENID = t.wx_userInfo.openid;
    t.searchForm.XM = t.queryData.xm;
    t.searchForm.CNUM = t.queryData.cnum;
    t.searchForm.SJHM = t.queryData.sjhm;
    t.searchForm.CARDTYPE = t.queryData.asdetype;
    t.is_def = t.queryData.bz == 1 ? true : false;
    t.patientInfo = t.queryData;
    console.log(t.patientInfo);
    t.timer = setInterval(() => {
      var y = new Date().getFullYear();
      var m = t.appendZero(new Date().getMonth() + 1);
      var d = t.appendZero(new Date().getDate());
      var ho = t.appendZero(new Date().getHours());
      var mi = t.appendZero(new Date().getMinutes());
      var se = t.appendZero(new Date().getSeconds());
      //修改数据date
      t.currentTime = y + "-" + m + "-" + d + " " + ho + ":" + mi + ":" + se;
    }, 1000);
    t.gettime();
  },
  data() {
    return {
      index: 1,
      patientInfo: "",
      timer: "", //定义一个定时器的变量
      currentTime:
        new Date().getFullYear() +
        "-" +
        new Date().getMonth() +
        1 +
        "-" +
        new Date().getDate() +
        " " +
        new Date().getHours() +
        ":" +
        new Date().getMinutes() +
        ":" +
        new Date().getSeconds(),
      searchForm: {
        OPENID: "",
        FLAG: "",
        XM: "",
        CARDTYPE: "",
        CNUM: "",
        SJHM: "",
      },
      colorTXT: "",
      is_def: "",
      show: "",
    };
  },
  methods: {
    // 进入卡包
    doEnter() {
      var t = this;
      t.ajax({
        serverId: "WXBM00032",
        url: t.serverPath1,
        params: {
          ORDERID_QRCODETEXT: t.queryData.qrcode,
        },
        success: function(data) {
          console.log(789798, data);
          if (data[0].CODE == 0) {
            var _data = JSON.parse(data[0].rsp);
            console.log(_data);
            var orderId = _data.orderId;
            console.log(orderId);
            var redirect_uri =
              t.wx_health_card +
              "/people_lists?openid=" +
              t.wx_userInfo.openid +
              "&headimgurl=" +
              t.wx_userInfo.headimgurl;
            window.location.href =
              "https://health.tengmed.com/open/takeMsCard?order_id=" +
              orderId +
              "&redirect_uri=" +
              encodeURIComponent(redirect_uri);
          } else {
            t.$toast(data[0].MSG);
          }
        },
        error: function(data) {
          t.$toast(data.MSG);
          console.log(9999, data);
        },
      });
    },
    getCODE() {
      var t = this;
      t.ajax({
        serverId: "WXBM00032",
        url: t.serverPath1,
        params: {
          HEALTHCARDID: t.queryData.ecid,
          IDTYPE: "01",
          IDNUMBER: t.queryData.qrcode,
          CODETYPE: 0,
        },
        success: function(data) {
          console.log(666, data);
          var _data = JSON.parse(data[0].rsp);
          console.log(7987987987, _data);
          if (_data.color == 0) {
            t.patientInfo.color = "#303133";
            t.colorTXT = "未申报";
          } else if (_data.color == 2) {
            t.patientInfo.color = "#ffc200";
            t.colorTXT = "黄码";
          } else if (_data.color == 1) {
            t.patientInfo.color = "#246a0a";
            t.colorTXT = "绿码";
          } else if (_data.color == 3) {
            t.patientInfo.color = "#f90618";
            t.colorTXT = "红码";
          }
          t.patientInfo.QRCODE = _data.qrCodeText;
          t.patientInfo.QRCODEIMG = _data.qrCodeImg;
          t.aa();
        },
        error: function(data) {
          t.index = 0;
          t.$toast(data.MSG);
        },
      });
    },
    aa() {
      var t = this;
      console.log(789789779, t.patientInfo.color);
      t.show = "666";
      this.$refs.qrCodeUrl.innerHTML = "";
      var qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: t.patientInfo.QRCODE, // 需要转换为二维码的内容
        colorDark: t.patientInfo.color,
        colorLight: "#ffffff",
        width: 181,
        height: 181,
        correctLevel: QRCode.CorrectLevel.H,
      });
      console.log(qrcode);
    },
    // 设置默认健康卡
    setDefFunc(flag) {
      var t = this;
      t.searchForm.FLAG = flag;
      console.log(t.searchForm);
      t.ajax({
        serverId: "WXBM00015",
        url: t.serverPath1,
        params: t.searchForm,
        success: function(data) {
          console.log(78798, data[0].CONTENTS);
        },
        error: function(data) {
          t.$toast(data.MSG);
        },
      });
    },
    doChoose() {
      this.setDefFunc("Choose");
    },
    // 解绑电子健康卡
    doDelete() {
      var t = this;
      t.$dialog
        .confirm({
          message: "确认解绑电子健康卡？",
        })
        .then(() => {
          t.ajax({
            serverId: "WXBM00044",
            url: t.serverPath1,
            params: {
              FLAG: "Delete",
              OPENID: t.wx_userInfo.openid,
              CARDTYPE: "01",
              CNUM: t.queryData.cnum,
            },
            success: function(data) {
              if (data[0].CODE == "0") {
                t.linkToPage("people_lists");
              } else {
                t.$toast("解绑失败");
              }
            },
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    //获取实时时间
    appendZero(obj) {
      if (obj < 10) {
        return "0" + obj;
      } else {
        return obj;
      }
    },
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  },
  mounted() {
    var t = this;
    t.timer = setInterval(t.getCODE, 1000 * 60);
    this.$once("hook:beforeDestroy", () => clearInterval(t.timer));
  },
};
</script>
<style scoped>
@media screen and (max-width: 320px) {
}

.people_detail {
  background: linear-gradient(180deg, #8fcbff 0%, #f4f7fb 34.48%);
  padding: 16px;
}

.people_detail .qrcode-block {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.people_detail .wrap-top {
  background: #fff;
  text-align: center;
}

.people_detail .qrcode-block .qrcode-logo {
  height: 35px;
  width: auto;
  position: absolute;
  z-index: 10;
}

.people_detail .qrcode-block .qrcode {
  /* border: 1px solid #ECECEC;
    border-radius: 8px; */
  padding: 0px;
  position: relative;
  height: 186px;
}

.people_detail .qrcode-block .qrcode img {
  /* width: 100%;
    height: 100%;
    pointer-events: none; */
}

.people_detail .qrcode-block .qrcode canvas {
  /* width: 100% !important;
    height: 100% !important; */
}

.people_detail >>> .van-cell {
  border-bottom: 1px solid #ebeef5;
  font-size: 14px;
}

.people_detail >>> .van-cell__value {
  color: #969799;
}

.people_detail >>> .van-cell:not(:last-child)::after {
  border-bottom: 0;
}

.people_detail .wrap-box {
  border-radius: 8px;
  overflow: hidden;
}

.people_detail .wrap-box .btn-item {
  text-align: center;
  font-size: 14px;
  padding: 20px;
}

.people_detail .button {
  padding: 30px 0;
  font-family: PingFangSC-Regular;
}

.people_detail .button .addbtn {
  display: block;
  background: #1479ff;
  border-radius: 0.1rem;
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  border-radius: 5px;
}
</style>
