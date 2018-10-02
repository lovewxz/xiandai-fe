<template>
  <div class="topchannel-wrapper">
    <div class="topchannel-nav">
      <el-button type="primary"
                 @click.stop="openDialog">添加栏目</el-button>
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
      <el-table-column label="栏目地址">
        <template slot-scope="scope">
          {{ scope.row.channel_url }}
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
               title="添加栏目"
               width="30%">
      <el-form ref="channelForm"
               :model="channelForm"
               :rules="rules"
               label-width="80px">
        <el-form-item prop="channel_id"
                      style="display: none;">
        </el-form-item>
        <el-form-item label="栏目名称"
                      prop="channel_name">
          <el-input v-model="channelForm.channel_name"></el-input>
        </el-form-item>
        <el-form-item label="栏目地址"
                      prop="channel_url">
          <el-input v-model="channelForm.channel_url"></el-input>
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
import { create, index, update, del } from '@/api/channel'

export default {
  data() {
    return {
      dialogVisible: false,
      channelForm: {
        channel_id: null,
        channel_name: '',
        channel_url: ''
      },
      tableData: [],
      rules: {
        channel_name: [
          { required: true, message: '请输入栏目名称', trigger: 'blur' }
        ],
        channel_url: [
          { required: true, message: '请输入栏目地址', trigger: 'blur' }
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
        this.$refs.channelForm.resetFields()
        this.channelForm = {
          channel_id: null,
          channel_name: '',
          channel_url: ''
        }
      })
    },
    handleSubmit() {
      this.btnLoading = true
      if (this.channelForm.channel_id) {
        this._validate(
          update(this.channelForm)
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
          create(this.channelForm)
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
      this.channelForm = row
      this.dialogVisible = true
    },
    handleDel(row) {
      this.$confirm(`是否删除${row.channel_name}?`, '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        del(row.channel_id).then(() => {
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
      this.$refs.channelForm.validate(valid => {
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
