<template>
  <el-upload ref="upload"
             :on-success="handleSuccess"
             :on-remove="handleRemove"
             :before-upload="beforeUpload"
             :data="imgData"
             :file-list="fileList"
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

export default {
  name: 'CustomUpload',
  props: {
    fileList: {
      type: Array,
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
      imgData: {}
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
