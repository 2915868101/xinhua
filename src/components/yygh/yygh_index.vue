<template>
  <div class="yygh_index g-wrap">
    <van-search v-model="searchForm.ORG_AREA" shape="round" placeholder="搜索医院" @search="getHospitalList" />
    <van-list v-model="loading" :finished="finished" finished-text="">
      <div class="hospital-item" v-for="(c,i) in hospitalLiat" :key="i" @click="doDepartment(c)">
        <img class="item-img" :src="c.ORG_PIC_URL||hospitalimg" @click.stop="doHospital(c)" />
        <div class="item-cont">
          <div class="name line1">{{c.org_name}}</div>
          <div class="addr line1">
            <span v-if="c.distance">{{Number(c.distance).toFixed(1)}}km</span>
            <span v-else>--</span>
            <span class="f-pl3 f-pr3">|</span>
            <span>{{c.org_adress}}</span>
          </div>
          <div class="f-df f-pt5">
            <van-tag color="#E6F5FF" text-color="#1479FF" class="f-mr8" v-show="c.org_level">{{c.org_level}} </van-tag>
            <van-tag color="#FFF7E6" text-color="#FA8C16" v-show="c.org_level">{{'已关注'}} </van-tag>
            <!-- <span class="b-tag f-mr8" v-show="c.org_attr">{{c.org_attr}}</span> -->
          </div>
        </div>
      </div>
    </van-list>
    <van-empty v-show="noData" description="没有搜索到相关信息" />
  </div>
</template>
<script>
  export default {
    name: 'yygh_index',
    components: {},
    computed: {},
    created() {
      var t = this
      t.updateTitle('选择医院')
      t.getAreaList()
      t.getLocation(t.wx_configParams)
      t.getHospitalList()

    },
    data() {
      return {
        hospitalimg: require('@/assets/img/index/hospitalA.png'),
        currentPage: 1,
        isShow: false,
        isActive: false,
        hospitalLiat: [],
        loading: false,
        finished: false,
        value1: '',
        option1: [{
          text: '全部',
          value: ''
        }],
        searchForm: {
          ORG_AREA: '',
          LONGITUDE: '112.889211',
          LATITUDE: '28.21384',
          GRADE: '',
          Q_TYPE: 'ALL',
        },
        pathParams: {},
        noData: false
      }
    },
    methods: {
      getLocation(config) {
        var t = this
        // t.getHospitalList()
        var wx_config = JSON.parse(JSON.stringify(config))
        wx_config.jsApiList = ['getLocation']
        t.$wechat.config(wx_config)
        t.$wechat.ready(function() {
          t.$wechat.getLocation({
            type: 'wgs84',
            success: function(res) {
              console.log(res)
              t.searchForm.LATITUDE = res.latitude; // 纬度，浮点数，范围为90 ~ -90
              t.searchForm.LONGITUDE = res.longitude; // 经度，浮点数，范围为180 ~ -180。 
              t.getHospitalList()
            },
            fail: function(res) {
              console.log(res)
              t.getHospitalList()
            }
          })
        })
      },
      getAreaList() {
        var t = this
        t.ajax({
          serverId: 'WXBM00001',
          url: t.serverPath4 || t.serverPath1,
          params: {
            LONGITUDE: t.searchForm.LONGITUDE,
            LATITUDE: t.searchForm.LATITUDE,
            Q_TYPE: ''
          },
          success: function(data) {
            if (data[0].CONTENTS) {
              for (let item of data[0].CONTENTS) {
                t.option1.push({
                  text: item.org_area,
                  value: item.org_area,
                })
              }
            }
            console.log(t.option1)
          }
        })
      },
      getHospitalList() {
        var t = this
        console.log(111111111111, t.searchForm)
        t.ajax({
          serverId: 'WXBM00001',
          url: t.serverPath4 || t.serverPath1,
          params: t.searchForm,
          success: function(data) {
            t.hospitalLiat = data[0].CONTENTS || []
            t.finished = true
            console.log(t.hospitalLiat)
            t.noData = t.hospitalLiat == 0 ? true : false
          }
        })
      },
      // 按等级筛选
      doShowSelect() {
        this.isShow = !this.isShow
      },
      doSelectItem() {
        var t = this
        t.isShow = !t.isShow
        t.isActive = !t.isActive
        t.searchForm.GRADE = t.isActive ? '等级' : ''
        t.getHospitalList()
      },
      onChange(val) {
        var t = this
        t.searchForm.ORG_AREA = val
        t.getHospitalList()
      },
      doDepartment(data) {
        var t = this
        console.log(data)
        // if (data.org_id == 'XHrmyy') {
        //   t.pathParams.ORG_ID = data.org_id
        //   t.pathParams.ORG_NAME = data.org_name
        //   t.pathParams.ORG_YQ = data.org_yq
        //   t.$store.state.store_yygh.ks_tree_data = ''
        //   t.$store.state.store_yygh.ks_tree_index = 0
        //   t.$store.state.store_yygh.hz_code = ''
        //   t.linkToPage('yygh_ks', t.pathParams)
        // } else {
        t.$dialog.alert({
            confirmButtonText: '好的',
            message: data.org_name + '还未进行数据对接，暂时无法预约。',
          })
          .then(() => {})
        // }
        // if (t.serverType == 'cz' || t.serverType == 'gd'||t.serverType == 'xh') {
        //   if (data.ORG_ID == 'czrmyy001' || data.ORG_ID == 'czsdzxrmyy' || (t.serverType == 'gd' && data.ORG_ID != 'guangde001' && data.GH_FLAG == 1)) { //池州人民医院,东至人民&& 广德除人民医院外的
        //     t.pathParams.ORG_ID = data.ORG_ID
        //     t.pathParams.ORG_NAME = data.ORG_NAME
        //     t.pathParams.ORG_YQ = data.ORG_YQ
        //     t.$store.state.store_yygh.ks_tree_data = ''
        //     t.$store.state.store_yygh.ks_tree_index = 0
        //     t.$store.state.store_yygh.hz_code = ''
        //     t.linkToPage('yygh_ks', t.pathParams)
        //   } else if (data.ORG_ID == 'guangde001' && data.GH_FLAG == 1) { //广德人民医院
        //     t.linkToPage('yyghgd_index', {
        //       ORG_ID: data.ORG_ID,
        //       ORG_NAME: data.ORG_NAME
        //     })
        //   } else {
        //     t.$dialog.alert({
        //         confirmButtonText: '好的',
        //         message: data.ORG_NAME + '还未进行数据对接，暂时无法预约。',
        //       })
        //       .then(() => {

        //       })
        //   }
        // } else {
        //   t.pathParams.ORG_ID = data.ORG_ID
        //   t.pathParams.ORG_NAME = data.ORG_NAME
        //   t.pathParams.ORG_YQ = data.ORG_YQ
        //   t.$store.state.store_yygh.ks_tree_data = ''
        //   t.$store.state.store_yygh.ks_tree_index = 0
        //   t.$store.state.store_yygh.hz_code = ''
        //   t.linkToPage('yygh_ks', t.pathParams)
        // }

      },
    },
    mounted() {}
  }
