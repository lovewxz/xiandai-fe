<template>
  <el-cascader :value="selectOptions"
               :options="options"
               :props="defaultProps"
               :placeholder="placeholder"
               change-on-select
               @change="handleChange"></el-cascader>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => {
        return []
      }
    },
    selectOptions: {
      type: Array,
      default: () => {
        return []
      }
    },
    placeholder: {
      type: String,
      default: '根目录'
    }
  },
  data() {
    return {
      defaultProps: {
        value: 'class_id',
        label: 'class_name',
        children: 'children'
      }
    }
  },
  methods: {
    handleChange(value) {
      this.$emit('change', value)
    }
  }
}
</script>
