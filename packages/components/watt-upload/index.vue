<template>
  <div class="upload-image">
    <div class="c-wrap">
      <!-- 图片上传 -->
      <template v-if="mediaType === 'image'">
        <a-image
          v-for="(img,i) of value"
          :key="i"
          :width="100"
          :src="privateBucket ? img.content : img.url" />
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
        :disabled="disabled"
        @upload="afterUpload" />
      <!-- 文件上传 -->
      <template v-if="mediaType === 'file'">
        <div v-for="(f,i) of value" :key="i" class="">
          <i class="iconfont icon-watt-delete"></i>
          <i class="iconfont icon-watt-attachment"></i>
          <span>{{f.name}}</span>
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
import { ref, defineComponent, toRefs } from 'vue'
import IUpload from './upload.vue'
export default defineComponent({
  name: 'watt-upload',
  components: { IUpload },
  emits: ['input'],
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
    tipTxt: {
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
    privateBucket: {
      type: Boolean
    }
  },
  setup (props, {emit}) {
    const { privateBucket, upTxt, mediaType } = toRefs(props)
    const msg = ref('')

    const afterUpload = (data) => {
      console.log(data)
      emit('input', data)
    }
    return {
      privateBucket,
      msg,
      mediaType,
      upTxt: upTxt.value || (upTxt.value === undefined ? (mediaType.value === 'image'? '上传图片' : '上传文件') : ''),
      afterUpload
    }
  }
})
</script>
<style lang="less" scoped>

.upload-image {
  .c-wrap {
    .ant-image {
      display: inline-block;
      margin-left: 8px;
      vertical-align: top;
      &:first-child {
        margin-left: 0;
      }
    }
  }
}
</style>
