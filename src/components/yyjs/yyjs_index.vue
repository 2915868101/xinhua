<template>
  <div class="yyjs_index g-wrap g-hp100 s-bgcfff" v-if="hospitalInfo">
    <div class="banner-wrap noimg-wrap" v-if="!hospitalInfo.ORG_PIC_URL">
      <img class="g-w100 f-pt70" :src="$store.state.def_hospitalimg">
    </div>
    <div class="banner-wrap" v-else>
      <img class="g-wp100 g-h260" :src="hospitalInfo.ORG_PIC_URL">
    </div>
    <div class="f-df title f-pl12">
      <div class="f-mr8 f-pt2">{{hospitalInfo.ORG_NAME}}</div>
      <div>
        <van-tag type="primary" size="large" color="#3D98FF" v-show="hospitalInfo.ORG_LEVEL">{{hospitalInfo.ORG_LEVEL}}</van-tag>
      </div>
    </div>
    <div class="info-wrap">
      <div class="menu-wrap f-df f-dfj">
        <div class="item" @click="linkToPage('yyjs_ks',{ORG_ID:hospitalInfo.ORG_ID})">
          <div class="item-1 f-mb10 s-bgcE6F5FF">
            <span class="f-fs32  s-c1479FF wsdfont wsd-yiyuankeshif"></span>
          </div>
          <div>科室介绍</div>
        </div>
        <div class="item " @click="linkToPage('yyjs_ys',{ORG_ID:hospitalInfo.ORG_ID})">
          <div class="item-1  f-mb10 s-bgcE6FFFB">
            <span class="f-fs32  s-c13C2C2 wsdfont wsd-renyisheng1f"></span>
          </div>
          <p>名医介绍</p>
        </div>
        <!--       <div class="item f-df8" @click="linkToPage('amap',{ORG_LONGITUDE:hospitalInfo.ORG_LONGITUDE,ORG_LATITUDE:hospitalInfo.ORG_LATITUDE})">
        <img class="g-w45 f-pb10" src="../../assets/img/zswy/menu-icon3.png">
        <p>院内地图</p>
      </div> -->
        <div class="item " @click="doDepartment(hospitalInfo.ORG_ID,hospitalInfo.ORG_NAME,hospitalInfo.ORG_YQ)">
          <div class="item-1 f-mb10 s-bgcFFF7E6">
            <span class="f-fs32 s-cFA8C16 wsdfont wsd-binglirilirizhif"></span>
          </div>
          <p>去挂号</p>
        </div>
      </div>
      <div class="menu-wrap f-mt12">
        <div class="f-fs16 f-lh22 f-fwb s-c323233 f-tal f-pb8">联系方式</div>
        <div class="f-df s-c969799">
          <div class="f-fs20 f-pr6  s-cC8C9CC wsdfont wsd-dianhuashoujif"></div>
          <div class="f-fs14"> 电话：<a class="s-c969799" :href="'tel:' + hospitalInfo.ORG_PHONE">{{hospitalInfo.ORG_PHONE}}</a></div>
        </div>
        <div class="f-df f-pt8 s-c969799">
          <div class="f-fs20 f-pr6  s-cC8C9CC wsdfont wsd-zuobiaoweizhiditudingweif"></div>
          <div class="f-fs14 f-tal ">{{hospitalInfo.ORG_ADDRESS}}</div>
        </div>
      </div>
      <div class="desc-wrap f-mt12 ">
        <div class="f-fs16 f-lh22 f-fwb s-c323233 f-tal f-pb8">医院介绍</div>
        <p :class="[isOpenDetail?'':'line3 s-c969799']">{{hospitalInfo.ORG_INTRODUCE||'暂无介绍.'}}</p>
        <template v-if="hospitalInfo.ORG_INTRODUCE">
          <span class="s-c3D98FF f-fs14" @click="openDetail" v-if="hospitalInfo.ORG_INTRODUCE.length>73">
            <span v-if="!isOpenDetail">查看更多</span>
            <span v-else>收起</span>
            <i class="iconfont icon-arrow-right f-fs12"></i>
          </span>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'yyjs_index',
    components: {},
    created() {
      var t = this
      t.updateTitle('医院主页')
      t.getHospitalList()
    },
    computed: {},
    data() {
      return {
        hospitalInfo: '',
        isOpenDetail: false,
        pathParams: {},
      }
    },
    methods: {
      doDepartment(id, name, yq) {
        var t = this
        console.log(id, name)
        t.$store.state.store_yygh.ks_tree_data = ''
        t.$store.state.store_yygh.ks_tree_index = 0
        if (t.serverType == 'cz' || t.serverType == 'gd') {
          if (id == 'czrmyy001' || id == 'czsdzxrmyy' || (t.serverType == 'gd' && id != 'guangde001' && t.hospitalInfo.GH_FLAG == 1)) { //池州人民医院,东至人民
            t.pathParams.ORG_ID = id
            t.pathParams.ORG_NAME = name
            t.pathParams.ORG_YQ = yq || ''
            t.$store.state.store_yygh.ks_tree_data = ''
            t.$store.state.store_yygh.ks_tree_index = 0
            t.$store.state.store_yygh.hz_code = ''
            t.linkToPage('yygh_ks', t.pathParams)
          } else if (id == 'guangde001' && t.hospitalInfo.GH_FLAG == 1) { //广德人民医院
            t.linkToPage('yyghgd_index', {
              ORG_ID: id,
              ORG_NAME: name
            })
          } else {
            t.$dialog.alert({
                confirmButtonText: '好的',
                message: name + '还未进行数据对接，暂时无法挂号。',
              })
              .then(() => {

              })
          }
        } else {
          t.pathParams.ORG_ID = id
          t.pathParams.ORG_NAME = name
          t.pathParams.ORG_YQ = yq || ''
          t.$store.state.store_yygh.ks_tree_data = ''
          t.$store.state.store_yygh.ks_tree_index = 0
          t.$store.state.store_yygh.hz_code = ''
          t.linkToPage('yygh_ks', t.pathParams)
        }
      },
      getHospitalList() {
        var t = this
        var list = JSON.parse(localStorage.hospitalList)
        for (let c of list) {
          if (c.ORG_NAME == t.queryData.ORG_NAME) {
            t.hospitalInfo = c
            console.log(t.hospitalInfo)
          }
        }
      },
      openDetail() {
        this.isOpenDetail = !this.isOpenDetail
        console.log(this.isOpenDetail)
      },
    },
    mounted() {}
  }
