<template>
  <el-dialog :visible.sync="showFlag"
             width="30%">
    <el-form ref="cateForm"
             :model="form"
             label-width="80px">
      <el-form-item label="上级栏目">
        <el-input placeholder="案例日记"
                  disabled></el-input>
      </el-form-item>
      <el-form-item :rules="[
                      { required: true, message: '栏目名称不能为空', trigger: 'change' }
                    ]"
                    label="栏目名称"
                    prop="class_name">
        <el-input v-model="form.class_name"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer"
         class="dialog-footer">
      <el-button @click.native="showFlag = false">取消</el-button>
      <el-button type="primary"
                 @click.native="handleSubmit">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    channelId: {
      type: Number,
      required: true
    },
    // 是否是顶级栏目
    isTop: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showFlag: false,
      form: {
        class_name: '',
        channel_id: this.channelId,
        class_id: null,
        parent_id: null
      }
    }
  },
  methods: {
    show() {
      this.showFlag = true
      this.form = {
        class_name: '',
        channel_id: this.channelId,
        class_id: null,
        parent_id: null
      }
    },
    hide() {
      this.showFlag = false
    },
    handleSubmit() {
      this.$refs.cateForm.validate(valid => {
        if (valid) {
          this.form = this.isTop
            ? Object.assign(this.form, { parent_id: this.channelId })
            : this.form
          this.$emit('submit', this.form)
        }
      })
    }
  }
}
</script>

<style>
</style>
