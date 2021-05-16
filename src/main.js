import Vue from 'vue'
import App from './App.vue'
import router from './rooter'
import store from './store'


//使用快速点击start
//1.在终端输入npm install fastclick
//2.导入import FastClick from 'fastclick'
//3.调用attach函数FastClick.attach(document.body)
//使用快速点击end

//使用图片懒加载start
import VueLazyLoad from 'vue-lazyload'
//1.在终端输入npm install vue-lazyload --save
//2.导入import VueLazyLoad from 'vue-lazyload'
// 3.使用懒加载的插件Vue.use(VueLazyLoad)
//4.原来代码中img里的:src改为v-lazy
Vue.use(VueLazyLoad,{
  //loading正在加载时显示的图片
  loading: require('./assets/img/common/pictureloding.gif')
})
//使用图片懒加载end

// import FastClick from 'fastclick'

import toast from 'components/common/toast'

Vue.config.productionTip = false

//因为this.$bus为空，赋值为一个Vue实例，好在Home里实现加载图片完成时监听
//添加事件总线对象
Vue.prototype.$bus = new Vue()

//安装toast插件
Vue.use(toast)

//解决移动端300ms的延迟
// FastClick.attach(document.body)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
