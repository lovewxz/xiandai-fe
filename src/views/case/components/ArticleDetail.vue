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
        <el-button type="warning">草稿</el-button>
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
          <el-col :span="6">
            <el-form-item :rules="[
                            { required: true, message: '请输入案例姓名', trigger: 'change' }
                          ]"
                          prop="name"
                          label="案例姓名">
              <el-input v-model="postForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12"
                  :offset="3">
            <el-form-item prop="build_plan"
                          label="打造方案">
              <tags :dynamic-tags="postForm.build_plan"
                    add-text="添加打造方案"
                    @add="handleInputAdd"
                    @close="handleInputClose"></tags>
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
        <el-row :gutter="60">
          <el-col :span="12">
            <el-form-item :rules="[
                            { required: true, message: '请上传人物缩略图', trigger: 'change' }
                          ]"
                          prop="head_img"
                          label="人物缩略图:">
              <upload :file-list="imgFileListUrl"
                      @success="handleIMGSubmit">
                <el-button icon="el-icon-plus"
                           type="primary">添加图片</el-button>
              </upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :rules="[
                            { required: true, message: '请添加对比图', trigger: 'change' }
                          ]"
                          prop="result_img"
                          label="术前术后对比图:">
              <upload :file-list="listFileListUrl"
                      @success="handleListSubmit">
                <el-button icon="el-icon-plus"
                           type="primary">添加图片</el-button>
              </upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-card>
          <div slot="header"
               class="card-header">
            <span>日记详情</span>
            <span>
              <el-button type="primary"
                         icon="el-icon-plus"
                         @click="addTimeList">添加日记</el-button>
            </span>
          </div>
          <el-tabs tab-position="left"
                   class="custom-tabs">
            <el-tab-pane v-for="(item,index) in postForm.time_list"
                         :key="index"
                         :label="`日记${index+1}`">
              <el-form-item :rules="[
                              { required: true, message: '请填写恢复天数', trigger: 'change' }
                            ]"
                            :prop="`time_list.${index}.title`"
                            label="恢复天数">
                <el-row type="flex"
                        justify="space-between">
                  <el-col :span="6">
                    <el-input v-model="item.title"></el-input>
                  </el-col>
                  <el-col :span="3"
                          style="text-align:right;">
                    <el-button v-if="index > 0"
                               type="danger"
                               icon="el-icon-delete"
                               size="small"
                               @click="removeTimeList(index)">删除日记</el-button>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="日记照片">
                <upload multiple
                        list-type="picture-card">
                  <i class="el-icon-plus"></i>
                </upload>
              </el-form-item>
              <el-form-item :prop="`time_list.${index}.content`"
                            label="恢复日记">
                <Tinymce ref="editor"
                         :height="400"
                         v-model="item.content" />
              </el-form-item>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </div>
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import MDinput from '@/components/MDinput'
import Tags from '@/components/Tags'
import Upload from '@/components/Upload'
import Sticky from '@/components/Sticky'
import config from '@/config'

const defaultForm = {
  result_img: '',
  head_img: '',
  title: '',
  introduction: '',
  name: '',
  build_plan: [],
  time_list: [
    {
      title: '',
      content: '',
      photos: []
    }
  ]
}

export default {
  components: {
    Tinymce,
    MDinput,
    Tags,
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
    imgFileListUrl() {
      if (this.postForm.head_img) {
        return [
          {
            url: `${config.qiniuURL}/${this.postForm.head_img}`,
            name: this.postForm.head_img
          }
        ]
      }
    },
    listFileListUrl() {
      if (this.postForm.result_img) {
        return [
          {
            url: `${config.qiniuURL}/${this.postForm.result_img}`,
            name: this.postForm.result_img
          }
        ]
      }
    },
    contentShortLength() {
      return this.postForm.introduction.length
    }
  },
  created() {},
  methods: {
    handleInputAdd(val) {
      this.postForm.build_plan.push(val)
    },
    handleInputClose(val) {
      this.postForm.build_plan.splice(this.postForm.build_plan.indexOf(val), 1)
    },
    // 人物缩略图
    handleIMGSubmit(file) {
      this.postForm.head_img = file.key
    },
    // 列表缩略图
    handleListSubmit(file) {
      this.postForm.result_img = file.key
    },
    // 添加日记
    addTimeList() {
      this.postForm.time_list.push({
        title: '',
        content: '',
        photos: []
      })
    },
    removeTimeList(index) {
      this.$confirm('是否删除本篇日记?', '删除').then(() => {
        this.postForm.time_list.splice(index, 1)
      })
    },
    handleSubmit() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          return
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
