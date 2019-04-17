import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
// 引入 lodash
import _ from "lodash";
// 引入 elementui库 
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
const locale = require('element-ui/lib/locale/lang/zh-CN');
Vue.use(ElementUI, { locale: locale.default, size: 'mini' })

// 引入全局css
import "@/styles/index.scss";

// 引入 permission (路由拦截器)
import "./permission";


Vue.config.productionTip = false
Vue.prototype.log = (v1: any, v2?: any) => {
  if (v2) {
    console.log(_.cloneDeep(v1), _.cloneDeep(v2));
  } else {
    console.log(_.cloneDeep(v1));
  }
};
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
