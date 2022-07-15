<template>
  <div v-if="detailTabs">
    <!--   带Tabs时数据   -->
    <el-tabs v-model="activeTab">
      <!--    基础信息    -->
      <el-tab-pane label="基础信息" name="基础信息">
        <cha-detail-items
          :entity-data="entityData"
          v-model:select-options="modelSelectOptions"/>
      </el-tab-pane>
      <!--    动态附加页面    -->
      <el-tab-pane v-for="tab in detailTabs" :key="tab" :label="tab" :name="tab" :lazy="true">
        <slot :name="tab" :entity-data="entityData" :select-options="selectOptions" :visible="visible" :close="close"/>
      </el-tab-pane>
    </el-tabs>
  </div>
  <div v-else>
    <!--   无Tabs默认数据   -->
    <cha-detail-items
      :entity-data="entityData"
      v-model:select-options="modelSelectOptions"/>
  </div>
</template>

<script>
import ChaDetailItems from './ChaDetailItems'

export default {
  name: 'ChaDetailPanel',
  components: {
    ChaDetailItems
  },
  props: {
    detailTabs: Array,
    entityData: Object,
    selectOptions: Object,
    visible: Boolean,
    close: Function
  },
  emits: {
    'update:selectOptions': null,
    'update:activeTab': null
  },
  computed: {
    modelSelectOptions: {
      get () { return this.selectOptions },
      set (newValue) { this.$emit('update:selectOptions', newValue) }
    }
  },
  data () {
    return {
      activeTab: '基础信息'
    }
  }
}
</script>

<style scoped>

</style>
