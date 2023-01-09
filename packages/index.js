export * from './components'
import * as components from './components'
export * from './directives'
import * as directives from './directives'
import './css/iconfont.css'

const PcWattUI = {
  ...components
}

const install = (app, opts = {}) => {
  if (install.installed) return

  Object.keys(PcWattUI).forEach(key => {
    app.component(key, PcWattUI[key]);
  })

  // 加载指令
  Object.keys(directives).forEach(key => {
    app.directive(key, directives[key]);
  })
}

export default {
  install
}
