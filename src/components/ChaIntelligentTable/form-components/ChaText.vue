<template>
  <el-input
    v-if="type === 'Input' || type === 'Filter'"
    v-model="value"
    :placeholder="meta?.title || '请输入'"
    clearable>
    <template v-if="meta?.unitName" #append>{{ meta.unitName }}</template>
  </el-input>

  <span v-else>{{ modelValue }} {{ modelValue ? meta?.unitName : null }}</span>
</template>

<script>
export default {
  name: 'ChaText',
  props: {
    form: null,
    // 无类型检测，存在字符串/数字的可能性
    modelValue: null,
    meta: Object,
    type: {
      type: String,
      default: 'Input'
    }
  },
  emits: {
    'update:modelValue': null
  },
  computed: {
    value: {
      get () { return this.modelValue },
      set (newValue) { this.$emit('update:modelValue', newValue) }
    }
  }
}
</script>

<style scoped>

</style>
