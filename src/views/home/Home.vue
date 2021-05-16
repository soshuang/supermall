<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      class="tab-control"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"
    ></tab-control>

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <recommend-view :recommends="recommends" />
      <feature-view></feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <goods-list :goodsList="showGoods"></goods-list>
    </scroll>
    <!--@clicl不加.native不能监听原生组件的事件-->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";
// import { debounce } from "common/debounce";
import { imgListener } from "common/itemImgListener";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  mixin: [imgListener],
  created() {
    //  1.请求多个数据
    this.getHomeMultidata();
    //  2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
  },
  mounted() {
    //不要在created里使用$refs，偶尔已经有了数据在$refs了，created还没好，导致报错
    // 1.图片加载完成的事件监听
    // const refresh = debounce(this.$refs.scroll.refresh, 200);
    // this.$bus.$on("homeitemImageLoad", () => {
    //   console.log(this.$refs.scroll.refresh());
    //   refresh();
    // });
    // 2.获取tabControl的offsetTop
    // console.log(this.$refs.tabControl.offsetTop);
    // undefine;
    //所有的组件都有一个属性$el:用于获取组件中的元素
  },
  methods: {
    //事件监听相关的方法
    // 防抖debounce
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      //500毫秒内回到0,0位置
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      //1.判断BackTop是否显示
      // console.log(position);
      this.isShowBackTop = -position.y > 1000;
      // 2.决定tabControl是否吸顶(position:fixed)
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
      //refresh刷新scroll的高度，防止图片等还没异步加载出来时计算的scroll高度不够，导致有时能滑到最后，有时只能滑到一半
      this.$refs.scroll.refresh();
      this.$refs.scroll.finishPullUp();
    },
    swiperImageLoad() {
      // console.log(this.$refs.tabControl.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    //网络请求相关的方法
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // this.$refs.scroll.finishPullUp()
      });
    },
  },
};
</script>

<style scoped>
/*scoped作用域*/
#home {
  height: 100vh;
  /*vh viewport height视口高度*/

  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: white;
  /*在使用浏览器原生滚动时, 为了让导航不跟随一起滚动*/
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 9;*/
}
.tab-control {
  position: relative;
  z-index: 9;
}

/*.tab-control{*/
/*!*sticky兼容性不强*!*/
/*position: sticky;*/
/*top:44px;*/
/*z-index: 9;*/
/*}*/
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

/*.content{*/
/*height: calc(100% - 93px);*/
/*margin-top: 44px;*/
/*overflow: hidden;*/
/*}*/
</style>
