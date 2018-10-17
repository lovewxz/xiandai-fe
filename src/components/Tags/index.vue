<template>
  <div class="tags-wrapper">
    <el-tag v-for="tag in dynamicTags"
            :key="tag"
            :disable-transitions="false"
            closable
            @close="handleClose(tag)">
      {{ tag }}
    </el-tag>
    <el-input v-if="inputVisible"
              ref="saveTagInput"
              v-model="inputValue"
              class="input-new-tag"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm">
    </el-input>
    <el-button v-else
               class="button-new-tag"
               size="small"
               @click="showInput">+ {{ addText }}</el-button>
  </div>
</template>

<script>
export default {
  props: {
    dynamicTags: {
      type: Array,
      default: () => {
        return []
      }
    },
    addText: {
      type: String,
      default: 'New Tag'
    }
  },
  data() {
    return {
      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {
    handleClose(tag) {
      this.$emit('close', tag)
    },

    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue) {
        this.$emit('add', inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  }
}
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
