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
            <el-form-item :rules="[
                            { required: true, message: '请选择推荐医生', trigger: 'change' }
                          ]"
                          prop="doctor_id"
                          label="推荐医生">
              <el-select v-model="postForm.doctor_id"
                         multiple>
                <el-option v-for="item in doctorList"
                           :key="item.id"
                           :value="item.id"
                           :label="item.doctor_name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :rules="[
                            { required: true, message: '请选择栏目', trigger: 'blur' }
                          ]"
                          prop="class_id"
                          label="所选栏目">
              <cascader :select-options="_getPath(classList, postForm.class_id, [])"
                        :options="classOptionList"
                        @change="handleCascaderChange"></cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item :rules="[
                        { required: true, message: '请输入恢复时间', trigger: 'change' }
                      ]"
                      prop="recover_time"
                      label="恢复时间">
          <el-input :row="1"
                    v-model="postForm.recover_time"
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
                            { required: true, message: '项目图标', trigger: 'change' }
                          ]"
                          prop="head_img"
                          label="项目图标:">
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
                          label="项目对比图:">
              <upload :file-list="postForm.result_img"
                      @success="handleListSubmit">
                <el-button icon="el-icon-plus"
                           type="primary">添加图片</el-button>
              </upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="60">
          <el-col :span="12">
            <el-form-item :rules="[
                            { required: true, message: '请添加技术优势', trigger: 'blur' }
                          ]"
                          prop="advantange"
                          label="技术优势">
              <Tinymce ref="editor"
                       v-model="postForm.advantange"
                       :height="200" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :rules="[
                            { required: true, message: '请填写适用人群', trigger: 'blur' }
                          ]"
                          prop="fit_people"
                          label="适用人群">
              <Tinymce ref="editor"
                       v-model="postForm.fit_people"
                       :height="200" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item :rules="[
                        { required: true, message: '请填写项目内容', trigger: 'blur' }
                      ]"
                      prop="content"
                      label="项目内容">
          <Tinymce ref="editor"
                   v-model="postForm.content"
                   :height="400" />
        </el-form-item>
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
import Cascader from '@/components/Cascader'
import { index as getDoctorList } from '@/api/doctor'
import { index as getClassList } from '@/api/contentClass'
import { create, update } from '@/api/project'
import { arrToTree } from '@/utils'
const CHANNELID = 14

const defaultForm = {
  result_img: '', // 案例对比图
  head_img: '', // 项目图标
  title: '', // 标题
  recover_time: '', // 恢复时间
  doctor_id: [], // 推荐医生
  class_id: '',
  fit_people: '', // 适用人群
  advantange: '', // 技术优势
  content: '', // 项目内容
  status: 1
}

export default {
  components: {
    Tinymce,
    MDinput,
    Tags,
    Upload,
    Sticky,
    Cascader
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
      doctorList: [],
      classList: []
    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.recover_time.length
    },
    classOptionList() {
      return arrToTree(this.classList)
    }
  },
  created() {
    getDoctorList().then(res => {
      if (res.code === 200) {
        this.doctorList = res.data
      }
    })
    getClassList().then(res => {
      if (res.code === 200) {
        this.classList = res.data.filter(item => item.channel_id === CHANNELID)
      }
    })
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
    handleCascaderChange(value) {
      this.postForm.class_id = value.slice(-1)[0]
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
                this.$router.push({ name: 'ProjectArticleList' })
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
                this.$router.push({ name: 'ProjectArticleList' })
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
    },
    // 获取路径
    _getPath(arr, id, res) {
      arr.forEach(item => {
        if (item.class_id === id) {
          res.unshift(item.class_id)
          this._getPath(arr, item.parent_id, res)
        }
      })
      return res
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
