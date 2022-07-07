<template>
  <el-select
    v-if="type === 'Input' || type === 'Filter'"
    v-model="value"
    :placeholder="modelMeta?.title || '请选择'"
    clearable
    filterable
    @visible-change="handleVisibleChange">
    <el-option
      v-for="item in modelMeta?.options"
      :key="item.value"
      :label="item.label"
      :value="item.value"/>
  </el-select>

  <span v-else>{{ displayText }}</span>
</template>

<script>
export default {
  name: 'ChaSelect',
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
    'update:meta': null,
    visibleChange: null
  },
  computed: {
    value: {
      get () { return this.modelValue },
      set (newValue) { this.$emit('update:modelValue', newValue) }
    },
    modelMeta: {
      get () { return this.meta },
      set (newValue) { this.$emit('update:meta', newValue) }
    },
    displayText () {
      let option = null
      if (this.modelMeta?.options) {
        option = this.modelMeta.options.find(item => item.value === this.value)
      }
      return option ? option.label : this.value
    }
  },
  methods: {
    handleVisibleChange (isDrop) {
      if (isDrop) {
        this.getOptions()
      }
    },
    getOptions () {
      if (this.modelMeta?.optionsMethod) {
        this.modelMeta.options = this.modelMeta.optionsMethod()
      }
    }
  }
}
</script>

<style scoped>

</style>
