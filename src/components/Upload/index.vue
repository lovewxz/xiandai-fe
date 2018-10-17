<template>
  <el-upload ref="upload"
             :on-success="handleSuccess"
             :on-remove="handleRemove"
             :before-upload="beforeUpload"
             :data="imgData"
             :file-list="fileList"
             :multiple="multiple"
             action="//up-z2.qiniu.com/"
             list-type="picture-card"
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
    }
  },
  data() {
    return {
      imgData: {}
    }
  },
  methods: {
    handleSuccess(response, file, fileList) {
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
