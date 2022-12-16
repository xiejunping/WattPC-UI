<template>
  <div class="m-upload">
    <div v-if="loading" class="m-upload-loading" :class="{'itemimage': mediaType === 'image', 'itemfile': mediaType === 'file'}">
      <i class="iconfont icon-watt-loading" />
      <span>上传中</span>
    </div>
    <div class="m-upload-default" :class="{'m-upload-disabled': disabled, 'm-upload-error': erropStat}" @click="handleClick">
      <slot name="uploadIcon">
        <div v-if="mediaType === 'file'" class="m-upload-itemfile">
          <slot name="icon">
            <i class="iconfont icon-watt-upload" />
          </slot>
          <span v-if="upTxt">{{upTxt}}</span>
        </div>
        <div v-else-if="mediaType === 'image'" class="m-upload-itemimage">
          <slot name="icon">
            <i class="iconfont icon-watt-plus" />
          </slot>
          <span v-if="upTxt">{{upTxt}}</span>
        </div>
      </slot>
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
  emits: ['upload', 'error'],
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
    const loading = ref(false)
    const erropStat = ref(false)
    const { busType, mediaType, accept, upTxt, fileRules, multiple, maxLength, disabled } = toRefs(props)
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
      if (multiple.value && maxLength.value < files.length) {
        erropStat.value = true
        emit('error', `请选择不超过 ${maxLength.value} 个文件`)
        uploaded()
        return
      }
      const someNotSize = files.some(file => file.file.size > maxSize)
      const someNotWidth = files.some(file => file.width !== width)
      const someNotHeight = files.some(file => file.height !== height)
      if (maxSize && someNotSize) {
        erropStat.value = true
        emit('error', `请选择小于 ${fileSize(maxSize)} 的文件`)
        uploaded()
        return
      }
      if ((width && someNotWidth) || (height && someNotHeight)) {
        erropStat.value = true
        emit('error', `请选择尺寸为 ${width} x ${height} 图片`)
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
      loading.value = true
      Promise.all(uploadQueues)
        .then((data) => {
          console.log(data)
          loading.value = false
          emit('upload', data)
          uploaded()
        })
        .catch((err) => {
          console.log(err)
          loading.value = false
          uploaded()
        })
    }
    const handleClick = () => {
      if (disabled.value) return
      input.value.click()
      erropStat.value = false
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
      loading,
      input,
      erropStat,
      mediaType,
      accept,
      upTxt: upTxt.value || (upTxt.value === undefined ? (mediaType.value === 'image'? '上传图片' : '上传文件') : ''),
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
  position: relative;
  .m-upload-loading {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    border: 1px solid #d9d9d9;
    border-radius: 3px;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: 12px;
      color: #40a9ff;
    }
    &.itemimage {
      flex-direction: column;
      width: 100px;
      height: 100px;
      i {
        font-size: 18px;
      }
    }
    &.itemfile {
      span {
        padding-left: 8px;
      }
    }
  }
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
    &.m-upload-error {
      .m-upload-itemfile, .m-upload-itemimage  {
        border-color: #ff4501;
        color: #ff4501;
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
        font-size: 22px;
        line-height: 20px;
      }
    }


  }
  .w-input {
    visibility: hidden;
    position: absolute;
  }
}
.iconfont.icon-watt-loading {
  animation: allrotate 1.2s linear infinite;
  -webkit-animation: allrotate 1.2s linear infinite;
  display: inline-block;
}
@keyframes allrotate {
  100% {
    transform: rotate(360deg);
  }
}
</style>
