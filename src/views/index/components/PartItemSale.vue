<template>
  <div class="part-wrapper">
    <drag-table :custom-class="className"
                @on-end="handleOnEnd">
      <el-table :data="list"
                row-key="id"
                border
                fit
                highlight-current-row>
        <el-table-column label="ID"
                         prop="id"
                         align="center"
                         width="50">
        </el-table-column>
        <el-table-column align="center"
                         prop="pic"
                         label="图片">
          <template slot-scope="scope">
            <img :src="`${config.qiniuURL}/${scope.row.pic}?imageView2/1/w/100/h/100`">
          </template>
        </el-table-column>
        <el-table-column align="center"
                         prop="project"
                         label="项目名称"></el-table-column>
        <el-table-column align="center"
                         prop="price"
                         label="项目价格"></el-table-column>
        <el-table-column align="center"
                         prop="link"
                         label="链接地址"></el-table-column>
        <el-table-column align="center"
                         label="操作"
                         width="300">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit"
                       type="primary"
                       size="mini"
                       @click="handleEdit(scope.row)">编辑</el-button>
            <el-button icon="el-icon-delete"
                       type="danger"
                       size="mini"
                       @click="handleDel(scope.row.id)">删除</el-button>
            <el-button icon="el-icon-rank"
                       type="warning"
                       size="mini">拖动</el-button>
          </template>
        </el-table-column>
      </el-table>
    </drag-table>
    <el-button type="primary"
               class="form-btn"
               @click="handleAdd">添加{{ title }}</el-button>
    <drag-dialog-sale ref="dialog"
                      :data="curListItem"
                      @submit="handleSubmit"></drag-dialog-sale>
  </div>
</template>

<script>
import DragDialogSale from './DragDialogSale'
import DragTable from './DragTable'
import config from '@/config'

export default {
  components: {
    DragDialogSale,
    DragTable
  },
  props: {
    className: {
      type: String,
      default: 'string'
    },
    title: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      curListItem: {},
      config
    }
  },
  methods: {
    handleAdd(name) {
      this.$refs.dialog.resetFields()
      this.$refs.dialog.reset()
      this.$refs.dialog.show()
    },
    handleEdit(row) {
      this.curListItem = Object.assign({}, row)
      this.$refs.dialog.show()
    },
    handleSubmit(row) {
      if (row.id) {
        const index = this.list.findIndex(item => item.id === row.id)
        this.list.splice(index, 1, row)
      } else {
        this.list.push(Object.assign(row, { id: this.list.length + 1 }))
      }
      this.$refs.dialog.hide()
    },
    handleDel(row) {
      this.$confirm('确定删除吗?', '删除').then(() => {
        const index = this.list.findIndex(item => item.id === row.id)
        this.list.splice(index, 1)
      })
    },
    handleOnEnd(evt) {
      const tempIndex = this.list.splice(evt.oldIndex, 1)[0]
      this.list.splice(evt.newIndex, 0, tempIndex)
    }
  }
}
</script>

<style lang="scss" scoped>
.index-wrapper /deep/ {
  padding: 30px;
  .form-btn {
    margin-top: 30px;
  }
}
</style>
