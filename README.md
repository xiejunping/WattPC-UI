# watt-pc-ui

Watt-framework 
#### 介绍
瓦特（WATT）开发自用UI库，PC端内的UI组件库，只为PC端适配，尽少控制包体大小，能快速适用于watt内部产品的使用。



#### 使用说明

全局引入方式，与其他的包一样进行引用

```js
import WattPCUI from 'wattpc-ui'
import 'wattpc-ui/dist/style.css'
Vue.use(WattPCUI)
```

#### 按需引入
在vue3 中使用

```js
<script setup>
import { WattUpload } from 'wattpc-ui'

</script>
```
