<template>
  <el-cascader
    v-if="type === 'Input' || type === 'Filter'"
    v-model="value"
    :options="displayOptions"
    :placeholder="modelMeta.title || '请选择'"
    clearable
    @visible-change="handleVisibleChange"
    :props="{ emitPath: false, checkStrictly: modelMeta.checkStrictly === true }"/>

  <span v-else :style="{color: meta.color }">{{ displayText }}</span>
</template>

<script>
import { select } from '@/components/ChaComplexTable/api'
import { ElMessage } from 'element-plus'

export default {
  name: 'ChaCascader',
  props: {
    modelValue: null,
    form: null,
    formData: null,
    meta: Object,
    type: {
      type: String,
      default: 'Input'
    },
    selectOptions: null
  },
  emits: {
    visibleChange: null,
    'update:modelValue': null,
    'update:meta': null,
    'update:selectOptions': null
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
    modelSelectOptions: {
      get () { return this.selectOptions },
      set (newValue) { this.$emit('update:selectOptions', newValue) }
    },
    displayText () {
      if (this.formData && this.modelMeta.alias && this.formData[this.modelMeta.alias]) {
        return this.formData[this.modelMeta.alias]
      }
      const option = this.flatOptions.find(item => item.value === this.value)
      return option ? option.label : this.value
    },
    displayOptions () {
      if (this.modelSelectOptions && this.modelSelectOptions[this.form.name]) {
        return this.modelSelectOptions[this.form.name]
      }
      if (this.modelMeta.alias && this.formData) {
        return [{ label: this.formData[this.modelMeta.alias], value: this.modelValue }]
      }
      return []
    },
    flatOptions () {
      const result = []
      this.flat(result, this.displayOptions)
      return result
    }
  },
  methods: {
    handleVisibleChange (isDrop) {
      if (isDrop) {
        this.getOptions()
      }
    },
    getOptions () {
      if (!this.modelSelectOptions) {
        this.modelSelectOptions = {}
      }
      if (this.modelMeta.optionsMethod) {
        this.modelSelectOptions[this.form.name] = this.modelMeta.optionsMethod()
      } else if (this.modelMeta.link) {
        select(this.modelMeta.link, {}).then(response => {
          this.modelSelectOptions[this.form.name] = response.data.items
        }).catch(error => {
          ElMessage.error(error.message)
        })
      }
    },
    flat (result, options) {
      if (options) {
        options.forEach(item => {
          result.push(item)
          if (item.children?.length > 0) {
            this.flat(result, item.children)
          }
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
