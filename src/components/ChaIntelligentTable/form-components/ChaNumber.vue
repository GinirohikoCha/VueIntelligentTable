<template>
  <el-input
    v-if="type === 'Input' || type === 'Filter'"
    v-model="value"
    :placeholder="meta.title || '请输入'"
    type="number"
    :min="meta.min"
    :max="meta.max"
    clearable>
    <template v-if="meta.unitName" #append>{{ meta.unitName }}</template>
  </el-input>

  <el-input-number
    v-else-if="type === 'Simple'"
    v-model="value"
    :placeholder="placeholder"
    :min="meta.min"
    :max="meta.max"
    clearable/>

  <span v-else>{{ displayNumber }}</span>
</template>

<script>
export default {
  name: 'ChaNumber',
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
    displayNumber () {
      return this.meta.display ? this.meta.display(this.modelValue) : this.modelValue
    },
    placeholder () {
      const placeholder = this.meta.title || '请输入'
      return this.meta.unitName ? placeholder + '(' + this.meta.unitName + ')' : placeholder
    }
  }
}
</script>

<style scoped>

</style>
