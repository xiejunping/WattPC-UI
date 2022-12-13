// export * from './components'
import * as components from './components'

const PcWattUI = {
  ...components
}

const install = (app, opts = {}) => {
  if (install.installed) return

  console.log(PcWattUI, 'PcWattUI')
  Object.keys(PcWattUI).forEach(key => {
    console.log(key)
    app.component(key, PcWattUI[key]);
  })
}

export default {
  install
}
