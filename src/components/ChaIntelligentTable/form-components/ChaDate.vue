<template>
  <el-date-picker
    v-if="type === 'Input' || type === 'Filter'"
    v-model="value"
    value-format="YYYY-MM-DD"
    type="date"
    :placeholder="meta?.title"/>

  <span v-else>{{ value }}</span>
</template>

<script>
export default {
  name: 'ChaDate',
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
