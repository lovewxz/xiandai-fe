<template>
  <div class="topchannel-wrapper">
    <div class="topchannel-nav">
      <el-button type="primary"
                 @click.stop="addDoctor">添加医生</el-button>
    </div>
    <el-table :data="tableData"
              border
              style="width: 100%">
      <el-table-column label="ID"
                       width="40"
                       align="center">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>>
      </el-table-column>
      <el-table-column label="医生图片"
                       align="center"
                       width="100">
        <template slot-scope="scope">
          <img :src="`${config.qiniuURL}/${scope.row.img_url}?imageView2/1/w/80/h/80`">
        </template>>
      </el-table-column>
      <el-table-column label="标题"
                       prop="title"
                       align="center"
                       min-width="200">
      </el-table-column>
      <el-table-column label="医生姓名"
                       prop="doctor_name"
                       width="100"
                       align="center">
      </el-table-column>
      <el-table-column label="擅长项目"
                       align="center">
        <template slot-scope="scope">
          {{ scope.row.goods_project }}
        </template>>
      </el-table-column>
      <el-table-column label="预约次数"
                       prop="appointment_count"
                       align="center">
      </el-table-column>
      <el-table-column label="点赞数"
                       prop="up_hits"
                       align="center">
      </el-table-column>
      <el-table-column label="操作"
                       align="center"
                       width="150">
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
  </div>
</template>

<script>
import { index, del } from '@/api/doctor'
import config from '@/config'

export default {
  data() {
    return {
      btnLoading: false,
      config: config,
      tableData: []
    }
  },
  mounted() {
    this.getIndex()
  },
  methods: {
    handleEdit(row) {
      this.$router.push({ name: 'DoctorEditArticle', params: { id: row.id } })
    },
    handleDel(row) {
      this.$confirm(`是否删除${row.doctor_name}?`, '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        del(row.id).then(() => {
          this.getIndex()
        })
      })
    },
    getIndex() {
      index().then(res => {
        this.tableData = res.data
      })
    },
    addDoctor() {
      this.$router.push({ name: 'DoctorCreateArticle' })
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
