<template>
  <el-checkbox-group v-model="value" :max="meta?.isSingle ? 1 : undefined">
    <el-checkbox v-for="option in meta?.options" :key="option" :label="option.label" />
  </el-checkbox-group>
</template>

<script>
export default {
  name: 'ChaCheckbox',
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
    'update:modelValue': null,
    'update:meta': null
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