</script>
<style scoped>
  @media screen and (max-width: 320px) {}

  .yygh_index {
    background: linear-gradient(180deg, #8FCBFF 0%, #F4F7FB 34.48%);
  }

  .yygh_index>>>.van-search {
    background: transparent;
    padding: 12px 16px 16px 16px;
  }

  .yygh_index>>>.van-search__content {
    background: #fff;
  }

  .yygh_index>>>.van-search .van-cell {
    font-size: 14px;
    line-height: 22px;
    color: #969799;

  }

  .yygh_index .hospital-item {
    padding: 20px 15px;
    margin: 0 16px;
    background: #fff;
    border-bottom: 1PX solid #ebeef5;
    overflow: hidden;
    border-radius: 8px;
  }

  .yygh_index .hospital-item .item-img {
    float: left;
    width: 84px;
    height: 63px;
    margin-right: 15px;
    border-radius: 3px;
  }

  .yygh_index .hospital-item .item-cont {
    margin-left: 98px;
    height: 63px;
  }

  .yygh_index .hospital-item .item-cont .name {
    font-size: 14px;
    line-height: 22px;
    color: #303133;
    font-weight: bold;
  }


  .yygh_index .hospital-item .item-cont .addr {
    font-size: 12px;
    line-height: 18px;
    color: #969799;
    display: flex;
  }

  .yygh_index .hospital-item .item-cont .addr .addr-l {
    width: 75%;
  }

  .yygh_index .hospital-item .item-cont .addr .addr-r {
    justify-content: space-around;
    width: 25%;
    text-align: right;
  }
</style>