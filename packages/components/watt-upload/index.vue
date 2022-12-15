<template>
  <div class="upload-image">
    <div class="c-wrap">
      <upload v-if="maxLength > 1" class="c-init" action="" :before-upload="preUpload">
        <div class="min-column">
          <i class="icon-font add"></i>
          <span>{{upTxt}}</span>
          <span v-if="rules" class="m-image-rule">{{rules}}</span>
        </div>
      </upload>
      <i-upload
        v-else
        :media-type="mediaType"
        :bus-type="busType"
        :up-txt="upTxt">

      </i-upload>

      <template v-if="file.type === 'image'">


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
import IUpload from './upload.vue'
export default defineComponent({
  name: 'watt-upload',
  components: { IUpload },
  props: {
    value: {
      type: Array,
      default: () => ([])
    },
    busType: {
      type: Number,
    },
    mediaType: {
      type: String,
      default: 'file'
    },
    upTxt: {
      type: String
    },
    fileRules: {
      type: Object,
      default: () => ({})
    },
    maxLength: {
      type: Number,
      default: 1
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
      upTxt: upTxt.value || (upTxt.value === undefined ? (mediaType.value === 'image'? '上传图片' : '上传文件') : ''),
    }
  }
})
</script>
