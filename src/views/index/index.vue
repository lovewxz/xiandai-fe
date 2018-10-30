<template>
  <div class="index-wrapper">
    <el-form>
      <el-form-item label="首页幻灯片">
        <drag-table custom-class="banner"
                    @on-end="handleBannerOnEnd">
          <el-table :data="bannerData"
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
                             label="图片"></el-table-column>
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
                           @click="handleBannerEdit(scope.row)">编辑</el-button>
                <el-button icon="el-icon-delete"
                           type="danger"
                           size="mini"
                           @click="handleBannerDel(scope.row.id)">删除</el-button>
                <el-button icon="el-icon-rank"
                           type="warning"
                           size="mini">拖动</el-button>
              </template>
            </el-table-column>
          </el-table>
        </drag-table>
        <el-button type="primary"
                   class="form-btn"
                   @click="handleAddBanner">添加幻灯片</el-button>
        <banner-dialog ref="banner"
                       :data="curBannerData"
                       @submit="handleBannerSubmit"></banner-dialog>
      </el-form-item>
    </el-form>
    <el-form>
      <el-form-item label="首页图标">
        <drag-table custom-class="icon"
                    @on-end="handleBannerOnEnd">
          <el-table :data="iconData"
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
                             label="图片"></el-table-column>
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
                           @click="handleBannerEdit(scope.row)">编辑</el-button>
                <el-button icon="el-icon-delete"
                           type="danger"
                           size="mini"
                           @click="handleBannerDel(scope.row.id)">删除</el-button>
                <el-button icon="el-icon-rank"
                           type="warning"
                           size="mini">拖动</el-button>
              </template>
            </el-table-column>
          </el-table>
        </drag-table>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import BannerDialog from './components/BannerDialog'
import DragTable from './components/DragTable'

export default {
  components: {
    BannerDialog,
    DragTable
  },
  data() {
    return {
      bannerData: [],
      iconData: [
        {
          id: 1,
          pic: '11',
          link: '22'
        },
        {
          id: 2,
          pic: '11',
          link: '33'
        },
        {
          id: 3,
          pic: '22',
          link: '44'
        }
      ],
      curBannerData: {} // 当前banner数据
    }
  },
  methods: {
    handleAddBanner() {
      this.$refs.banner.show()
      this.$refs.banner.resetFields()
      this.$refs.banner.reset()
    },
    handleBannerSubmit(row) {
      if (row.id) {
        const index = this.bannerData.findIndex(item => item.id === row.id)
        this.bannerData.splice(index, 1, row)
      } else {
        this.bannerData.push(
          Object.assign(row, { id: this.bannerData.length + 1 })
        )
      }
      this.$refs.banner.hide()
    },
    handleBannerEdit(row) {
      this.curBannerData = row
      this.$refs.banner.show()
    },
    handleBannerDel() {},
    handleBannerOnEnd(evt) {
      const tempIndex = this.bannerData.splice(evt.oldIndex, 1)[0]
      this.bannerData.splice(evt.newIndex, 0, tempIndex)
    }
  }
}
</script>

<style lang="scss">
.index-wrapper {
  padding: 30px;
  .form-btn {
    margin-top: 30px;
  }
}
</style>
