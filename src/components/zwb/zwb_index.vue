<template>
  <div class="zwb_index g-wrap g-hp100">
    <div class="banner-wrap f-pt20 f-pl20 f-pr20">
      <img class="g-wp100" src="../../assets/img/zwb/banner.png">
    </div>
    <div class="menu-list">
      <div class="list-item f-bs3" v-for="(c,i) in menuList" :key="i" @click="handlerMenu(c)">
        <img class="g-w40 f-ml10 f-mr20" :src="c.icons">
        <p>{{c.txt1}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'zwb_index',
  components: {},
  created() {
    t
    var t = this
    t.updateTitle('治未病')
  },
  computed: {},
  data() {
    return {
      menuList: [{
        icons: require('../../assets/img/zwb/menu-icon1.png'),
        txt1: '治未病自测',
        url: '/zwb_jkzc'
      }, {
        icons: require('../../assets/img/zwb/menu-icon3.png'),
        txt1: '治未病预约挂号',
        url: ''
      }]
    }
  },
  methods: {
    handlerMenu(data) {
      var t = this
      if (data.islink == '1') {
        window.location.href = data.url
      } else {
        if (data.url) {
          t.linkToPage(data.url)
        } else {
          t.$dialog.alert({
              confirmButtonText: '好的',
              message: data.txt1 + '还未进行数据对接，<br>暂时无法预约。',
            })
            .then(() => {

            })
        }
      }
    },
  },
  mounted() {}
}
</script>
<style scoped>
.zwb_index {
  position: relative;
}

.zwb_index .menu-list {
  padding: 20px 20px 0;
  width: 100%;
}

.zwb_index .menu-list .list-item {
  background: #fff;
  padding: 20px 20px;
  border-radius: 3px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: bold;
  color: #303133;
}
</style>