<template>
  <el-date-picker
    v-if="type === 'Input' || type === 'Filter'"
    v-model="value"
    type="year"
    :placeholder="meta.title"
    format="YYYY"
    value-format="YYYY"/>

  <span v-else>{{ display }}</span>
</template>

<script>
export default {
  name: 'ChaYear',
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
    },
    display () {
      return this.meta.display ? this.meta.display(this.modelValue) : this.modelValue
    }
  }
}
</script>

<style scoped>

</style>
