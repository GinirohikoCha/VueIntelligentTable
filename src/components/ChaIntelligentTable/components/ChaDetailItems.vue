<template>
  <el-descriptions border :column="2">
    <!--  通用信息  -->
    <el-descriptions-item
      v-for="detailColumn in detailItems"
      :key="detailColumn.name"
      :label="detailColumn.meta.title"
      :span="convert2DetailSpan(detailColumn.meta.span)">
      <component
        class="cha-form-item"
        v-model="modelEntityData[detailColumn.name]"
        v-model:meta="detailColumn.meta"
        v-model:select-options="modelSelectOptions"
        :form="detailColumn"
        :form-data="entityData"
        :is="detailColumn.type"
        :type="'Detail'"/>
    </el-descriptions-item>
    <!--  Prop信息  -->
    <el-descriptions-item
      v-for="propColumn in modelEntityData.props"
      :key="propColumn.name"
      :label="propColumn.title"
      :span="convert2DetailSpan(propColumn.meta?.span)">
      <component
        class="cha-form-item"
        v-model="propColumn.value"
        v-model:meta="propColumn.meta"
        v-model:select-options="modelSelectOptions"
        :form="propColumn"
        :form-data="modelEntityData"
        :is="propColumn.component"
        :type="'Detail'"/>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script>
export default {
  name: 'FormItems',
  inject: ['entityForm'],
  props: {
    entityData: Object,
    selectOptions: Object
  },
  emits: {
    'update:selectOptions': null
  },
  computed: {
    modelEntityData: {
      get () { return this.entityData },
      set () { console.warn('[ChaDetailItems:modelEntityData:set]Unable to set this value') }
    },
    modelSelectOptions: {
      get () { return this.selectOptions },
      set (newValue) { this.$emit('update:selectOptions', newValue) }
    },
    detailItems () {
      return this.entityForm.filter(column => !(column.disable?.all || column.disable?.detail))
    }
  },
  methods: {
    /** Layout 24列制span转换为el-descriptions的column列制span */
    convert2DetailSpan (span) {
      if (span >= 24) return 2
      return Math.floor(span / 24 * 3)
    }
  }
}
</script>

<style scoped>

</style>
