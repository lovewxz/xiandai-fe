<template>
  <el-dialog :visible.sync="dialogVisible"
             width="30%">
    <el-form label-width="80px">
      <el-form-item label="图片:">
        <upload list-type="picture-card">
          <i class="el-icon-plus"></i>
        </upload>
      </el-form-item>
      <el-form-item label="链接地址:">
        <el-input></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary"
                 @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Upload from '@/components/Upload'

export default {
  components: {
    Upload
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    hide() {
      this.dialogVisible = false
    },
    show() {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss">
.el-form-item {
  margin-bottom: 22px !important;
}
</style>
