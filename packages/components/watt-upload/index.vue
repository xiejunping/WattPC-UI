<template>
  <div class="upload-image">
    <div class="c-wrap">
      <!-- 图片上传 -->
      <template v-if="mediaType === 'image'">
        <div v-for="(img,i) of modelValue" :key="i" class="m-views">
          <i class="iconfont icon-watt-close-circle-fill" @click="delIndex(i)"></i>
          <a-image :width="100" :src="privateBucket ? img.content : img.url" />
        </div>
      </template>
      <i-upload
        v-if="maxLength > modelValue.length"
        :media-type="mediaType"
        :bus-type="busType"
        :accept="accept"
        :file-rules="fileRules"
        :up-txt="upTxt"
        :multiple="multiple"
        :max-length="maxLength"
        :disabled="disabled"
        @upload="afterUpload"
        @error="afterError" />
      <!-- 文件上传 -->
      <template v-if="mediaType === 'file'">
        <div v-for="(f,i) of modelValue" :key="i" class="m-input">
          <i class="iconfont icon-watt-delete" @click="delIndex(i)"></i>
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
      <div v-else-if="rulesTxt" class="c-rules">
        <i class="iconfont icon-watt-warning-circle" />
        <span class="m-image-rule">{{rulesTxt}}</span>
      </div>
    </slot>

    <div v-if="msg" class="c-col-msg">
      <span>{{msg}}</span>
    </div>
  </div>
</template>
<script>
import { ref, defineComponent, toRefs, computed } from 'vue'
import IUpload from './upload.vue'

const fileSize = (size) => {
  if (typeof size !== 'number') return '0K'
  if (size > 1048576) size = (size / 1048576).toFixed(2) + 'M'
  else if (size > 1024) size = (size / 1024).toFixed(2) + 'K'
  return size
}

export default defineComponent({
  name: 'watt-upload',
  components: { IUpload },
  emits: ['update:modelValue'],
  props: {
    modelValue: {
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
    accept: {
      type: String
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
    multiple: {
      type: Boolean
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
    const { modelValue, privateBucket, upTxt, mediaType, fileRules, accept, multiple, maxLength, busType } = toRefs(props)
    const msg = ref('')
    const rulesTxt = computed(() => {
      let txt = []
      if (fileRules.value) {
        const { width, height, maxSize } = fileRules.value
        if (width && height) txt.push(`图片尺寸为 ${width}x${height}px`)
        else if (width) txt.push(`图片宽度为 ${width}px`)
        else if (height) txt.push(`图片高度为 ${height}px`)
        if (maxSize) txt.push(`图片大小为 ${fileSize(maxSize)}`)
      }
      return txt.join(',')
    })

    const afterUpload = (data) => {
      console.log(data)
      emit('update:modelValue', modelValue.value.concat(data))
    }
    const afterError = (msgTxt) => {
      msg.value = msgTxt
    }
    const delIndex = (index) => {
      modelValue.value.splice(index, 1)
      emit('update:modelValue', modelValue.value)
    }
    return {
      modelValue,
      privateBucket,
      msg,
      mediaType,
      fileRules,
      accept,
      multiple,
      maxLength,
      busType,
      upTxt: upTxt.value || (upTxt.value === undefined ? (mediaType.value === 'image'? '上传图片' : '上传文件') : ''),
      rulesTxt,
      afterUpload,
      afterError,
      delIndex
    }
  }
})
</script>
<style lang="less" scoped>

.upload-image {
  .c-wrap {
    // display: inline-flex;
    .m-views, .m-upload {
      margin-left: 8px;
      margin-bottom: 8px;
      &:first-child {
        margin-left: 0;
      }
    }
    .m-views {
      position: relative;
      display: inline-block;
      .icon-watt-close-circle-fill {
        color: #ff4d4f;
        position: absolute;
        z-index: 2;
        top: -2px;
        right: 2px;
        cursor: pointer;
        &:after {
          content: ' ';
          background-color: #fff;
          width: 40%;
          height: 40%;
          position: absolute;
          z-index: -1;
          transform: translate(-50%, -50%);
          top: 11px;
          right: 2px;
        }
      }
      :deep(.ant-image-img) {
        border-radius: 3px;
        width: 100px;
        height: 100px;
        object-fit: cover;
      }
    }
    .m-input {
      &:hover {
        background-color: #f5f5f5;
      }
      &:first-child {
        margin-top: 0;
      }
      .icon-watt-delete {
        float: right;
        color: #ff4d4f;
        cursor: pointer;
      }
    }
  }

  .c-message, .c-rules {
    color: #666;
    font-size: 14px;
    .icon-watt-warning-circle {
      margin: 0 5px;
    }
  }
  .c-col-msg {
    font-size: 14px;
    color: #ff4d4f;
  }
}
</style>
