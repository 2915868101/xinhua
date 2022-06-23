<template>
  <div class="bgcx_jc g-wrap g-hp100 s-bgcfff">
    <div class="notice-wrap" v-show="queryData.age">{{queryData.age}}</div>
    <van-cell-group class="f-bb10">
      <van-cell title="申请单号：">
        {{detailData.REPORT_NUM || '--'}}
      </van-cell>
      <van-cell title="报告医生：">
        {{detailData.REPORT_DOCTOR_NAME || '--'}}
      </van-cell> 
      <van-cell title="申请类型：">
        {{detailData.EXAM_TYPE || '--'}}
      </van-cell>
      <div class="cell-item">
        <div class="tit s-c606266 f-pb15">检查结果：</div>
        <div class="f-lh25">{{detailData.REPORT_OBJECTIVE || '--'}}</div>
      </div>
    </van-cell-group>
    <div class="cell-item f-df f-dfj">
      <div class="tit s-c606266">影像所见</div>
      <div class="txt f-tdu s-c00c792" @click="linkToPage('wodo_index',{img:images})" v-if="images.length">影像图片</div>
    </div>
    <div class="cell-item f-lh25">
      {{detailData.DIAGNOSIS_IDEA || '--'}}
    </div>
  </div>
</template>
<script>
export default {
  name: 'bgcx_jc',
  components: {
  },
  computed: {},
  created() {
    var t = this
    t.updateTitle('检查报告详情')
    t.getData()
  },
  data() {
    return {
      detailData: '',
      images: [],
    }
  },
  methods: {
    getData() {
      var t = this
      t.ajax({
        serverId: 'BMFW00017',
        url: t.serverPath2,
        params: {
          id: t.queryData.id 
        },
        success: function(data) {
          t.detailData = data[0].CONTENTS ? data[0].CONTENTS[0] : []
          console.log(t.detailData)
          if (t.detailData.IMG.length) {
            t.images = Object.values(t.detailData.IMG).map(function(row) {
              return row.IMAGE_SAVE_PATH
            })
          }
        }
      })
    },
  },
  mounted() {}
}
</script>
<style scoped>
@media screen and (max-width: 320px) {}

.bgcx_jc>>>.van-cell {
  padding: 15px;
  font-size: 15px;
  border-bottom: 1PX solid #ebeef5;
  font-size: 15px;
}

.bgcx_jc>>>.van-cell__title {
  color: #606266;
  flex: 8;
}

.bgcx_jc>>>.van-cell__value {
  color: #303133;
  text-align: left;
  flex: 16;
}

.bgcx_jc>>>.van-cell:not(:last-child)::after {
  border-bottom: 0;
}

.bgcx_jc .cell-item {
  padding: 18px 15px; 
  border-bottom: 1PX solid #ebeef5;
  font-size: 15PX;
  background: #fff;  
}
.bgcx_jc .f-lh25{
  line-height: 22PX; 
  text-indent: 2em;
}
.bgcx_jc .tit-item {
  border-bottom: 1PX solid #ebeef5;
  padding: 18px 15px;
  font-size: 15px;
} 
.bgcx_jc .notice-wrap {
  background: #00c792;
  color: #fff;
  padding: 15px;
  font-size: 14px;
}
</style>