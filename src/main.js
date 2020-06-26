import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import YouyoChat from './plugin/index'
import router from './router/index'
import './styles/index.scss'
import 'element-ui/lib/theme-chalk/base.css'

Vue.use(Element)
Vue.use(YouyoChat)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
