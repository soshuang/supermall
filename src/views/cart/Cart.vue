<template>
  <div class="cart">
    <!--导航-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <!--商品的列表-->
    <cart-list></cart-list>
    <!--底部汇总-->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartBottomBar from "./childComps/CartBottomBar";
import CartList from "./childComps/CartList";
//1.为了能在computed使用index.js里的getters所以先引入mapGetters
import { mapGetters } from "vuex";

export default {
  name: "cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  computed: {
    //2.然后解构mapGetters,传入要用的getters.js里的方法名称
    ...mapGetters(["cartLength"]),
    //  3.如果想改getters.js里面的方法名称方便使用，可以
    //     ...mapGetters({
    //       length:'cartLength'
    //     })
  },
};
</script>

<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: white;
  font-weight: 700;
}
</style>
