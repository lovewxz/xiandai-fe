<template>
  <div class="index-wrapper">
    <el-form>
      <el-form-item label="首页幻灯片">
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
                         size="mini">编辑</el-button>
              <el-button icon="el-icon-delete"
                         type="danger"
                         size="mini">删除</el-button>
              <el-button icon="el-icon-rank"
                         type="warning"
                         size="mini">拖动</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary"
                   class="form-btn"
                   @click="handleAddBanner">添加幻灯片</el-button>
        <banner-dialog ref="banner"></banner-dialog>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import BannerDialog from './components/BannerDialog'
import Sortable from 'sortablejs'

export default {
  components: {
    BannerDialog
  },
  data() {
    return {
      bannerData: [
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
      sortable: null
    }
  },
  created() {
    this.$nextTick(() => {
      this.setSort()
    })
  },
  methods: {
    handleAddBanner() {
      this.$refs.banner.show()
    },
    setSort() {
      const el = document.querySelectorAll(
        '.el-table__body-wrapper > table > tbody'
      )[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost',
        onEnd: evt => {
          const tempIndex = this.bannerData.splice(evt.oldIndex, 1)[0]
          this.bannerData.splice(evt.newIndex, 0, tempIndex)
        }
      })
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
  .sortable-ghost {
    opacity: 0.8;
    color: #fff !important;
    background: #42b983 !important;
  }
}
</style>
