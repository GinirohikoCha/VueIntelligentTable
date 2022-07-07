<template>
  <el-scrollbar max-height="300px">
    <div v-for="name of Object.keys(modelDisplayColumns)" :key="name">
      <el-checkbox
        v-model="modelDisplayColumns[name].value"
        :label="modelDisplayColumns[name].label || name"
        :checked="modelDisplayColumns[name].value"
        size="small"/>
    </div>
  </el-scrollbar>
</template>

<script>
export default {
  name: 'ColumnOperationPanel',
  inject: ['entityForm'],
  props: {
    displayColumns: Object
  },
  emits: {
    'update:displayColumns': null
  },
  computed: {
    modelDisplayColumns: {
      get () { return this.displayColumns },
      set (newValue) { this.$emit('update:displayColumns', newValue) }
    }
  }
}
</script>

<style scoped>

</style>
