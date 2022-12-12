<template>
  <div class="m-upload">
    <div class="m-upload-default">
      <slot v-if="1" name="uploadIcon"></slot>
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

    <input v-if="multiple" type="file" class="w-input" :accept="accept" multiple @change="onChange" />
    <input v-else type="file" class="w-input" :accept="accept" @change="onChange" />
  </div>
</template>
<script>
import axios from 'axios'
import Cookies from 'js-cookie'
import { defineComponent, toRefs } from 'vue'

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
    }
  },
  setup (props, { emit }) {
    const { busType, fileRules, multiple } = toRefs(props)
    console.log(busType, fileRules, multiple, 'multiple')
    const { width, height, maxSize, maxLength } = fileRules

    const readFile = () => {

    }
    const onAfterRead = (files, overSize) => {
      if (overSize) {
        msg = `请选择小于 ${fileSize(maxSize)} 的文件`
        return
      }

      if (multiple && maxLength < files.length) {
        msg = `请选择不超过 ${maxLength} 个文件`
        return
      }

      const uploadQueues = files.map(async (rawFile) => {
        const formData = new FormData()
        const { file, content } = rawFile
        const { key, token } = await axios.post('https://api.jsvue.cn/user-center/watt/getUploadToken', {
          businessType: busType,
          fileKey: file.name,
          deviceId: Cookies.get('CLIENT-ID')
        })
        console.log(key, token)
        formData.append('file', file)
        formData.append('key', key)
        formData.append('token', token)
        formData.append('x:type', busType)
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
      })
      onAfterRead(payload, overSize)
    }
    return {
      onChange
    }
  }
})
</script>
