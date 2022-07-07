<template>
  <el-color-picker
    v-if="type === 'Input' || type === 'Filter'"
    v-model="value" />

  <span v-else :style="{color: value}">{{ '●' + value }}</span>
</template>

<script>
export default {
  name: 'ChaColor',
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
