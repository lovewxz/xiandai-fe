<template>
  <div :class="customClass"
       class="drag-table-wrapper">
    <slot></slot>
  </div>
</template>

<script>
import Sortable from 'sortablejs'

export default {
  props: {
    customClass: {
      type: String,
      default: '',
      required: true
    }
  },
  data() {
    return {
      sortable: null
    }
  },
  created() {
    this.$nextTick(() => {
      this.setSort()
    })
  },
  methods: {
    setSort() {
      const HTMLDomSelector = this.customClass
        ? `.${this.customClass} .el-table__body-wrapper > table > tbody`
        : '.el-table__body-wrapper > table > tbody'
      const el = document.querySelectorAll(HTMLDomSelector)[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost',
        onEnd: evt => {
          this.$emit('on-end', evt)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.drag-table-wrapper /deep/ {
  .sortable-ghost {
    opacity: 0.8;
    color: #fff !important;
    background: #42b983 !important;
  }
}
</style>
