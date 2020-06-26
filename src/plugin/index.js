import YouyoChat from './youyo-chat' // 导入组件
import MiniWindow from './mini-window'

YouyoChat.install = function(Vue) {
  Vue.component(YouyoChat.name, YouyoChat) // vuePayKeyboard.name 组件的name属性
  // 类似通过 this.$xxx 方式调用插件的 其实只是挂载到原型上而已
  // Vue.prototype.$xxx  // 最终可以在任何地方通过 this.$xxx 调用
  // 虽然没有明确规定用$开头  但是大家都默认遵守这个规定
}

MiniWindow.install = function(Vue) {
  Vue.component(MiniWindow.name, MiniWindow) // vuePayKeyboard.name 组件的name属性
  // 类似通过 this.$xxx 方式调用插件的 其实只是挂载到原型上而已
  // Vue.prototype.$xxx  // 最终可以在任何地方通过 this.$xxx 调用
  // 虽然没有明确规定用$开头  但是大家都默认遵守这个规定
}

const install = function(Vue, option = {}) {
  MiniWindow.install(Vue)
  YouyoChat.install(Vue)
  // 设置全局认证参数 required： true
  Vue.prototype.$authInfo = {
    webId: option.webId || '',
    orgi: option.orgi || ''
  }
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  install,
  YouyoChat,
  MiniWindow
}

export default {
  install
} // 导出..
