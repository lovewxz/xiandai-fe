<template>
  <div class="category-list">
    <el-card class="tree-list">
      <el-tree :data="cateList"
               :props="defaultProps"
               :expand-on-click-node="false"
               show-checkbox
               node-key="class_id"
               default-expand-all
               class="category-tree">
        <span slot-scope="{ node, data }"
              class="custom-tree-node">
          <span>
            <span>{{ node.label }}</span>
          </span>
          <span>
            <el-button type="success"
                       icon="el-icon-plus"
                       size="mini" />
            <el-button type="warning"
                       icon="el-icon-edit"
                       size="mini" />
            <el-button type="danger"
                       icon="el-icon-delete"
                       size="mini" />
          </span>
        </span>
      </el-tree>
      <el-col :span="24"
              class="toolbar">
        <el-button type="primary"
                   @click="appendTop">添加顶级栏目</el-button>
      </el-col>
    </el-card>
    <category-dialog ref="dialog"
                     :channel-id="channelId"
                     :is-top="isTop"
                     @submit="handleSubmit"></category-dialog>
  </div>
</template>
<script>
import CategoryDialog from './components/CategoryDialog'
import { create, index } from '@/api/contentClass'
const CHANNELID = 13

export default {
  components: {
    CategoryDialog
  },
  data() {
    return {
      cateList: [],
      defaultProps: {
        children: 'class_id',
        label: 'class_name',
        value: 'class_id'
      },
      channelId: CHANNELID,
      isTop: false
    }
  },
  created() {
    index().then(res => {
      if (res.code === 200) {
        this.cateList = res.data.filter(
          item => item.channel_id === this.channelId
        )
        console.log(this.cateList)
      }
    })
  },
  methods: {
    appendTop() {
      this.$refs.dialog.show()
      this.isTop = true
    },
    handleSubmit(form) {
      create(form).then(res => {
        if (res.code === 200) {
          this.$refs.dialog.hide()
        }
      })
    }
  }
}
</script>
<style lang="scss">
.category-list {
  padding: 20px;
  .tree-list {
    padding-bottom: 30px;
  }
  .el-tree-node__content {
    height: 40px;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .toolbar {
    margin-top: 20px;
  }
}
</style>
