<template>
  <el-input
    v-if="type === 'Input' || type === 'Filter'"
    v-model="value"
    :placeholder="meta?.title || '请输入'"
    type="textarea"
    :autosize="{ minRows: 2 }"
    clearable/>

  <span v-else>{{ modelValue }}</span>
</template>

<script>
export default {
  name: 'ChaTextArea',
  props: {
    form: null,
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
