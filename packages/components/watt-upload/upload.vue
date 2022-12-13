<template>
  <div class="m-upload">
    <div class="m-upload-default" :class="{'m-upload-disabled': disabled}" @click="handleClick">
      <slot v-if="0" name="uploadIcon"></slot>
      <div v-else-if="mediaType === 'file'" class="m-upload-itemfile">
        <slot v-if="0" name="icon"></slot>
        <i v-else class="iconfont icon-watt-upload"></i>
        <span v-if="upTxt">{{upTxt}}</span>
      </div>
      <div v-else-if="mediaType === 'image'" class="m-upload-itemimage">
        <slot v-if="0" name="icon"></slot>
        <i v-else class="iconfont icon-watt-plus"></i>
        <span v-if="upTxt">{{upTxt}}</span>
      </div>

      <slot v-if="0" name="tip"></slot>
      <div v-else-if="tipTxt" class="c-message">
        <i class="iconfont icon-watt-warning-circle"></i>
        <span class="c-info">{{tipTxt}}</span>
      </div>
      <div v-if="msg" class="c-col-msg">
        <span>{{msg}}</span>
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

const base64ToBlob = function(code) {
  const [fileType, rawFile] = code.split(';base64,')
  const contentType = fileType.split(':')[1]
  const raw = window.atob(rawFile)

  let uInt8Array = new Uint8Array(raw.length)
  for (let i = 0; i < raw.length; i++) {
      uInt8Array[i] = raw.charCodeAt(i)
  }
  return new Blob([uInt8Array, { type: contentType }])
}

export default defineComponent({
  name: 'i-upload',
  emits: ['upload'],
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
    maxLength: {
      type: Number,
      default: 1
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
    disabled: {
      type: Boolean
    }
  },
  setup (props, { emit }) {
    const input = ref(null)
    const msg = ref('')
    const { busType, mediaType, accept, upTxt, tipTxt, fileRules, multiple, maxLength, disabled } = toRefs(props)
    const { width, height, maxSize } = fileRules.value

    const uploaded = () => {
      input.value.value = ''
    }
    const readFile = (file) => {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = (event) => {
          const img = new Image()
          img.onload = () => {
            resolve({
              base64: event.target.result,
              w: img.width,
              h: img.height
            })
          }
          img.src = event.target.result
        }
        reader.readAsDataURL(file)
      })
    }
    const onAfterRead = (files) => {
      console.log(files, 'filse')
      if (multiple.value && maxLength.value < files.length) {
        msg.value = `请选择不超过 ${maxLength.value} 个文件`
        uploaded()
        return
      }
      const someNotSize = files.some(file => file.file.size > maxSize)
      const someNotWidth = files.some(file => file.width !== width)
      const someNotHeight = files.some(file => file.height !== height)
      if (maxSize && someNotSize) {
        msg.value = `请选择小于 ${fileSize(maxSize)} 的文件`
        uploaded()
        return
      }
      if ((width && someNotWidth) || (height && someNotHeight)) {
        msg.value = `请选择尺寸为 ${width} x ${height} 图片`
        uploaded()
        return
      }
      const uploadQueues = files.map(async (rawFile) => {
        const formData = new FormData()
        const { file, content, width, height } = rawFile
        const { data, status } = await axios.post('https://api.jsvue.cn/user-center/watt/preUploadToken', {
          businessType: busType.value,
          fileKey: file.name,
          deviceId: Cookies.get('CLIENT-ID')
        }, {
          withCredentials: true,
          headers: { 'X-XSRF-TOKEN': 'x-basement-token' }
        })
        if (status !== 200 || data.code !== 0) return
        const { data: { key, token }} = data || {data: {}}
        formData.append('file', file)
        formData.append('key', key)
        formData.append('token', token)
        formData.append('x:type', busType.value)
        formData.append('x:deviceId', Cookies.get('CLIENT-ID'))
        formData.append('x:uid', Cookies.get('OP_ID'))
        return await axios.post('https://upload-z2.qiniup.com/', formData, { headers: 'multipart/form-data' })
          .then(() => {
            rawFile.name = file.name
            rawFile.size = file.size
            rawFile.type = file.type
            rawFile.width = width
            rawFile.height = height
            rawFile.url = `https://static.jsvue.cn/${key}`
            rawFile.content = URL.createObjectURL(base64ToBlob(content))
            return rawFile
          })
      })
      // todo 上传中
      Promise.all(uploadQueues)
        .then((data) => {
          console.log(data)
          // todo 上传结束
          emit('upload', data)
          uploaded()
        })
        .catch((err) => {
          console.log(err)
          uploaded()
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
        const payload = contents.map((file, index) => {
          return {
            file: files[index],
            width: file.w,
            height: file.h,
            content: file.base64
          }
        })
        onAfterRead(payload)
      })
    }
    return {
      input,
      msg,
      mediaType,
      accept,
      upTxt: upTxt.value || (upTxt.value === undefined ? (mediaType.value === 'image'? '上传图片' : '上传文件') : ''),
      tipTxt,
      multiple,
      onChange,
      handleClick
    }
  }
})
</script>
<style lang="less">

.m-upload {
  display: inline-block;
  .m-upload-default {
    position: relative;

    .m-upload-itemfile, .m-upload-itemimage {
      box-shadow: 0 2px #00000004;
      border: 1px solid #d9d9d9;
      color: #666;
      font-size: 14px;
      padding: 4px 8px;
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
        background-color: #f5f5f5;
        &:hover {
          border-color: #d9d9d9;
          color: #666;
        }
      }
    }
    .m-upload-itemfile {
      line-height: 22px;
      text-align: center;
      i.iconfont {
        font-size: 16px;
        margin-right: 8px;
      }
    }

    .m-upload-itemimage {
      border-style: dashed;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      width: 100px;
      height: 100px;
      background-color: #f8f8f8;
      i.iconfont {
        font-size: 16px;
        line-height: 20px;
      }
    }


  }
  .w-input {
    visibility: hidden;
  }
}
</style>
