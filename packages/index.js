export * from './components'
import * as components from './components'
import './css/iconfont.css'

const PcWattUI = {
  ...components
}

const install = (app, opts = {}) => {
  if (install.installed) return

  Object.keys(PcWattUI).forEach(key => {
    app.component(key, PcWattUI[key]);
  })
}

export default {
  install
}
