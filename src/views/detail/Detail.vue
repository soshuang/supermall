<template>
  <div id="detail">
    <detail-nav-bar
      ref="navbar"
      class="detail-nav"
      @titleClick="titleClick"
    ></detail-nav-bar>
    <scroll
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      :probe-type="3"
    >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></detail-info>
      <detail-param-info
        ref="params"
        :param-info="paramInfo"
      ></detail-param-info>
      <detail-comment-info
        ref="comment"
        :comment-info="commentInfo"
      ></detail-comment-info>
      <goods-list
        ref="recommend"
        :goodsList="recommends"
        class="fugai"
      ></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <!--@click不加.native不能监听原生组件的事件-->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

    <!--<toast :message="message" :isShow="isShow" ></toast>-->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailInfo from "./childComps/DetailInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import BackTop from "components/content/backTop/BackTop";
import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";
import { debounce } from "common/debounce";
import { imgListener } from "common/itemImgListener";

// import Toast from 'components/common/toast/Toast'
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Scroll,
    GoodsList,
    DetailBottomBar,
    BackTop,
    // Toast
  },
  mixins: [imgListener],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIndex: 0,
      isShowBackTop: false,
      // message:'',
      // isShow:false
    };
  },
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid;
    // 2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      //1.获取顶部的轮播数据
      // console.log(res);
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      //  2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //  3.获取商家信息
      this.shop = new Shop(data.shopInfo);
      //  4.保存商品的详情数据
      this.detailInfo = data.detailInfo;
      //  5.获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //  6.取出评论的信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
        // console.log(this.commentInfo);
      }
      // 第一次获取，值不对，dom没有渲染
      //上面没值的原因是渲染要一定的时间，然而我们取的时候还没渲染出来
      // this.themeTopYs = []
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      // console.log(this.themeTopYs);
      // this.$nextTick(()=>{
      //   //根据最新的数据，对应的DOM是已经被渲染出来了，但图片依然没有加载完(目前获取到的offsetTop不包含图片)
      //   //offsetTop值不对的时候，都是因为图片的问题
      //   this.themeTopYs = []
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      //   console.log(this.themeTopYs);
      // })
    });
    //  3.请求推荐数据
    getRecommend().then((res) => {
      // console.log(res);
      this.recommends = res.data.list;
    });
  },

  methods: {
    backClick() {
      //500毫秒内回到0,0位置
      this.$refs.scroll.scrollTo(0, 0);
    },
    imageLoad() {
      this.$refs.scroll.refresh();
      //之前在goodslist里做过判断了，所以这里不做防抖
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      //最后加入最大值以便后面的判断
      this.themeTopYs.push(Number.MAX_VALUE);
      // console.log(this.themeTopYs);
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    contentScroll(position) {
      // console.log(position);
      //1.获取y值
      const positionY = -position.y;
      //2.positionY和主题中值进行对比
      //[0, 10292, 11017, 11211]
      //positionY在0和10292之间，index= 0
      //positionY在10292和11017之间，index= 1
      //positionY在11017和11211之间，index= 2
      //positionY大于11211，index= 3
      //if判断，复用性低，start
      //   if(positionY >= this.themeTopYs[0] && positionY < this.themeTopYs[1]){
      //     this.$refs.navbar.currentIndex = 0;
      //   } else if (positionY >= this.themeTopYs[1] && positionY < this.themeTopYs[2]){
      //     this.$refs.navbar.currentIndex = 1;
      //   } else if (positionY >= this.themeTopYs[2] && positionY < this.themeTopYs[3]){
      //     this.$refs.navbar.currentIndex = 2;
      //   }else{
      //     this.$refs.navbar.currentIndex = 3;
      //   }

      let length = this.themeTopYs.length;
      //在themeTopYs里加入一个Number.MAX_VALUE,然后在不判断最后一个
      // console.log(Number.MAX_VALUE);
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.navbar.currentIndex = this.currentIndex;
        }
      }

      //3.是否显示回到顶部
      this.isShowBackTop = -position.y > 800 ? true : false;
    },
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      // console.log(product.title);
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      //  2.将商品添加到购物车里面
      this.$store.dispatch("addCart", product).then((res) => {
        // console.log(res);
        // this.message = res
        // this.isShow = true
        // setTimeout(()=>{
        //   this.isShow = false
        // },5000)

        // console.log(this.$toast);
        // this.$toast.show(res,2000)
        this.$toast.show("添加商品到购物车");
      });
    },
  },
  mounted() {
    //   const refresh = debounce(this.$refs.scroll.refresh,200)
    //   this.$bus.$on('detailitemImageLoad',()=>{
    //     // console.log(this.$refs.scroll.refresh());
    //     refresh()
    // })
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
  overflow: hidden;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px - 49px);
}
.fugai {
  background-color: #fff;
}
</style>
