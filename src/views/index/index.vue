<template>
  <div class="index-wrapper">
    <sticky>
      <el-button :loading="loading"
                 type="success"
                 @click="handleSave">保存
      </el-button>
    </sticky>
    <div class="create-post-main-wrapper">
      <el-form>
        <el-form-item label="首页幻灯片">
          <part-item :list.sync="postForm.banner"
                     title="幻灯片"
                     class-name="banner"></part-item>
        </el-form-item>
        <el-form-item label="首页图标">
          <part-item :list.sync="postForm.icon"
                     title="图标"
                     class-name="icon"></part-item>
        </el-form-item>
        <el-form-item label="首页优惠">
          <part-item-sale :list.sync="postForm.sale"
                          title="优惠"
                          class-name="sale"></part-item-sale>
        </el-form-item>
        <el-form-item label="美丽分享馆">
          <part-item :list.sync="postForm.beauty_share"
                     title="案例"
                     class-name="share"></part-item>
        </el-form-item>
        <el-card>
          <el-form-item label="专家合照">
            <upload :file-list="postForm.group_photo"
                    @success="handleGroupPhotoSubmit">
              <el-button icon="el-icon-plus"
                         type="primary">添加合照</el-button>
            </upload>
          </el-form-item>
          <el-form-item label="商务通">
            <upload :file-list="postForm.swt_pic"
                    @success="handleSwtSubmit">
              <el-button icon="el-icon-plus"
                         type="primary">添加商务通图片</el-button>
            </upload>
          </el-form-item>
        </el-card>
      </el-form>
    </div>
  </div>
</template>

<script>
import PartItem from './components/PartItem'
import PartItemSale from './components/PartItemSale'
import Upload from '@/components/Upload'
import Sticky from '@/components/Sticky'
import { update, edit } from '@/api'

const defaultForm = {
  banner: [],
  icon: [],
  beauty_share: [],
  sale: [],
  group_photo: '',
  swt_pic: ''
}

export default {
  components: {
    PartItem,
    PartItemSale,
    Upload,
    Sticky
  },
  data() {
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false
    }
  },
  created() {
    edit().then(res => {
      if (res.code === 200) {
        this.postForm = res.data
          ? Object.assign({}, res.data)
          : Object.assign({}, defaultForm)
      }
    })
  },
  methods: {
    handleGroupPhotoSubmit(file) {
      this.postForm.group_photo = file.key
    },
    handleSwtSubmit(file) {
      this.postForm.swt_pic = file.key
    },
    handleSave() {
      this.loading = true
      update(this.postForm)
        .then(res => {
          if (res.code === 200) {
            this.loading = false
            this.$notify.success('保存成功')
          }
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss">
.index-wrapper {
  .create-post-main-wrapper {
    padding: 30px;
  }
  .form-btn {
    margin-top: 30px;
  }
}
</style>
