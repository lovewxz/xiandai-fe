<template>
  <div class="index-wrapper">
    <el-form>
      <el-form-item label="首页幻灯片">
        <el-table border
                  fit
                  highlight-current-row>
          <el-table-column align="center"
                           label="图片"></el-table-column>
          <el-table-column align="center"
                           label="链接地址"></el-table-column>
          <el-table-column align="center"
                           label="操作"></el-table-column>
        </el-table>
        <el-button type="primary"
                   @click="handleAddBanner">添加幻灯片</el-button>
        <banner-dialog ref="banner"></banner-dialog>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import BannerDialog from './components/BannerDialog'

export default {
  components: {
    BannerDialog
  },
  methods: {
    handleAddBanner() {
      this.$refs.handleAddBanner.show()
    }
  }
}
</script>

<style lang="scss">
.index-wrapper {
  padding: 30px;
}
</style>
