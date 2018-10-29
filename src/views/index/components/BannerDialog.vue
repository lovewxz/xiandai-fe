<template>
  <el-dialog :visible.sync="dialogVisible"
             width="30%">
    <el-form label-width="80px">
      <el-form-item label="图片">
        <upload>
          <i class="el-icon-plus"></i>
        </upload>
      </el-form-item>
      <el-form-item label="链接地址"></el-form-item>
    </el-form>
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
      dialogVisible: true
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

<style>
</style>
