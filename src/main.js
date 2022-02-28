import Vue from 'vue'
import App from './App.vue'
import router from "./router/index"
import store from "./store/index"
import "@/util/dayjs"
//导入vant组件库
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
import "@/style/index.less"
//自动设置rem的基准值
import "amfe-flexible"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
