<template>
  <div class="complex-table-container">
    <!--  条件筛选栏  -->
    <cha-filter
      ref="chaFilter">
      <!--   筛选项   -->
      <template #filter-items="{collapse, updateOffset}">
        <slot name="filter-items" :collapse="collapse" :updateOffset="updateOffset"/>
      </template>
    </cha-filter>

    <!--  数据表格栏  -->
    <cha-table
      ref="chaTable">
      <template #table-index-column>
        <slot name="table-index-column"/>
      </template>
      <template #table-selection-column>
        <slot name="table-selection-column"/>
      </template>
      <template #table-columns>
        <slot name="table-columns"/>
      </template>
      <template #table-action-column>
        <slot name="table-action-column"/>
      </template>
    </cha-table>
  </div>
</template>

<script>
import ChaFilter from './components/ChaFilter'
import ChaTable from './components/ChaTable'
import { DataManager } from './manager/data-manager'

export default {
  name: 'ChaComplexTable',
  components: {
    ChaFilter,
    ChaTable
  },
  props: {
    /* >>>>>> General Props <<<<<< */
    /** 在 api.js 中组成CRUD访问路径 */
    entityName: String,
    /** 用来代替 entityName 的显示名称（比如可以用于中文本地化时）
     *  未提供时与 entityName 相同 */
    entityDisplayName: String
  },
  provide () {
    return {
      dataManager: new DataManager(this.entityName)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
