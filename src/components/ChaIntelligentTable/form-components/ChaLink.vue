<template>
  <el-select
    v-if="type === 'Input' || type === 'Filter'"
    v-model="value"
    :placeholder="modelMeta.title || '请选择'"
    clearable
    filterable
    @visible-change="handleVisibleChange">
    <el-option
      v-for="item in displayOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value">
      <template v-if="item.code">
        <span style="float: left">{{ item.label }}</span>
        <span style="float: right;color: var(--el-text-color-secondary);font-size: 13px;margin-left: 15px;">{{ item.code }}</span>
      </template>
    </el-option>
  </el-select>

  <span v-else :style="{color: formData[meta.color] }">{{ displayText }}</span>
</template>

<script>
import { select } from '@/components/ChaComplexTable/api'
import { ElMessage } from 'element-plus'

export default {
  name: 'ChaLink',
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
      const option = this.displayOptions.find(item => item.value === this.value)
      return option ? option.label : this.value
    },
    displayOptions () {
      if (this.modelSelectOptions && this.modelSelectOptions[this.form?.name]) {
        return this.modelSelectOptions[this.form?.name]
      }
      if (this.modelMeta.alias && this.formData) {
        return [{ label: this.formData[this.modelMeta.alias], value: this.modelValue }]
      }
      return []
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
    }
  }
}
</script>

<style scoped>

</style>