</script>
<style scoped>
  .yyjs_index {
    background: #F4F7FB;
  }

  .yyjs_index .banner-wrap {
    width: 100%;
    text-align: center;
  }

  .yyjs_index .banner-wrap.noimg-wrap {
    height: 267px;
  }

  .yyjs_index .title {
    position: relative;
    top: -50px;
    color: #fff;
    font-size: 18px;
    line-height: 20px;
  }

  .yyjs_index .info-wrap {
    font-size: 14px;
    background: #F4F7FB;
    border-radius: 8px 8px 0px 0px;
    position: relative;
    top: -37px;
    padding: 16px;
  }

  .yyjs_index .info-wrap .item {
    text-align: center;
    width: 80px;
  }

  .yyjs_index .info-wrap .item .item-1 {
    border-radius: 8px;
    height: 40px;
    width: 40px;
    margin-left: 20px;
    padding-top: 10px;
  }

  .yyjs_index .info-wrap .item .iconfont {
    /* position: relative;
    font-size: 15px;
    top: -1px; */
  }

  .yyjs_index .menu-wrap {
    padding: 16px;
    font-size: 14px;
    line-height: 20px;
    color: #303133;
    text-align: center;
    background: #fff;
    border-radius: 8px;
  }

  .yyjs_index .desc-wrap {
    font-size: 14px;
    color: #606266;
    line-height: 22px;
    padding: 20px 15px;
    border-radius: 8px;
    background: #fff;
  }
</style>