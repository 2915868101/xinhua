<template>
  <div class="jtys_qyjt g-wrap f-pl15 f-pr15 f-pt15">
    <van-empty description="暂无随访计划" />
  </div>
</template>
<script>
  export default {
    name: 'jtys_qyjt',
    components: {},
    computed: {},
    created() {
      var t = this
      t.updateTitle('随访计划')
    },
    data() {
      return {}
    },
    methods: {},
    mounted() {}
  }
</script>
<style scoped>
  @media screen and (max-width: 320px) {}
</style>