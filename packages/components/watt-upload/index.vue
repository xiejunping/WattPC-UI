<template>
  <div class="upload-image">
    <div class="">
      <i class="icon-font loading" />
      <span>上传中</span>
    </div>
    <div class="c-wrap">
      <template v-if="file.type === 'image'">
        <upload v-if="file.url" class="c-complete" action="" :before-upload="preUpload">

        </upload>
        <upload v-else class="c-init" action="" :before-upload="preUpload">
          <div class="min-column">
            <i class="icon-font add"></i>
            <span>{{upTxt}}</span>
            <span v-if="rules" class="m-image-rule">{{rules}}</span>
          </div>
        </upload>
      </template>
      <template v-if="file.type === 'file'">
      </template>
    </div>
      <slot name="tip">
        <div v-if="tipTxt" class="c-message">
          <i class="iconfont icon-watt-warning-circle" />
          <span class="c-info">{{tipTxt}}</span>
        </div>
      </slot>

      <div v-if="msg" class="c-col-msg">
        <span>{{msg}}</span>
      </div>
  </div>
</template>
<script>
import { ref, defineComponent } from 'vue'
export default defineComponent({
  name: 'watt-upload',
  props: {
    value: {
      type: Array,
      default: () => ([])
    },
    mediaType: {
      type: String,
      default: 'image'
    },
    fileRules: {
      type: Object,
      default: () => ({})
    },
    verify: {
      type: Boolean
    },
    disabledInfo: {
      type: Boolean
    },
    upTxt: {
      type: String,
      default: '上传图片'
    }
  },
  setup (props, {emit}) {
    console.log(ref)
    const msg = ref('')
    return {
      msg,
    }
  }
})
</script>
