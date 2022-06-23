<template>
  <div class="jtys_qy_team g-wrap g-hp100 s-bgcfff">
    <van-form>
      <van-field right center>
        <template #label>
          <span>头像</span>
        </template>
        <template #button>
          <van-image round :src="xq.headImg " width="40px" height="40px" />
        </template>
      </van-field>
      <van-field v-model="xq.actualName" name="用户名" label="用户名" input-align="right" />
      <van-field v-model="xq.sex" name="性别" label="性别" input-align="right" />
      <van-field v-model="xq.age" name="年龄" label="年龄" input-align="right" />
      <van-field v-model="xq.national" name="民族" label="民族" input-align="right" />
      <van-field v-model="xq.depName" name="医生科室" label="医生科室" input-align="right" />
      <van-field v-model="xq.username" name="医生工号" label="医生工号" input-align="right" />
      <van-field v-model="xq.orgName" name="所属机构" label="所属机构" input-align="right" />
      <van-field v-model="xq.cardNumber" name="身份证号码" label="身份证号码" input-align="right" />
      <van-field v-model="xq.mobilePhone" name="电话号码" label="电话号码" input-align="right" />
      <van-field v-model="xq.email" name="邮箱地址" label="邮箱地址" input-align="right" />
    </van-form>
    <div class="g-wp100 f-pt30 f-pb30 s-bgcfff">
      <van-button class="item-btn f-bs3" color="#00c792" round @click="goBack(-1)">确认</van-button>
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
      t.updateTitle('医生详情')
      this.xq = t.queryData
    },
    data() {
      return {
        xq: []
      }
    },
    methods: {},
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
</style>