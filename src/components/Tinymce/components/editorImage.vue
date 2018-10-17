<template>
  <div class="upload-container">
    <el-button :style="{background:color,borderColor:color}"
               icon="el-icon-upload"
               size="mini"
               type="primary"
               @click=" dialogVisible=true">上传图片
    </el-button>
    <el-dialog :visible.sync="dialogVisible">
      <upload :multiple="true"
              :file-list="fileList"
              @success="handleSuccess"
              @remove="handleRemove">
        <el-button size="small"
                   type="primary">点击上传</el-button>
      </upload>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary"
                 @click="handleSubmit">确 定</el-button>
    </el-dialog>
  </div>
</template>

<script>
import Upload from '@/components/Upload'

export default {
  name: 'EditorSlideUpload',
  components: {
    Upload
  },
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {
      dialogVisible: false,
      listArr: [],
      fileList: []
    }
  },
  methods: {
    checkAllSuccess() {
      if (!this.listArr.length) {
        return false
      }
      return this.listArr.every(item => item.status === 'success')
    },
    handleSubmit() {
      if (!this.checkAllSuccess()) {
        this.$message(
          '请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！'
        )
        return
      }
      this.$emit('successCBK', this.listArr)
      this.listArr = []
      this.fileList = []
      this.dialogVisible = false
    },
    handleSuccess(response, file, filelist) {
      this.listArr = filelist
    },
    handleRemove(file) {
      this.fileList = this.listArr.filter(item => item.uid !== file.uid)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  /deep/ .el-upload--picture-card {
    width: 100%;
  }
}
</style>
