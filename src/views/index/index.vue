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
        <el-button type="primary">添加幻灯片</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.index-wrapper {
  padding: 30px;
}
</style>
