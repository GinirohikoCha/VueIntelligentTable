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

    <!--  详情对话框  -->
    <cha-detail-dialog
      ref="chaDetailDialog">
      <template #detail-items="{ visible, close, entityData }">
        <slot name="detail-dialog-items" :entityData="entityData" :visible="visible" :close="close"></slot>
      </template>
    </cha-detail-dialog>
  </div>
</template>

<script>
import ChaFilter from './components/ChaFilter'
import ChaTable from './components/ChaTable'
import ChaDetailDialog from './components/ChaDetailDialog'
import { RemoteDataManager, LocalDataManager } from './manager/data-manager'
import { CompManager } from './manager/comp-manager'

export default {
  name: 'ChaComplexTable',
  components: {
    ChaFilter,
    ChaTable,
    ChaDetailDialog
  },
  props: {
    /* >>>>>> General Props <<<<<< */
    /** 数据模式 本地模式/远程模式 */
    /** 有效值 'remote', 'local' */
    dataMode: { type: String, default: 'remote' },
    /** 在 api.js 中组成CRUD访问路径 */
    entityName: String,
    /** 用来代替 entityName 的显示名称（比如可以用于中文本地化时）
     *  未提供时与 entityName 相同 */
    entityDisplayName: String
  },
  provide () {
    return {
      dataManager: this.dataManager,
      compManager: this.compManager
    }
  },
  data () {
    return {
      dataManager: this.dataMode === 'local' ? new LocalDataManager() : new RemoteDataManager(this.entityName),
      compManager: new CompManager()
    }
  },
  mounted () {
    this.compManager.setComps(
      this.$refs.chaFilter,
      this.$refs.chaTable,
      this.$refs.chaDetailDialog
    )
  }
}
</script>

<style lang="scss" scoped>

</style>
