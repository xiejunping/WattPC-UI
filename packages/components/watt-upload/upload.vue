<template>
  <div class="m-upload">
    <div class="m-upload-default" :class="{'m-upload-disabled': disabled}" @click="handleClick">
      <slot v-if="0" name="uploadIcon"></slot>
      <div v-else-if="mediaType === 'file'" class="m-upload-itemfile">
        <slot v-if="1" name="icon"></slot>
        <i v-else class=""></i>
        <span>{{upTxt}}</span>
      </div>
      <div v-else-if="mediaType === 'image'" class="m-upload-itemimage">
        <slot v-if="1" name="icon"></slot>
        <i v-else class=""></i>
        <span>{{upTxt}}</span>
      </div>
    </div>

    <input v-if="multiple" ref="input" type="file" class="w-input" :accept="accept" multiple @change="onChange" />
    <input v-else ref="input" type="file" class="w-input" :accept="accept" @change="onChange" />
  </div>
</template>
<script>
import axios from 'axios'
import Cookies from 'js-cookie'
import { defineComponent, ref, toRefs } from 'vue'

const fileSize = (size) => {
  if (typeof size !== 'number') return '0K'
  if (size > 1048576) size = (size / 1048576).toFixed(2) + 'M'
  else if (size > 1024) size = (size / 1024).toFixed(2) + 'K'
  return size
}

export default defineComponent({
  name: 'upload',
  props: {
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
    multiple: {
      type: Boolean
    },
    upTxt: {
      type: String
    },
    fileRules: {
      type: Object,
      default: () => ({})
    },
    disabled: {
      type: Boolean
    }
  },
  setup (props, { emit }) {
    const input = ref(null)
    const { busType, mediaType, accept, upTxt, fileRules, multiple, disabled } = toRefs(props)
    console.log( fileRules, mediaType.value, 'multiple')
    const { width, height, maxSize, maxLength } = fileRules.value

    const readFile = () => {

    }
    const onAfterRead = (files, overSize) => {
      if (overSize) {
        msg = `请选择小于 ${fileSize(maxSize)} 的文件`
        return
      }

      if (multiple.value && maxLength < files.length) {
        msg = `请选择不超过 ${maxLength} 个文件`
        return
      }

      const uploadQueues = files.map(async (rawFile) => {
        const formData = new FormData()
        const { file, content } = rawFile
        const { key, token } = await axios.post('https://api.jsvue.cn/user-center/watt/getUploadToken', {
          businessType: busType.value,
          fileKey: file.name,
          deviceId: Cookies.get('CLIENT-ID')
        })
        console.log(key, token)
        formData.append('file', file)
        formData.append('key', key)
        formData.append('token', token)
        formData.append('x:type', busType.value)
        formData.append('x:uid', Cookies.get('OP_ID'))
        const res = await axios.post('https://upload-z2.qiniup.com/', formData, { headers: 'multipart/form-data' }).then(() => {
          return rawFile
        })
        return res
      })

      Promise.all(uploadQueues)
        .then((data) => {

        })
        .catch((err) => {

        })
    }

    const handleClick = () => {
      if (disabled.value) return
      input.value.click()
    }

    const onChange = (event) => {
      let { files } = event.target
      if (!files || !files.length) return

      files = [].slice.call(files, 0)
      Promise.all(files.map(readFile)).then((contents) => {
        let overSize = false
        const payload = files.map((file, index) => {
          if (maxSize && file.size > maxSize) overSize = true
          return {
            file: files[index],
            content: contents[index]
          }
        })
        onAfterRead(payload, overSize)
      })
    }
    return {
      input,
      mediaType,
      accept,
      upTxt: upTxt.value || (mediaType.value === 'image'? '上传图片' : '上传文件'),
      onChange,
      handleClick
    }
  }
})
</script>
<style lang="less" scoped>

.m-upload {
  display: inline-block;
  .m-upload-default {
    position: relative;

    .m-upload-itemfile, .m-upload-itemimage {
      box-shadow: 0 2px #00000004;
      border: 1px solid #d9d9d9;
      color: #666;
      font-size: 14px;
      padding: 4px 15px;
      border-radius: 3px;
      background-color: #fff;
      cursor: pointer;
      &:hover {
        border-color: #40a9ff;
        color: #40a9ff;
      }
    }
    &.m-upload-disabled {
      .m-upload-itemfile, .m-upload-itemimage {
        cursor: not-allowed;
      }
    }
    .m-upload-itemfile {
      line-height: 22px;
      text-align: center;
    }

    .m-upload-itemimage {
      border-style: dashed;
      display: flex;
      justify-content: center;
      align-content: center;
      width: 80px;
      height: 80px;
    }


  }
  .w-input {
    visibility: hidden;
  }
}
</style>
