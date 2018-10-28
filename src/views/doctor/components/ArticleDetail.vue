<template>
  <div class="createPost-container">
    <el-form ref="postForm"
             :model="postForm"
             :rules="rules"
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
        <el-form-item style="margin-bottom: 40px;"
                      prop="title">
          <MDinput v-model="postForm.title"
                   :maxlength="100"
                   name="title"
                   required>
            标题
          </MDinput>
        </el-form-item>
        <el-row :gutter="60"
                type="flex"
                justify="space-between">
          <el-col :span="7">
            <el-form-item prop="doctor_name"
                          label-width="80px"
                          label="医生姓名:"
                          align="left">
              <el-input v-model="postForm.doctor_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item prop="profession"
                          label-width="80px"
                          label="医生头衔:"
                          align="left">
              <el-input v-model="postForm.profession"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item props="up_hits"
                          label-width="80px"
                          label="点赞次数:"
                          align="left">
              <el-input v-model.number="postForm.up_hits"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label-width="80px"
                          label="预约次数:"
                          align="left">
              <el-input v-model.number="postForm.appointment_count"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="擅长项目:">
          <tags :dynamic-tags="postForm.goods_project"
                add-text="添加擅长项目"
                @add="handleInputAdd"
                @close="handleInputClose"></tags>
        </el-form-item>
        <el-row :gutter="60">
          <el-col :span="12">
            <el-form-item label="缩略图:">
              <upload :file-list="postForm.img_url"
                      @success="handleIMGSubmit">
                <el-button icon="el-icon-plus"
                           type="primary">添加图片</el-button>
              </upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="列表页缩略图:">
              <upload :file-list="postForm.list_url"
                      @success="handleListSubmit">
                <el-button icon="el-icon-plus"
                           type="primary">添加图片</el-button>
              </upload>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="editor-container">
          <el-form-item label="医生内容:"
                        label-width="80px">
            <Tinymce ref="editor"
                     :height="400"
                     v-model="postForm.content" />
          </el-form-item>
        </div>
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
import { create, fetchDataById, update } from '@/api/doctor'

const defaultForm = {
  status: '1',
  profession: '', // 医生职称
  title: '',
  content: '',
  doctor_name: '', // 医生姓名
  up_hits: 0, // 点赞次数
  appointment_count: 0, // 预约次数
  img_url: '', // 缩略图
  list_url: '', // 列表页缩略图
  goods_project: [] // 擅长项目
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
      rules: {
        title: [
          {
            required: true,
            message: '标题不能为空',
            trigger: 'change'
          }
        ]
      },
      loading: false
    }
  },
  created() {
    if (this.isEdit) {
      const { id } = this.$route.params
      this.getDoctorById(id)
    } else {
      this.postForm = Object.assign({}, defaultForm)
    }
  },
  methods: {
    handleInputAdd(val) {
      this.postForm.goods_project.push(val)
    },
    handleInputClose(val) {
      this.postForm.goods_project.splice(
        this.postForm.goods_project.indexOf(val),
        1
      )
    },
    // 缩略图
    handleIMGSubmit(file) {
      this.postForm.img_url = file.key
    },
    // 列表缩略图
    handleListSubmit(file) {
      this.postForm.list_url = file.key
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
                this.$router.push({ name: 'DoctorArticleList' })
                this.$notify({
                  title: '成功',
                  message: '发布文章成功',
                  type: 'success',
                  duration: 2000
                })
              }
            })
          } else {
            create(postForm).then(res => {
              if (res.code === 200) {
                this.$router.push({ name: 'DoctorArticleList' })
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
    getDoctorById(id) {
      fetchDataById(id).then(res => {
        if (res.code === 200) {
          this.postForm = res.data
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
  }
  .word-counter {
    width: 40px;
    position: absolute;
    right: -10px;
    top: 0px;
  }
}
</style>
