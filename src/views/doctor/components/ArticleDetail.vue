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
        <el-button type="warning">草稿</el-button>
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
            <el-form-item prop="sub_title"
                          label-width="80px"
                          label="医生头衔:"
                          align="left">
              <el-input v-model="postForm.sub_title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item props="up_hits"
                          label-width="80px"
                          label="点赞次数:"
                          align="left">
              <el-input v-model="postForm.up_hits"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label-width="80px"
                          label="预约次数:"
                          align="left">
              <el-input v-model="postForm.appointment_count"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="擅长项目:">
          <tags :dynamic-tags="postForm.goods_project"
                add-text="添加擅长项目"
                @add="handleInputAdd"
                @close="handleInputClose"></tags>
        </el-form-item>
        <el-row>
          <el-col :span="10">
            <el-form-item label="缩略图:">
              <upload @success="handleIMGSubmit">
                <i class="el-icon-plus"></i>
              </upload>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="列表页缩略图:">
              <upload @success="handleListSubmit">
                <i class="el-icon-plus"></i>
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
import { create } from '@/api/doctor'

const defaultForm = {
  title: '',
  content: '',
  doctor_name: '', // 医生姓名
  sub_title: '', // 医生职称
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
      this.$refs.postForm.validate(valid => {
        if (valid) {
          create(this.postForm).then(res => {
            if (res.code === 200) {
              this.$notify({
                title: '成功',
                message: '发布文章成功',
                type: 'success',
                duration: 2000
              })
              this.$router.push({ name: 'DoctorArticleList' })
            }
          })
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
