<template>
  <el-dialog :visible.sync="showFlag"
             width="35%">
    <el-form ref="cateForm"
             :model="form"
             label-width="80px">
      <template v-if="!isEdit">
        <el-form-item label="上级栏目">
          <el-input :placeholder="parentName"
                    disabled></el-input>
        </el-form-item>
      </template>
      <template v-else>
        <el-form-item label="所在栏目">
          <slot name="cascader"></slot>
        </el-form-item>
      </template>
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
    parentName: {
      type: String,
      default: ''
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    formItem: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      showFlag: false,
      form: {
        class_name: '',
        class_id: null,
        parent_id: null
      }
    }
  },
  watch: {
    formItem: {
      deep: true,
      handler(newVal) {
        this.form = Object.assign(this.form, newVal)
      }
    }
  },
  methods: {
    show() {
      this.showFlag = true
    },
    hide() {
      this.showFlag = false
    },
    resetFields() {
      this.$refs.cateForm && this.$refs.cateForm.resetFields()
    },
    reset() {
      this.form = {
        class_name: '',
        class_id: null,
        parent_id: null
      }
    },
    handleSubmit() {
      this.$refs.cateForm.validate(valid => {
        if (valid) {
          this.$emit('submit', this.form)
        }
      })
    }
  }
}
</script>

<style>
</style>
