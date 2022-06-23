<template>
  <div class="jtys_qy_team g-wrap g-hp100 s-bgcfff">
    <div class="top-wrap">
      <div class="name f-mb10">{{pathParams.SIGN_ORG}}
      </div>
      <div class="addr">
        <i class="iconfont icon-position f-fs14 f-mr8"></i>
        地址:{{pathParams.SIGN_ADDRESS}}
      </div>
    </div>
    <div class="info-wrap s-bgcfff">
      <van-cell title="服务电话" :value="pathParams.SIGN_PHONE" />
      <van-cell title="团队成员" />
      <!-- 医生列表 -->
      <div class="doctor-list">
        <van-radio-group v-model="radio" v-for="(c,i) in ysList" :key="i">
          <van-row class="list-item" type="flex" justify="space-between" :gutter="20">
            <van-radio :name="i">
              <div @click.stop="linkToPage('jtys_qy_teamysxq',c)">
                <van-col :span="4">
                  <van-image round :src="c.headImg " />
                </van-col>
                <van-col :span="20">
                  <div class="item-cont">
                    <div>
                      <span class="name f-mr10 s-c303133">{{c.actualName}}</span>
                      <span>{{c.depName}}医生</span>
                    </div>
                    <div>医生工号：{{c.username}}</div>
                  </div>
                </van-col>
              </div>
            </van-radio>
          </van-row>
        </van-radio-group>
      </div>
    </div>
    <div class="g-wp100 f-pt30 f-pb30 s-bgcfff" v-if="!queryData.isFWJG">
      <van-button class="item-btn f-bs3" color="#00c792" round @click="toQy02">确认</van-button>
    </div>
    <div class="g-wp100 f-pt30 f-pb30 s-bgcfff" v-else>
      <van-button class="item-btn f-bs3" color="#00c792" round @click="goBack(-2)">返回</van-button>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'jtys_qy_team',
    components: {},
    computed: {},
    created() {
      var t = this
      t.updateTitle('医生团队')
      t.pathParams = t.queryData
      console.log(t.pathParams)
      t.getTeamList()
    },
    data() {
      return {
        activeName: '2',
        ysList: '',
        teamInfo: [],
        radio: '0',
      }
    },
    methods: {
      getTeamList() {
        var t = this
        t.ajax({
          serverId: 'BMFW00022',
          url: t.serverPath1,
          params: {
            ORG_ID: t.queryData.SIGN_ORG_ID
          },
          success: function(data) {
            console.log(1213213, data[0].data)
            t.ysList = data[0].data
            t.teamInfo = t.ysList.find(function(obj) {
              return obj.SFTZ === '1'
            }) || {}
            console.log(12, t.ysList)
          }
        })
      },
      toQy02() {
        var t = this
        console.log(123123, '被选中的值为:' + t.ysList[this.radio].cardNumber)
        t.pathParams.SIGN_DOCTOR = t.ysList[this.radio].actualName
        t.pathParams.DOCTOR_NUM = t.ysList[this.radio].cardNumber
        t.pathParams.YSPHONE = t.ysList[this.radio].mobilePhone
        t.pathParams.ZGBM = t.ysList[this.radio].username
        t.linkToPage('jtys_qy_02', t.pathParams)
      }
    },
    mounted() {}
  }
</script>
<style scoped>
  @media screen and (max-width: 320px) {}

  .jtys_qy_team .g-wp100>>>.van-button {
    width: 90%;
    margin: 20px 5% 0;
    height: 50px;
    padding: 0 10px;
  }

  .jtys_qy_team .top-wrap {
    font-size: 14px;
    padding: 15px;
    border-bottom: 10px solid #f4f9f9;
  }

  .jtys_qy_team .top-wrap .name span {
    color: #303133;
    font-weight: bold;
  }

  .jtys_qy_team .info-wrap {
    background: #fff;
  }

  .jtys_qy_team>>>.van-cell {
    padding: 15px 20px;
    border-bottom: 1PX solid #ebeef5;
  }

  .jtys_qy_team>>>.van-cell:not(:last-child)::after {
    border-bottom: 0;
  }

  .jtys_qy_team>>>.van-collapse-item__content {
    padding: 0;
  }

  .jtys_qy_team .doctor-list .list-item {
    padding: 15px;
    font-size: 15px;
    line-height: 50px;
    text-align: center;
  }

  .jtys_qy_team .doctor-list .list-item:not(:last-child) {
    border-bottom: 1PX solid #ebeef5;
  }

  .jtys_qy_team .doctor-list .item-icon {
    background: #f2f6fc;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 50%;
  }

  .jtys_qy_team .doctor-list .item-icon .iconfont {
    color: #d7dee8;
    font-size: 32px;
  }

  .jtys_qy_team .doctor-list .item-cont {
    line-height: 25px;
    font-size: 14px;
    text-align: left;
  }

  .jtys_qy_team .doctor-list .item-cont .name {
    font-weight: bold;
    font-size: 15px;
  }

  .jtys_qy_team .doctor-list .item-cont .tips span {
    display: inline-block;
  }
</style>