<template>
  <div class="index">
    <div>
      <div class="m_bg f-df f-dfj">
        <div class="f-pt20"><img src="@/assets/img/index/PNG_LC0771 1.png"></div>
        <div class=" f-pr5"><img src="@/assets/img/index/PNG_LC0771 2.png"></div>
      </div>
      <div class="f-ml16 f-mr16 f-mb16">
        <div class="m-logo f-df f-dfj ">
          <div class="f-pt16">
            <img src="../../assets/img/index/Frame 892.svg" /></div>
          <div class="f-pr5"><img src="@/assets/img/index/zu.png" /></div>
        </div>
        <div class="search-wrap f-df" @click="linkToPage('index_search')">
          <van-icon name="search" class="f-mr5" />
          <div class="f-fs14 f-lh22 s-c646566">搜索医院或医生</div>
        </div>
      </div>
      <div class="m_bg2 f-df">
        <div class="index-bg1"></div>
        <div class="index-bg2"></div>
      </div>
      <div class="m_01 s-cfff">
        <div class="f-df f-dfj f-fs13 f-lh20">
          <div>电子健康卡</div>
          <div class="f-df f-dfj ">
            <div @click="linkToPage('people_lists')">管理</div>
            <div class="f-fs16 f-lh20 icon wsdfont wsd-jiantouyou"></div>
          </div>
        </div>
        <div class="f-pt30 f-df f-dfj">
          <div>
            <div class="f-fs20 f-lh28"> <span class="f-fwb f-pr8">{{peopleCard.xm||'未知姓名'}}</span>
              <van-tag v-if="peopleCard.bz=='1'" color="#3D98FF" text-color="#fff">默认</van-tag>
            </div>
            <div class="f-pt5 f-fs13 f-lh20">{{regNumber(peopleCard.cnum,4)||'未知身份证号'}}</div>
          </div>
          <div class="f-pt10" @click="linkToPage('people_detail',peopleCard)">
            <van-tag size="large" round color="#66B3FF" text-color="#fff">
              <span class="f-pr4 f-pr2 f-fs18 f-lh20 wsdfont wsd-erweima"></span><span class="f-pr4">出示健康码</span></van-tag>
          </div>
        </div>
      </div>
    </div>
    <div class="menu-list ">
      <div class="f-df f-dfj">
        <div class=" f-pt10 f-fs16 f-lh24 s-c646566"><span class="f-fwb">快捷服务</span><span class="f-pl5 f-fs12 f-lh18 s-c969799">挂号与查询</span></div>
        <div class="f-df f-dfj s-c3D98FF">
          <div class=" f-pt10 f-fs12 f-lh24" @click="tz('gnzy_index')">管理</div>
          <div class="f-pt12 icon wsdfont wsd-jiantouyou"></div>
        </div>
      </div>
      <van-row class="f-df f-dfj f-pt8">
        <van-col span="7" class="list-item item1 f-mr4" @click="tz('yygh_index')">
          <div class="tit">预约报告</div>
          <div class="txt">REGISTRATION</div>
          <div class="icon1">
            <div class="icon2 wsdfont wsd-binglirilirizhif"></div>
          </div>
        </van-col>
        <van-col span="9" class="f-mr4">
          <div class="list-item item2" @click="tz('bgcx_index')">
            <div class="tit">报告查询</div>
            <div class="txt">REPORT</div>
            <div class="icon">
              <div class="icon2 wsdfont wsd-jianchabaogaowendangchazhaof"></div>
            </div>
          </div>
          <div class="list-item item3 f-mt4" @click="tz('mbgl_index')">
            <div class="tit">慢病管理</div>
            <div class="txt">CHRONIC</div>
            <div class="icon">
              <div class="icon2 wsdfont wsd-shaloushijianf"></div>
            </div>
          </div>
        </van-col>
        <van-col span="9">
          <div class="list-item item4" @click="tz('jkda_index')">
            <div class="tit">健康档案</div>
            <div class="txt">ARCHIVES</div>
            <div class="icon">
              <div class="icon2 wsdfont wsd-jiluwendangrizhibijiwenjianf"></div>
            </div>
          </div>
          <div class="list-item item5 f-mt4" @click="tz('guidance_index')">
            <div class="tit">智能导诊</div>
            <div class="txt">GUIDE</div>
            <div class="icon">
              <div class="icon2 wsdfont wsd-yibiaopanzhizhenshijianyoubiaoyalibiaosuduf"></div>
            </div>
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="s-bgcfff">
      <div class="menu-wrap f-df f-dfj">
        <div class="w-item f-df f-dfj s-c646566 f-fs12 f-lh16 f-fwb">
          <div class="tit f-ml8">团结<br>务实</div>
          <div class="tit">诚信<br>博爱</div>
          <div class="tit">奉献<br>创新</div>
          <div class="f-pl12 f-pr20">公廉<br>敬业</div>
        </div>
        <div class="w-item-p"></div>
        <div class="menu-bg">
          <div class="f-pl16 f-pt16 s-c323233 f-fs12 f-lh14">咨询热线：<br><span class="f-pt4 f-fwb f-lh16"><a :href="'tel:'+'0738-3236601'">0738-3236601</a></span></div>
        </div>
      </div>
    </div>
    <div class="menu-h s-bgcfff">
      <div class="f-df f-dfj  f-pl16 f-pr16">
        <div class="f-pt3 f-fs16 f-lh24 s-c646566"><span class="f-fwb">就近医院</span><span class="f-pl5 f-fs12 f-lh18 s-c969799">根据所填地址智能推荐</span></div>
        <div class="f-df f-dfj s-c3D98FF">
          <div class=" f-pt3 f-fs12 f-lh24" @click="tz('yygh_index')">管理</div>
          <div class="f-pt5 icon wsdfont wsd-jiantouyou"></div>
        </div>
      </div>
      <div class="f-pt30 f-pb30 f-tac s-bgcfff" v-if="isHospitalData">
        <van-loading size="24px" color="#00c792">加载中...</van-loading>
      </div>
      <div class="s-bgcfff f-pt8">
        <van-swipe :loop="false">
          <van-swipe-item v-for="(c,i) in hospitalList" :key="i" @click="linkToPage('yyjs_index',{ORG_NAME:c.ORG_NAME})">
            <div class="list-item">
              <img class="item-img" :src="c.ORG_PIC_URL||hospitalimg" />
              <div class="item-cont">
                <div class="flex-item">
                  <div class="name f-fs14 f-lh22 line1">{{c.ORG_NAME}}</div>
                </div>
                <div class="addr f-fs12 f-lh18 line1">
                  {{'--'}}<span class="f-pl3 f-pr3">| </span>{{c.ORG_ADDRESS}}
                </div>
                <div class="f-pt4">
                  <van-tag color="#E6F5FF" text-color="#1479FF" class="f-mr8" v-show="c.ORG_LEVEL">{{c.ORG_LEVEL}} </van-tag>
                  <van-tag color="#FFF7E6" text-color="#FA8C16" v-show="c.ORG_LEVEL">{{'已关注'}} </van-tag>
                </div>
              </div>
            </div>
          </van-swipe-item>
          <van-swipe-item @click="tz('')" v-if="!isHospitalData">
            <div class="list-item">
              <img class="item-img" :src="hospitalimg" />
              <div class="item-cont">
                <div class="flex-item">
                  <div class="name f-fs14 f-lh22 line1">{{'未知医院'}}</div>
                </div>
                <div class="addr f-fs12 f-lh18 line1">
                  {{'--'}}<span class="f-pl3 f-pr3">| </span>{{'未知地址'}}
                </div>
                <div class="f-pt4">
                  <van-tag color="#FFF7E6" text-color="#FA8C16">{{'已关注'}} </van-tag>
                </div>
              </div>
            </div>
          </van-swipe-item>
          <template #indicator>
            <div></div>
          </template>
        </van-swipe>
      </div>
    </div>
    <div class="f-pt15  s-bgcfff">
      <div class="f-df f-dfj  f-pl16 f-pr16">
        <div class="f-pt3 f-fs16 f-lh24 s-c646566"><span class="f-fwb">健康资讯</span><span class="f-pl5 f-fs12 f-lh18 s-c969799">了解热门文章与最新动态</span></div>
        <div class="f-df f-dfj s-c3D98FF">
          <div class=" f-pt3 f-fs12 f-lh24" @click="tz('jkzx_index')">更多</div>
          <div class="f-pt5 icon wsdfont wsd-jiantouyou"></div>
        </div>
      </div>
      <div class="infor-list s-bgcfff">
        <div class="list-item" v-for="(c,i) in jkzxList" :key="i">
          <a :href="c.link">
            <img class="f-pt12 item-img" :src="__static+c.img">
            <div class="f-pt12 item-cont">
              <div class="f-fs14 f-pt5 f-lh22 line1">{{c.tit1}}</div>
              <div class="f-fs14  s-c969799">
                <span class="f-pt5 f-pr2 icon wsdfont wsd-rilirizhiriqi"></span>{{c.data}}
                <img class="f-pr2 f-pl16" src="@/assets/img/index/hot.png">{{c.hot}}次阅读
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div class="g-h50"></div>
  </div>
