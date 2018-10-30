<template>
  <el-dialog :visible.sync="dialogVisible"
             width="35%">
    <el-form ref="postForm"
             :model="postForm"
             label-width="90px">
      <el-form-item :rules="[
                      { required: true, message: '请添加banner图', trigger: 'blur' }
                    ]"
                    label="图片:"
                    prop="pic">
        <upload :file-list="postForm.pic"
                list-type="picture-card"
                @success="handleSuccess">
          <i class="el-icon-plus"></i>
        </upload>
      </el-form-item>
      <el-form-item :rules="[
                      { required: true, message: '请填写链接地址', trigger: 'blur' }
                    ]"
                    label="链接地址:"
                    prop="link">
        <el-input v-model="postForm.link"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary"
                 @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Upload from '@/components/Upload'

const defaultForm = {
  pic: null,
  link: ''
}

export default {
  components: {
    Upload
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      postForm: Object.assign({}, defaultForm)
    }
  },
  watch: {
    data(newVal) {
      this.postForm = Object.assign({}, newVal)
    }
  },
  methods: {
    hide() {
      this.dialogVisible = false
    },
    show() {
      this.dialogVisible = true
    },
    handleSubmit() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.$emit('submit', this.postForm)
        }
      })
    },
    handleSuccess(file) {
      this.postForm.pic = file.key
    },
    resetFields() {
      this.$refs.postForm && this.$refs.postForm.resetFields()
    },
    reset() {
      this.postForm = Object.assign({}, defaultForm)
    }
  }
}
</script>

<style lang="scss">
.el-form-item {
  margin-bottom: 22px !important;
}
</style>
