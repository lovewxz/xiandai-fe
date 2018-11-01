<template>
  <div class="createPost-container">
    <el-form ref="postForm"
             :model="postForm"
             label-position="top"
             class="form-container">
      <sticky>
        <el-button :loading="loading"
                   style="margin-left: 10px;"
                   type="success"
                   @click="handleSubmit">发布
        </el-button>
        <el-button type="warning"
                   @click="handleDraft">草稿</el-button>
      </sticky>
      <div class="createPost-main-container">
        <el-form-item :rules="[
                        { required: true, message: '标题不能为空', trigger: 'change' }
                      ]"
                      style="margin-bottom: 40px;"
                      prop="title">
          <MDinput v-model="postForm.title"
                   :maxlength="100"
                   name="title"
                   required>
            标题
          </MDinput>
        </el-form-item>
        <el-row>
          <el-col :span="8">
            <el-form-item label="重要性:">
              <el-rate v-model="postForm.importance"
                       :max="3"
                       :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                       :low-threshold="1"
                       :high-threshold="3"
                       style="margin-top:8px;">
              </el-rate>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="列表缩略图:">
              <upload :file-list="postForm.img_url"
                      @success="handleIMGSubmit">
                <el-button icon="el-icon-plus"
                           type="primary">添加图片</el-button>
              </upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item :rules="[
                        { required: true, message: '请输入列表页简介', trigger: 'change' }
                      ]"
                      prop="introduction"
                      label="列表页简介">
          <el-input :row="1"
                    v-model="postForm.introduction"
                    type="textarea"
                    class="article-textarea"
                    autosize
                    placeholder="请输入简介"></el-input>
          <span v-show="contentShortLength"
                class="word-counter">{{ contentShortLength }}字</span>
        </el-form-item>
        <el-form-item :rules="[
                        { required: true, message: '新闻内容不能为空', trigger: 'change' }
                      ]"
                      label="新闻内容:"
                      prop="content">
          <Tinymce ref="editor"
                   :height="400"
                   v-model="postForm.content" />
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import MDinput from '@/components/MDinput'
import Upload from '@/components/Upload'
import Sticky from '@/components/Sticky'
import { create, edit, update } from '@/api/news'

const defaultForm = {
  title: '',
  importance: 0,
  content: '',
  img_url: '',
  introduction: ''
}

export default {
  components: {
    Tinymce,
    MDinput,
    Upload,
    Sticky
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false
    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.introduction.length
    }
  },
  created() {
    if (this.isEdit) {
      const { id } = this.$route.params
      edit(id).then(res => {
        if (res.code === 200) {
          this.postForm = res.data
        }
      })
    } else {
      this.postForm = Object.assign({}, defaultForm)
    }
  },
  methods: {
    handleIMGSubmit(file) {
      this.postForm.img_url = file.key
    },
    handleSubmit() {
      this.submit(Object.assign(this.postForm, { status: 1 }))
    },
    handleDraft() {
      this.submit(Object.assign(this.postForm, { status: 0 }))
    },
    submit(postForm) {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          const { id } = this.$route.params
          if (id) {
            update(id, postForm).then(res => {
              if (res.code === 200) {
                this.$router.push({ name: 'NewsArticleList' })
                this.$notify({
                  title: '成功',
                  message: '更新案例成功',
                  type: 'success',
                  duration: 2000
                })
              }
            })
          } else {
            create(postForm).then(res => {
              if (res.code === 200) {
                this.$router.push({ name: 'NewsArticleList' })
                this.$notify({
                  title: '成功',
                  message: '发布文章成功',
                  type: 'success',
                  duration: 2000
                })
              }
            })
          }
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/styles/mixin.scss';

.createPost-container {
  position: relative;
  .createPost-main-container {
    padding: 30px 45px 20px 50px;
    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;
      .postInfo-container-item {
        float: left;
      }
    }
    .editor-container {
      min-height: 500px;
      margin: 0 0 30px;
      .editor-upload-btn-container {
        text-align: right;
        margin-right: 10px;
        .editor-upload-btn {
          display: inline-block;
        }
      }
    }
    .article-textarea /deep/ {
      textarea {
        padding-right: 40px;
        resize: none;
        border: none;
        border-radius: 0px;
        border-bottom: 1px solid #bfcbd9;
      }
    }
    .word-counter {
      width: 40px;
      position: absolute;
      right: -10px;
      top: 0px;
    }
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .custom-tabs /deep/ {
      .el-tabs__content {
        padding: 0px 40px;
      }
      .el-tabs__nav-scroll {
        min-height: 515px;
      }
    }
  }
}
</style>
