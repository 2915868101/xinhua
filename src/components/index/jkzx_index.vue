<template>
  <div class="yygh_ks g-wrap">
    <div class="s-bgcfff f-pl16 f-pr16 f-pt12 f-pb12 ">
      <div class="search-wrap">
        <van-icon name="search" />
        <span>搜索资讯</span>
      </div>
    </div>
    <div class="tree-wrap s-bgcfff">
      <van-tree-select :style="{height:'100%'}" :items="items" :main-active-index.sync="activeIndex" @click-nav="onClickNav">
        <template #content v-if="itemList">
          <div class="item-list" v-if="itemList.length">
            <div v-for="(c,i) in itemList" :key="i">
              <!-- 三级科室 -->
              <div class="item-box" :ref="`itemBtn${i}`" v-if="c.MEDS" @click.stop="doShow(i)">
                <div class="b-tit">
                  <span>{{c.NAME}}</span>
                  <span class="icon"><i class="iconfont icon-arrow-right"></i></span>
                </div>
                <div class="b-cont">
                  <div class="item" v-for="(c1,i1) in c.MEDS" :key="i1" @click="onClickItem(c1)">
                    <span>{{c1.NAME}}</span>
                    <i class="iconfont icon-arrow-right"></i>
                  </div>
                </div>
              </div>
              <div class="item" v-else @click="onClickItem(c)">
                <span>{{c.NAME}}</span>
                <i class="iconfont icon-arrow-right"></i>
                <div v-for="(c1,i1) in c.MEDS" :key="i1">{{c1.NAME}}</div>
              </div>
            </div>
          </div>
          <van-empty v-else description="暂无资讯" />
        </template>
      </van-tree-select>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'yygh_ks',
    components: {},
    computed: {},
    created() {
      var t = this
      t.pathParams = t.queryData || {}
      t.updateTitle('健康资讯')
    },
    data() {
      return {
        activeIndex: 0,
        items: [{
            text: '全部资讯',
            id: '',
            children: []
          },
          {
            text: '疾病资讯',
            id: '',
            children: ''
          },
          {
            text: '科学用药',
            id: '',
            children: '',
          },
          {
            text: '饮食保健',
            id: '',
            children: '',
          },
          {
            text: '中医养生',
            id: '',
            children: '',
          }
        ],
        itemList: [],
        pathParams: {},
        showIndex: '',
        queryData1: {}
      }
    },
    methods: {},
    mounted() {},
    beforeDestroy() {
      // this.$store.state.store_yygh.ks_tree_data=''
    }
  }
</script>
<style scoped>
  @media screen and (max-width: 320px) {}

  .yygh_ks {
    position: relative;
    background: #ECF1F6;
  }

  .yygh_ks .search-wrap {
    padding: 8px 15px;
    border-radius: 80px;
    font-size: 14px;
    background: #F4F7FB;
    color: #969799;
  }

  .yygh_ks .search-wrap>>>.van-icon {
    vertical-align: -2px;
    margin-right: 10px;
  }

  .yygh_ks .tree-wrap {
    position: absolute;
    border-top: 1px solid #ebeef5;
    top: 60px;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .yygh_ks>>>.van-tree-select__nav {
    background: #F4F7FB;
  }

  .yygh_ks>>>.van-sidebar-item {
    border-bottom: 1PX solid #ebeef5;
    background: #F4F7FB;
    font-size: 15px;
    padding: 15px;
  }

  .yygh_ks>>>.van-sidebar-item--select::before {
    background: transparent;
  }

  .yygh_ks>>>.van-sidebar-item--select,
  .yygh_ks>>>.van-sidebar-item--select:active {
    background: #fff;
  }

  .yygh_ks .item-list .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 17px 15px;
    font-size: 15px;
    border-bottom: 1PX solid #fff;
  }

  .yygh_ks .item-list .item .iconfont {
    color: #909399;
    font-size: 12px;
  }

  /*二级科室展开*/
  .yygh_ks .item-list .item-box {
    padding: 0 15px;
  }

  .yygh_ks .item-list .item-box .b-tit {
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 17px 15px;
    font-size: 15px;
    border-bottom: 1PX solid #fff;
    padding: 17px 0;
  }

  .yygh_ks .item-list .item-box .b-tit .icon {
    border-radius: 50%;
    -moz-transition: all .5s ease;
    -webkit-transition: all .5s ease;
    -o-transition: all .5s ease;
    transition: all .5s ease;
    transform: rotate(90deg);
    border: 1px solid #c0c4cc;
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
  }

  .yygh_ks .item-list .item-box .b-tit .iconfont {
    transform: scale(0.8);
    margin: 0 auto;
  }

  .yygh_ks .item-list .item-box .b-cont {
    height: 0;
    overflow: hidden;
    -moz-transition: height .5s ease;
    -webkit-transition: height .5s ease;
    -o-transition: height .5s ease;
    transition: height .5s ease;
  }

  .yygh_ks .item-list .item-box .iconfont {
    font-size: 12px;
    color: #909399;
  }

  .yygh_ks .item-list .item-box .item {
    padding-left: 10px;
    padding-right: 0;
  }

  .yygh_ks .item-list .item-box.on .b-tit .icon {
    color: #00c792;
    border-color: #00c792;
    transform: rotate(-90deg);
  }

  .yygh_ks .item-list .item-box.on .b-tit .iconfont {
    color: #00c792;
  }

  .yygh_ks .item-list .item-box.on .b-cont {
    height: auto;
  }

  /*.yygh_ks .item-list .item-box.on .b-cont {
  color: #00c792;
}*/

  .yygh_ks_home>>>.van-empty {
    font-size: 15px;
    text-align: center;
  }
</style>