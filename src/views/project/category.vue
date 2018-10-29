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
            <el-tooltip content="添加"
                        placement="top">
              <el-button type="success"
                         icon="el-icon-plus"
                         size="mini"
                         @click="append(data)" />
            </el-tooltip>
            <el-tooltip content="编辑"
                        placement="top">
              <el-button type="warning"
                         icon="el-icon-edit"
                         size="mini"
                         @click="edit(data, node)" />
            </el-tooltip>
            <el-tooltip content="删除"
                        placement="top">
              <el-button type="danger"
                         icon="el-icon-delete"
                         size="mini"
                         @click="del(data)" />
            </el-tooltip>
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
                     :parent-name="parentName"
                     :form-item="formItem"
                     :is-edit="isEdit"
                     @submit="handleSubmit">
      <cascader slot="cascader"
                :options="cateList"
                :select-options.sync="selectOpitons"
                placeholder="项目中心"
                @change="handleCascaderChange"></cascader>
    </category-dialog>
  </div>
</template>
<script>
import CategoryDialog from './components/CategoryDialog'
import Cascader from '@/components/Cascader'
import { create, index, update, del } from '@/api/contentClass'
import { arrToTree } from '@/utils'
const CHANNELID = 14
const CHANNELNAME = '项目中心'

export default {
  components: {
    CategoryDialog,
    Cascader
  },
  data() {
    return {
      cateList: [],
      defaultProps: {
        children: 'children',
        label: 'class_name',
        value: 'class_id'
      },
      channelId: CHANNELID,
      parentName: CHANNELNAME,
      parentId: CHANNELID,
      formItem: {},
      isEdit: false,
      selectOpitons: [],
      cascader: []
    }
  },
  created() {
    this.getIndex()
  },
  methods: {
    appendTop() {
      this.isEdit = false
      this.parentName = CHANNELNAME
      this.parentId = CHANNELID
      this.$nextTick(() => {
        this.$refs.dialog.resetFields()
        this.$refs.dialog.reset()
        this.$refs.dialog.show()
      })
    },
    append(data) {
      this.isEdit = false
      this.parentName = data.class_name
      this.parentId = data.class_id
      this.$nextTick(() => {
        this.$refs.dialog.resetFields()
        this.$refs.dialog.reset()
        this.$refs.dialog.show()
      })
    },
    edit(data, node) {
      this.isEdit = true
      this.$nextTick(() => {
        this.$refs.dialog.resetFields()
        this.formItem = data
        this.selectOpitons = this._toSelectOptionsArr(node, []).slice(0, -1)
        this.$refs.dialog.show()
      })
    },
    del(data) {
      this.$confirm(
        `确认删除${data.class_name}?若该栏目存在子栏目，则子栏目也会被删除`,
        '删除'
      ).then(() => {
        del(data.class_id).then(res => {
          if (res.code === 200) {
            this.getIndex()
          }
        })
      })
    },
    handleSubmit(form) {
      if (form.class_id) {
        update(form).then(res => {
          if (res.code === 200) {
            this.$refs.dialog.hide()
            this.getIndex()
          }
        })
      } else {
        create(
          Object.assign(form, {
            parent_id: this.parentId,
            channel_id: this.channelId
          })
        ).then(res => {
          if (res.code === 200) {
            this.$refs.dialog.hide()
            this.getIndex()
          }
        })
      }
    },
    handleCascaderChange(data) {
      this.$set(
        this.formItem,
        'parent_id',
        data.length > 0 ? data[data.length - 1] : CHANNELID
      )
    },
    getIndex() {
      index().then(res => {
        if (res.code === 200) {
          this.cateList = arrToTree(
            res.data.filter(item => item.channel_id === this.channelId)
          )
        }
      })
    },
    _toSelectOptionsArr(node, arr) {
      if (node.level > 1) {
        this._toSelectOptionsArr(node.parent, arr)
      }
      arr.push(node.data.class_id)
      return arr
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
