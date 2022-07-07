<template>
  <el-checkbox
    v-if="type === 'Input' || type === 'Filter'"
    v-model="value"
    :label="meta.title"/>

  <span v-else>{{ value ? '是' : '否' }}</span>
</template>

<script>
export default {
  name: 'ChaBoolean',
  props: {
    form: null,
    modelValue: null,
    meta: Object,
    type: { type: String, default: 'Input' }
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
