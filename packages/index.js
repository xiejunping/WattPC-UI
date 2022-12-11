import * as components from './components'

const PcWattUI = {
  ...components
}

const install = (Vue, opts = {}) => {
  // if (install.installed) return

  Object.keys(PcWattUI).forEach(key => {
    Vue.component(key.name, PcWattUI[key]);
  })
}

export default {
  install
}

export * from './components'
