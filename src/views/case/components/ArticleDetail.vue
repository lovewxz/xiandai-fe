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
        <el-row :gutter="60">
          <el-col :span="6">
            <el-form-item :rules="[
                            { required: true, message: '请选择栏目', trigger: 'change' }
                          ]"
                          prop="class_id"
                          label="所选栏目">
              <el-select v-model="postForm.class_id">
                <el-option v-for="item in classOptions"
                           :key="item.class_id"
                           :value="item.class_id"
                           :label="item.class_name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :rules="[
                            { required: true, message: '请输入案例姓名', trigger: 'change' }
                          ]"
                          prop="name"
                          label="案例姓名">
              <el-input v-model="postForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
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
              <upload :file-list="postForm.head_img"
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
              <upload :file-list="postForm.result_img"
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
                         :lazy="true"
                         :key="index"
                         :label="`日记${index+1}`">
              <el-form-item :rules="[
                              { required: true, message: '请填写恢复天数', trigger: 'change' }
                            ]"
                            :prop="`time_list.${index}.recovery_day`"
                            label="恢复天数">
                <el-row type="flex"
                        justify="space-between">
                  <el-col :span="6">
                    <el-input v-model="item.recovery_day"></el-input>
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
              <el-form-item :prop="`time_list.${index}.photos`"
                            label="日记照片">
                <upload :file-list="item.photos"
                        :key="index"
                        multiple
                        list-type="picture-card"
                        @success="(file) => { handleDiarySuccess(file, index) }">
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
import { create, edit, update } from '@/api/case'
import { index as getClassIndex } from '@/api/contentClass'

const CHANNELID = 13

const defaultForm = {
  result_img: '',
  head_img: '',
  title: '',
  introduction: '',
  name: '',
  build_plan: [],
  class_id: '',
  time_list: [
    {
      recovery_day: '',
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
      loading: false,
      classOptions: []
    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.introduction.length
    }
  },
  created() {
    getClassIndex().then(res => {
      if (res.code === 200) {
        this.classOptions = res.data.filter(
          item => item.channel_id === CHANNELID
        )
      }
    })
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
    handleDiarySuccess(file, index) {
      this.postForm.time_list[index].photos.push(file.key)
    },
    // 添加日记
    addTimeList() {
      this.postForm.time_list.push({
        recovery_day: '',
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
                this.$router.push({ name: 'CaseArticleList' })
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
                this.$router.push({ name: 'CaseArticleList' })
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
