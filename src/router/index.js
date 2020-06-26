import Vue from 'vue'
import Router from 'vue-router'
import Chat from '@/views/chat/index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/chat/:webId/:orgi',
      name: 'uploadUse',
      component: Chat
    }
  ]
})
