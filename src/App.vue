<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
  import MainTabBar from 'components/content/mainTabbar/MainTabBar'
  export default {
    name: 'App',
    components: {
      MainTabBar
    }
  }
</script>

<style>
  /*在vue.config.js里先配置别名*/
  /*由于cli3没有.editorconfig这个代码规范的文件，从之前的项目复制*/
  @import "assets/css/base.css";
</style>