</template>
<script>
  export default {
    name: 'index',
    components: {},
    created() {
      var t = this
      t.updateTitle('健康大厅')
      // 判断是否注册
      t.isRegister({
        openid: t.wx_userInfo.openid,
        type: 0
      }, function(sucFun) {
        console.log(sucFun)
        t.getCardList()
        t.getHospitalList()
        t.getJkzxList();
      })

    },
    computed: {},
    data() {
      return {
        peopleCard: [],
        hospitalList: '',
        hospitalimg: require('@/assets/img/index/hospitalA.png'),
        isHospitalData: false,
        jkzxList: []
      }
    },
    methods: {
      tz(val) {
        var t = this
        if (val) {
          t.linkToPage(val)
        } else {
          t.$toast('正在建设中')
        }
      },
      getCardList() {
        var t = this
        t.ajax({
          serverId: 'WXBM00044',
          url: t.serverPath1,
          params: {
            OPENID: t.wx_userInfo.openid,
            FLAG: 'Query'
          },
          success: function(data) {

            t.peopleCard = data[0].CONTENTS[0]
            console.log(111111111, t.peopleCard.xm)
          },
        })
      },
      getHospitalList() {
        var t = this
        t.isHospitalData = true
        // if (!localStorage.hospitalList) {
        t.ajax({
          loading: false,
          serverId: 'BMFW00024',
          url: t.serverPath1,
          success: function(data) {
            t.hospitalList = data[0].CONTENTS
            console.log(6666, t.hospitalList)
            localStorage.hospitalList = JSON.stringify(t.hospitalList)
            t.isHospitalData = false
          }
        })
        // } else {
        //   // t.hospitalList = JSON.parse(localStorage.hospitalList)
        //   t.isHospitalData = false
        // }
      },
      getJkzxList() {
        var t = this;
        // if (!localStorage.jkzxList) {
        t.ajax({
          method: 'get',
          url: t.__static + '/data/index-jkzx.json',
          success(data) {
            t.jkzxList = data
            localStorage.jkzxList = JSON.stringify(t.jkzxList)
          },
        });
        // } else {
        //   t.jkzxList = JSON.parse(localStorage.jkzxList);
        // }
      },
    },
    mounted() {}
  }
