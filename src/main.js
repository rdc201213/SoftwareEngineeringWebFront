import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './css/global.css'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/ali-Icon/iconfont.css'
Vue.use(Element)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
