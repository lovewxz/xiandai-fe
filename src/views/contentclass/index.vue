<template>
  <div class="topchannel-wrapper">
    <div class="topchannel-nav">
      <el-button type="primary"
                 @click.stop="openDialog">添加分类</el-button>
    </div>
    <el-table :data="tableData"
              border
              style="width: 100%">
      <el-table-column label="栏目ID">
        <template slot-scope="scope">
          {{ scope.row.channel_id }}
        </template>>
      </el-table-column>
      <el-table-column label="栏目名称">
        <template slot-scope="scope">
          {{ scope.row.channel_name }}
        </template>>
      </el-table-column>
      <el-table-column label="分类ID">
        <template slot-scope="scope">
          {{ scope.row.class_id }}
        </template>>
      </el-table-column>
      <el-table-column label="分类名称">
        <template slot-scope="scope">
          {{ scope.row.class_name }}
        </template>>
      </el-table-column>
      <el-table-column label="上级分类ID">
        <template slot-scope="scope">
          {{ scope.row.parent_id }}
        </template>>
      </el-table-column>
      <el-table-column label="上级分类名称">
        <template slot-scope="scope">
          {{ scope.row.parent_name }}
        </template>>
      </el-table-column>
      <el-table-column label="操作"
                       align="center">
        <template slot-scope="scope">
          <el-button size="small"
                     type="primary"
                     @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="small"
                     type="danger"
                     @click="handleDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible"
               title="添加分类"
               width="30%">
      <el-form ref="classForm"
               :model="classForm"
               :rules="rules"
               label-width="80px">
        <el-form-item prop="class_id"
                      style="display: none;">
        </el-form-item>
        <el-form-item label="分类名称"
                      prop="class_name">
          <el-input v-model="classForm.class_name"></el-input>
        </el-form-item>
        <el-form-item label="所属栏目"
                      prop="channel_id">
          <el-select v-model="classForm.channel_id" placeholder="请选择">
            <el-option
              v-for="item in channelId"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上级分类"
                      prop="parent_id">
          <el-select v-model="classForm.parent_id" placeholder="请选择">
            <el-option
              v-for="item in classId"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button :loading="btnLoading"
                   type="primary"
                   @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { create, index, update, del } from '@/api/contentClass'

export default {
  data() {
    return {
      dialogVisible: false,
      classForm: {
        class_id: null,
        channel_id: null,
        channel_name: '',
        parent_id: null
      },
      channelId: [{
        value: 0,
        label: '测试'
      }],
      classId: [{
        value: 0,
        label: '测试'
      }],
      tableData: [],
      rules: {
        class_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ],
        channel_id: [
          { required: true, message: '请选择所属栏目', trigger: 'blur' }
        ],
        parent_id: [
          { required: true, message: '请选择上级分类', trigger: 'blur' }
        ]
      },
      btnLoading: false
    }
  },
  mounted() {
    this.getIndex()
  },
  methods: {
    openDialog() {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.classForm.resetFields()
        this.classForm = {
          class_id: null,
          class_name: '',
          channel_id: null,
          parent_id: null
        }
      })
    },
    handleSubmit() {
      this.btnLoading = true
      if (this.classForm.class_id) {
        this._validate(
          update(this.classForm)
            .then(() => {
              this.dialogVisible = false
              this.btnLoading = false
              this.getIndex()
            })
            .catch(() => {
              this.btnLoading = false
            })
        )
      } else {
        this._validate(
          create(this.classForm)
            .then(() => {
              this.dialogVisible = false
              this.btnLoading = false
              this.getIndex()
            })
            .catch(() => {
              this.btnLoading = false
            })
        )
      }
    },
    handleEdit(row) {
      this.classForm = row
      this.dialogVisible = true
    },
    handleDel(row) {
      this.$confirm(`是否删除${row.class_name}?`, '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        del(row.class_id).then(() => {
          this.getIndex()
        })
      })
    },
    getIndex() {
      index().then(res => {
        this.tableData = res.data
      })
    },
    _validate(cb) {
      this.$refs.classForm.validate(valid => {
        if (valid) {
          cb()
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
.topchannel-wrapper {
  padding: 30px;
  .topchannel-nav {
    margin-bottom: 30px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
