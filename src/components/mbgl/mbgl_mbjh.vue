<template>
  <div class="mgbl_mbjh g-wrap g-hp100 s-bgcfff">
    <div class="record-list s-bgcfff" v-if="recordList.length">
      <div class="list-item" v-for="(c,i) in recordList" :key="i" @click="doDetail(c)">
        <div class="date s-c606266">{{c.TREAT_DATE}}</div>
        <div class="name">{{c.CHECKNAME}}</div>
        <div class="orgname">{{c.ORG_NAME}}</div>
      </div>
    </div>
    <van-empty v-else description="暂无慢病记录" />
  </div>
</template>
<script>
export default {
  name: 'mgbl_mbjh',
  components: {
  },
  created() {
    var t = this
    t.updateTitle('慢病监护')
    // 判断是否注册
    t.isRegister({ openid: t.wx_userInfo.openid, type: 0 }, function(sucFun) {
      t.searchForm.CNUM = sucFun.CONTENTS[0].CARD_NUMBER 
      t.getRecordList()
    })
  },
  computed: {},
  data() {
    return {
      searchForm: {
        CNUM: ''
      },
      recordList: []
    }
  },
  methods: {
    getRecordList() {
      var t = this
      t.ajax({
        serverId: 'WXBM00038',
        url: t.serverPath2,
        params: t.searchForm,
        success: function(data) { 
          t.recordList=data[0].CONTENTS
        }
      })
    },
    doDetail(data) {
      this.linkToPage(data.TYPE, { TREATMENT_ID: data.TREATMENT_ID, TYPE: data.TYPE, pageTitle: data.CHECKNAME })
    }
  },
  mounted() {}
}
</script>
<style scoped>
.mgbl_mbjh .record-list {
  padding: 20px;
}

.mgbl_mbjh .record-list .list-item {
  padding: 15px;
  font-size: 14px;
  color: #909399;
  border: 1px solid #ebeef5;
  border-radius: 5px;
  margin-bottom: 20px;
}

.mgbl_mbjh .record-list .list-item .name {
  margin: 10px 0 6px;
  font-weight: bold;
  font-size: 15px;
  color: #00c792;
}
</style>