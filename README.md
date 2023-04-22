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
在vue3 中使用, 可以在.vue的页面组件或组件中使用

```js
<script setup>
import { WattUpload } from 'wattpc-ui'

</script>
```

在vue3 中api components 方式

```vue
<template>
    <div>
        <watt-upload 
            v-model="bannerFile" 
            :bus-type="6" 
            :max-length="1" 
            :file-rules="{ width: 1280, height: 400 }" 
            media-type="image" 
            accept="image/*" />
    </div>
</template>
<script>
import { ref } from 'vue'
import { WattUpload } from 'wattpc-ui'

export default {
    components: { WattUpload }
    setup() {
        const bannerFile = ref([])
        return {
            bannerFile
        }
    }
}
</script>
```

### 优化

iconfont 字体用自已的cdn（阿里不让用），减小包的体积

//static.jsvue.cn//common/css/font_3824242_44szmkjzzcn.css
