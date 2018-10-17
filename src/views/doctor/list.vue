<template>
  <div class="topchannel-wrapper">
    <div class="topchannel-nav">
      <el-button type="primary"
                 @click.stop="openDialog">添加医生</el-button>
    </div>
    <el-table :data="tableData"
              border
              style="width: 100%">
      <el-table-column label="医生ID">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>>
      </el-table-column>
      <el-table-column label="医生名称">
        <template slot-scope="scope">
          {{ scope.row.doctor_name }}
        </template>>
      </el-table-column>
      <el-table-column label="擅长项目">
        <template slot-scope="scope">
          {{ scope.row.goods_project }}
        </template>>
      </el-table-column>
      <el-table-column label="预约次数">
        <template slot-scope="scope">
          {{ scope.row.appointment_count }}
        </template>>
      </el-table-column>
      <el-table-column label="点赞数">
        <template slot-scope="scope">
          {{ scope.row.up_hits }}
        </template>>
      </el-table-column>
      <el-table-column label="图片地址">
        <template slot-scope="scope">
          {{ scope.row.img_url }}
        </template>>
      </el-table-column>
      <el-table-column label="栏目名称">
        <template slot-scope="scope">
          {{ scope.row.channel_name }}
        </template>>
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>>
      </el-table-column>
      <el-table-column label="简介">
        <template slot-scope="scope">
          {{ scope.row.introduction }}
        </template>>
      </el-table-column>
      <el-table-column label="内容">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>>
      </el-table-column>
      <el-table-column label="点击数">
        <template slot-scope="scope">
          {{ scope.row.hits }}
        </template>>
      </el-table-column>
      <el-table-column label="搜索词">
        <template slot-scope="scope">
          {{ scope.row.search_text }}
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
               title="添加医生"
               width="30%">
      <el-form ref="classForm"
               :model="classForm"
               :rules="rules"
               label-width="80px">
        <el-form-item prop="id"
                      style="display: none;">
        </el-form-item>
        <el-form-item label="医生名称"
                      prop="doctor_name">
          <el-input v-model="classForm.doctor_name"></el-input>
        </el-form-item>
        <el-form-item label="所属栏目"
                      prop="channel_id">
          <el-select v-model="classForm.channel_id"
                     placeholder="请选择">
            <el-option v-for="item in channelId"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属类别"
                      prop="type_id">
          <el-select v-model="classForm.type_id"
                     placeholder="请选择">
            <el-option v-for="item in channelId"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="擅长项目"
                      prop="goods_project">
          <el-input v-model="classForm.goods_project"></el-input>
        </el-form-item>
        <el-form-item label="预约次数"
                      prop="appointment_count">
          <el-input v-model="classForm.appointment_count"></el-input>
        </el-form-item>
        <el-form-item label="点赞次数"
                      prop="up_hits">
          <el-input v-model="classForm.up_hits"></el-input>
        </el-form-item>
        <el-form-item label="头像地址"
                      prop="img_url">
          <el-input v-model="classForm.img_url"></el-input>
        </el-form-item>
        <el-form-item label="标题"
                      prop="title">
          <el-input v-model="classForm.title"></el-input>
        </el-form-item>
        <el-form-item label="副标题"
                      prop="sub_title">
          <el-input v-model="classForm.sub_title"></el-input>
        </el-form-item>
        <el-form-item label="简介"
                      prop="introduction">
          <el-input v-model="classForm.introduction"></el-input>
        </el-form-item>
        <el-form-item label="内容"
                      prop="content">
          <el-input v-model="classForm.content"></el-input>
        </el-form-item>
        <el-form-item label="点击数"
                      prop="hits">
          <el-input v-model="classForm.hits"></el-input>
        </el-form-item>
        <el-form-item label="搜索词"
                      prop="search_text">
          <el-input v-model="classForm.search_text"></el-input>
        </el-form-item>
        <el-form-item label="状态"
                      prop="status">
          <el-select v-model="classForm.status"
                     placeholder="请选择">
            <el-option v-for="item in channelId"
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
import { create, index, update, del } from '@/api/doctor'

export default {
  data() {
    return {
      dialogVisible: false,
      classForm: {
        id: null,
        content_id: null,
        doctor_name: '',
        channel_id: null,
        type_id: null,
        goods_project: '',
        appointment_count: '',
        up_hits: '',
        img_url: '',
        title: '',
        sub_title: '',
        introduction: '',
        content: '',
        hits: '',
        search_text: '',
        status: null
      },
      channelId: [
        {
          value: 0,
          label: '测试'
        }
      ],
      classId: [
        {
          value: 0,
          label: '测试'
        }
      ],
      tableData: [],
      rules: {
        doctor_name: [
          { required: true, message: '请输入医生名称', trigger: 'blur' }
        ],
        channel_id: [
          { required: true, message: '请选择所属栏目', trigger: 'blur' }
        ],
        type_id: [{ required: true, message: '请选择分类', trigger: 'blur' }]
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
          id: null,
          content_id: null,
          doctor_name: '',
          channel_id: null,
          type_id: null,
          goods_project: '',
          appointment_count: '',
          up_hits: '',
          img_url: '',
          title: '',
          sub_title: '',
          introduction: '',
          content: '',
          hits: '',
          search_text: '',
          status: null
        }
      })
    },
    handleSubmit() {
      this.btnLoading = true
      if (this.classForm.id) {
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
