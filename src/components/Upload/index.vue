<template>
  <el-upload ref="upload"
             :on-success="handleSuccess"
             :on-remove="handleRemove"
             :before-upload="beforeUpload"
             :data="imgData"
             :file-list="picList"
             :multiple="multiple"
             :list-type="listType"
             action="//up-z2.qiniu.com/"
             class="upload">
    <slot></slot>
  </el-upload>
</template>
<script>
import { getUploadToken } from '@/api/upload'
import randomToken from 'random-token'
import config from '@/config'

export default {
  name: 'CustomUpload',
  props: {
    fileList: {
      type: null,
      default: () => {
        return []
      }
    },
    multiple: {
      type: Boolean,
      default: false
    },
    listType: {
      type: String,
      default: 'picture'
    }
  },
  data() {
    return {
      imgData: {},
      picList: []
    }
  },
  watch: {
    fileList: {
      deep: true,
      handler(newVal) {
        newVal = Array.isArray(newVal) ? newVal : [newVal]
        this.picList = newVal.map(item => {
          return {
            url: `${config.qiniuURL}/${item}`,
            name: item
          }
        })
      }
    }
  },
  methods: {
    handleSuccess(response, file, fileList) {
      if (!this.multiple) {
        if (fileList.length > 1) {
          fileList.shift()
        }
      }
      this.$emit('success', response, file, fileList)
    },
    handleRemove(file, fileList) {
      this.$emit('remove', file, fileList)
    },
    async beforeUpload(file) {
      const key = randomToken(32)
      const {
        data: { upToken }
      } = await getUploadToken()
      if (upToken) {
        this.imgData = {
          key,
          token: upToken
        }
      }
    },
    clearFiles() {
      this.$refs.upload.clearFiles()
    }
  }
}
</script>

<style lang="scss">
</style>