</script>
<style scoped>
  .index {
    background: linear-gradient(180deg, #8FCBFF 0%, #FFFFFF 34.48%);
  }

  .index .m_bg,
  .index .m_bg2 {
    position: absolute;
  }

  .index .m-logo {
    max-height: 70px;
  }

  .index .search-wrap {
    padding: 5px 12px;
    background: rgba(255, 255, 255, 0.64);
    backdrop-filter: blur(16px);
    border-radius: 40px;
    /* margin-top: -22px; */
    align-items: center;

  }

  .index .search-wrap>>>.van-icon {
    font-size: 16px;
    font-weight: bold;
    color: #646566
  }

  .index .m_bg2 {
    left: 16px;
    right: 16px;
    background: linear-gradient(143.57deg, #3D98FF 12.01%, #ADD8FF 97.16%), linear-gradient(143.57deg, #1890FF 12.01%, #ADD8FF 97.16%);
    border-radius: 8px;
    height: 123px;
    overflow: hidden;

  }

  .index .m_bg2 .index-bg1 {
    width: 206px;
    height: 206px;
    border-radius: 206px;
    position: relative;
    top: -103px;
    left: -42px;
    background: linear-gradient(180deg, #3D98FF 0%, rgba(61, 152, 255, 0) 100%);
  }

  .index .m_bg2 .index-bg2 {
    width: 195px;
    height: 195px;
    border-radius: 195px;
    position: relative;
    bottom: -50px;
    right: -30px;
    background: linear-gradient(180deg, #8FCBFF 0%, rgba(143, 203, 255, 0) 100%);
  }

  .index .m_01 {
    height: 123px;
    background: transparent;
    border-radius: 8px;
    position: absolute;
    left: 16px;
    right: 16px;
    padding: 10px 16px;
    box-shadow: 0px 20px 20px -13px #8FCBFF;
  }

  .index .m_01 .van-tag {
    font-size: 14px;
    line-height: 22px;
    padding: 2px 8px;
    border-radius: 4px;
  }

  .index .menu-list {
    flex-wrap: wrap;
    padding-top: 130px;
    padding: 130px 16px 0px 16px
  }

  .index .menu-list .list-item {
    border-radius: 8px;
    padding: 8px 12px;
    overflow: hidden;
  }

  .index .menu-list .list-item .tit {
    font-size: 14px;
    line-height: 22px;
    color: #323233;
    font-weight: bold;
  }

  .index .menu-list .list-item .txt {
    font-size: 8px;
    line-height: 11px;
    color: #969799;
  }

  .index .menu-list .list-item .icon {
    width: 80px;
    height: 80px;
    border-radius: 80px;
    background: #fff;
    position: relative;
    right: -55px;
    top: -42px;
  }

  .index .menu-list .list-item .icon1 {
    width: 80px;
    height: 80px;
    border-radius: 80px;
    background: #fff;
    position: relative;
    right: -16px;
    bottom: -16px;
  }

  .index .menu-list .list-item .icon2 {
    font-size: 40px;
    padding: 13px 0 0 13px;
    background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%);
    -webkit-background-clip: text;
    color: transparent;
  }

  .index .menu-list .item1 {
    background: linear-gradient(132.27deg, #D6EEFF 27.22%, #B8E0FF 100%);
    box-shadow: 0px 1px 0px #B8E0FF;
    height: 116px;
  }

  .index .menu-list .item1 .icon1 {
    background: linear-gradient(137.67deg, #B8E0FF 12.62%, rgba(184, 224, 255, 0) 100%);
  }

  .index .menu-list .item2 {
    background: linear-gradient(94.32deg, #DDEBFF 6.03%, #CCE0FF 98.01%);
    box-shadow: 0px 1px 0px #CEDFFF;
    height: 56px;
  }

  .index .menu-list .item2 .icon {
    background: linear-gradient(135deg, #CBDEFA 0%, rgba(203, 213, 250, 0) 100%);
  }

  .index .menu-list .item3 {
    background: linear-gradient(284.6deg, #D6D8FF 1.65%, #E6E8FF 100%);
    box-shadow: 0px 1px 0px #DBD6FF;
    height: 56px;
  }

  .index .menu-list .item3 .icon {
    background: linear-gradient(135deg, #CDD1FB 0%, rgba(205, 209, 251, 0) 100%);
  }

  .index .menu-list .item4 {
    background: linear-gradient(94.32deg, #DDF5E4 6.03%, #ABE7B5 98.01%);
    box-shadow: 0px 1px 0px #C5EABF;
    height: 56px;
  }

  .index .menu-list .item4 .icon {
    background: linear-gradient(135deg, #ADE3B0 0%, rgba(207, 231, 219, 0) 100%);
  }

  .index .menu-list .item5 {
    background: linear-gradient(283.08deg, #A1E2DE -0.66%, #E9F8FF 100%);
    box-shadow: 0px 1px 0px #BFE8EE;
    height: 56px;
  }

  .index .menu-list .item5 .icon {
    background: linear-gradient(135deg, #ABE4DE 0%, rgba(204, 233, 239, 0) 100%);
  }

  .index .menu-wrap {
    background: #EEF4FF;
    box-shadow: 0px 1px 0px #E4E9F8;
    border-radius: 8px;
    margin: 16px;
    position: relative;
    overflow: hidden;
  }

  .index .menu-wrap .w-item {
    background: linear-gradient(270deg, #DBE6FA 0%, rgba(219, 230, 250, 0) 100%);
    padding: 17px 0;
    z-index: 12
  }

  .index .menu-wrap .w-item-p {
    background: linear-gradient(270deg, #DBE6FA 0%, rgba(219, 230, 250, 0) 100%);
    height: 129px;
    width: 129px;
    border-radius: 50%;
    position: absolute;
    top: -32px;
    left: 95px;
  }

  .index .menu-wrap .tit {
    padding: 0px 12px;
    border-right: 1px dashed #C9CDD4;
  }

  .index .menu-bg {
    background-image: url('../../assets/img/index/Star 1.png');
    background-repeat: no-repeat;
    margin: 5px 20px 0 0;
  }

  .index .menu-h .list-item {
    margin: 0 16px;
    border: 1px solid #F4F7FB;
    box-sizing: border-box;
    box-shadow: 0px 8px 16px rgba(47, 84, 235, 0.06);
    border-radius: 8px;
    padding: 12px;
    font-size: 14px;
    overflow: hidden;
  }

  .index .infor-list {
    padding: 0px 16px 16px 16px;
  }

  .index .menu-h .list-item .item-img,
  .index .infor-list .list-item .item-img {
    float: left;
    width: 84px;
    height: 63px;
    margin-right: 15px;
    border-radius: 3px;
  }

  .index .menu-h .list-item .item-cont,
  .index .infor-list .list-item .item-cont {
    margin-left: 98px;
    height: 63px;
  }

  .index .menu-h .list-item .flex-item {
    display: flex;
    height: 22px;
    align-items: center;
    justify-content: space-between;
  }

  .index .menu-h .list-item .name {
    font-weight: bold;
    width: 160px;
  }

  .index .menu-h .list-item .addr {
    color: #909399;
  }
</style>