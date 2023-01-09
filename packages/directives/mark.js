import WaterMark from './waterMark'

export default {
  mounted (el, binding) {
    const { value } = binding

    /*
      modifiers, // 修饰符
      arg // 参数event  v-peach:event
    */

    const waterMark = new WaterMark({ aplha: 0.36, color: '#1890ff', height: 200 })
    const $el = waterMark.creatElementItem(value)

    const markParentElem = document.createElement('div')
    // 设置样式
    markParentElem.id = 'watt-water'
    markParentElem.style.position = 'fixed'
    markParentElem.style.top = '120px'
    markParentElem.style.left = '120px'
    markParentElem.style.zIndex = 100
    markParentElem.style.pointerEvents = 'none'
    markParentElem.appendChild($el)
    el.appendChild(markParentElem)
  }
}
