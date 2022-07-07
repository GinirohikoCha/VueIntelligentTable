<template>
  <el-date-picker
    v-if="type === 'Input' || type === 'Filter'"
    v-model="value"
    type="datetime"
    :placeholder="meta?.title"
    style="width: 100%"/>

  <span v-else>{{ value }}</span>
</template>

<script>
export default {
  name: 'ChaDateTime',
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
