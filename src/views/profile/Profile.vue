<template>
  <div class="profile">
    <div class="profile_nav_bar">
      <nav-bar>
        <div slot="center">我的</div>
      </nav-bar>
    </div>
    <div>
      <div>
        <div class="user_info">
          <div class="user_img">
            <img src="http://static.hdslb.com/images/akari.jpg" alt="" />
            <!-- 网上随便的图片 -->
          </div>
          <div class="user_status">
            <div class="userName">xxx</div>
          </div>
        </div>
      </div>
    </div>
    <div class="profile_user_info">
      <div>
        <div class="count">0</div>
        <div>收藏夹</div>
      </div>
      <div>
        <div class="count">0</div>
        <div>足迹</div>
      </div>
      <div>
        <div class="count">0</div>
        <div>红包卡卷</div>
      </div>
    </div>
    <div class="profile_user_order">
      <div class="user_order">
        <span class="my_order">我的订单</span>
        <span class="all_orders">查看全部订单</span>
      </div>
      <div class="order_info">
        <div class="finance">
          <div class="icon icon_finance"></div>
          <div>待付款</div>
        </div>
        <div>
          <div class="icon icon_deliver"></div>
          <div>代发货</div>
        </div>
        <div>
          <div class="icon icon_receive"></div>
          <div>待收货</div>
        </div>
        <div>
          <div class="icon icon_evaluate"></div>
          <div>评价</div>
        </div>
        <div>
          <div class="icon icon_aftersales"></div>
          <div>退款\售后</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "",
  data() {
    return {};
  },
  components: {
    NavBar,
  },
  methods: {},
};
</script>
<style scoped>
.profile {
  background-color: rgb(248, 248, 248);
  height: 800px;
}
.user_info {
  display: flex;
  color: #999;
}
.user_img {
  height: 50px;
  margin: 10px 20px 10px 10px;
}
.user_img img {
  border-radius: 50px;
  height: 50px;
}
.user_status {
  line-height: 70px;
  text-align: center;
  font-size: 20px;
}
.userName {
  color: #000;
}
.profile_nav_bar {
  background-color: var(--color-tint);
  height: 44px;
  box-shadow: 0 1px 1px rgba(100, 100, 100, 0.1);
}
.nav_bar_setup {
  display: flex;
  justify-content: center;
}
.set_up {
  text-align: center;
  line-height: 44px;
  font-size: 18px;
}
.set_up_1 {
  margin-left: 5px;
}
.set_up_2 {
  margin: 0px 10px;
}

.profile_user_info {
  display: flex;
  justify-content: space-around;
  font-size: 16px;
  height: 60px;
  text-align: center;
  color: #666;
}
.profile_user_info > div {
  padding-top: 12px;
}
.count {
  color: black;
}
.profile_user_order {
  margin: 15px;
  border: 1px soild #ffffff;
  background-color: #ffffff;
  border-radius: 5px;
  height: 100px;
}
.user_order {
  height: 40px;
  font-size: 16px;
  margin-top: 10px;
  line-height: 40px;
  border-bottom: 0.5px solid rgb(231, 231, 231);
}
.my_order {
  position: relative;
  float: left;
  margin-left: 10px;
}
.all_orders {
  position: relative;
  float: right;
  margin-right: 10px;
}
.order_info {
  height: 70px;
  display: flex;
  justify-content: space-around;
  font-size: 13px;
  line-height: 24px;
  text-align: center;
  margin-top: 5px;
}

.icon {
  width: 25px;
  height: 25px;
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
}
.icon_finance {
  margin-left: 8px;
  background-image: url("https://gw.alicdn.com/tfs/TB135Ipp.H1gK0jSZSyXXXtlpXa-87-87.png_60x60q90_.webp");
}
.icon_deliver {
  margin-left: 8px;
  background-image: url("https://gw.alicdn.com/tfs/TB1DdAqp.Y1gK0jSZFMXXaWcVXa-87-87.png_60x60q90_.webp");
}
.icon_receive {
  margin-left: 8px;
  background-image: url("https://gw.alicdn.com/tfs/TB1b3zgmMmTBuNjy1XbXXaMrVXa-87-87.png_60x60q90_.webp");
}
.icon_evaluate {
  margin-left: 3px;
  background-image: url("https://gw.alicdn.com/tfs/TB1fOKqm_tYBeNjy1XdXXXXyVXa-87-87.png_60x60q90_.webp");
}
.icon_aftersales {
  margin-left: 18px;
  border-radius: 50%;
  background-position-x: -1px;

  background-image: url("https://gw.alicdn.com/tfs/TB1fMzgmMmTBuNjy1XbXXaMrVXa-87-87.png_60x60q90_.webp");
}
</style>
