<template>
  <el-row>
    <!--  基础Form  -->
    <el-col
      v-for="formColumn in formItems"
      :key="formColumn.name"
      :span="formColumn.meta.span || 12">
      <el-form-item :label="formColumn.meta.title" :prop="formColumn.name">
        <component
          :is="formColumn.type"
          class="cha-form-item"
          v-model="modelEntityData[formColumn.name]"
          v-model:meta="formColumn.meta"
          v-model:select-options="modelSelectOptions"
          :form="formColumn"
          :form-data="modelEntityData"/>
      </el-form-item>
    </el-col>
    <!--  Prop Form  -->
    <el-col
      v-for="propColumn in modelEntityData.props"
      :key="propColumn.name"
      :span="propColumn.meta?.span || 12">
      <el-form-item :label="propColumn.title" :prop="propColumn.name">
        <component
          :is="propColumn.component"
          class="cha-form-item"
          v-model="propColumn.value"
          v-model:meta="propColumn.meta"
          v-model:select-options="modelSelectOptions"
          :form="propColumn"
          :form-data="modelEntityData"/>
      </el-form-item>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'ChaFormItems',
  inject: ['entityForm'],
  props: {
    entityData: Object,
    selectOptions: Object
  },
  emits: {
    'update:selectOptions': null
  },
  computed: {
    formItems () {
      return this.entityForm.filter(column => !(column.disable?.all || column.disable?.form))
    },
    modelEntityData: {
      get () { return this.entityData },
      set (newValue) { console.warn('[ChaFormItems:modelEntityData:set]Unable to set this value') }
    },
    modelSelectOptions: {
      get () { return this.selectOptions },
      set (newValue) { this.$emit('update:selectOptions', newValue) }
    }
  }
}
</script>

<style scoped>
.cha-form-item {
  width: 100% !important;
}
</style>
