<template>
  <div class="upload-image">
    <div class="c-wrap">
      <!-- 图片上传 -->
      <template v-if="file.type === 'image'">
        <a-image :width="80" src="" fallback=""></a-image>
      </template>
      <i-upload
        v-if="maxLength > value.length"
        :media-type="mediaType"
        :bus-type="busType"
        :accept="accept"
        :file-rules="fileRules"
        :up-txt="upTxt"
        :multiple="multiple"
        :max-length="maxLength"
        :disabled="disabled" />

      <!-- 文件上传 -->
      <template v-if="file.type === 'file'">
        <div>
          <i class="iconfont icon-watt-delete"></i>
          <i class="iconfont icon-watt-attachment"></i>
          <span></span>
        </div>
      </template>
    </div>
    <slot name="tip">
      <div v-if="tipTxt" class="c-message">
        <i class="iconfont icon-watt-warning-circle" />
        <span class="c-info">{{tipTxt}}</span>
      </div>
      <div v-else-if="rules" class="">
        <span class="m-image-rule">{{rules}}</span>
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
    },
    tipTxt: {
      type: String
    },
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
