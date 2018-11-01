<template>
  <div class="topchannel-wrapper">
    <div class="topchannel-nav">
      <el-button type="primary"
                 @click.stop="addNews">添加案例</el-button>
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
      <el-table-column label="标题"
                       align="center"
                       prop="title">
      </el-table-column>
      <el-table-column label="重要性"
                       align="center"
                       width="150">
        <template slot-scope="scope">
          <el-rate :value="scope.row.importance"
                   :max="3"
                   :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                   :low-threshold="1"
                   :high-threshold="3"
                   style="margin-top:8px;">
          </el-rate>
        </template>
      </el-table-column>
      <el-table-column label="更新时间"
                       align="center"
                       width="150">
        <template slot-scope="scope">
          {{ scope.row.updated_time.split('T')[0] }}
        </template>
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
    <div class="page-wrapper">
      <el-pagination :page-size="pageSize"
                     :total="totalCount"
                     background
                     layout="prev, pager, next"
                     @current-change="handlePageChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { index, del } from '@/api/news'
import config from '@/config'

export default {
  data() {
    return {
      btnLoading: false,
      config: config,
      tableData: [],
      pageSize: 10,
      pageNo: 1,
      totalCount: 0
    }
  },
  mounted() {
    this.getIndex({ pageSize: this.pageSize, pageNo: this.pageNo })
  },
  methods: {
    handleEdit(row) {
      this.$router.push({ name: 'NewsEditArticle', params: { id: row.id } })
    },
    handleDel(row) {
      this.$confirm(`是否删除${row.name}?`, '删除', {
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
    handlePageChange(curPage) {
      this.getIndex({ pageSize: this.pageSize, pageNo: curPage })
    },
    getIndex(params) {
      index(params).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.detail
          this.totalCount = res.data.summary.totalCount
        }
      })
    },
    addNews() {
      this.$router.push({ name: 'NewsCreateArticle' })
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
  .page-wrapper {
    width: 100%;
    margin-top: 30px;
    text-align: center;
  }
}
</style>
