<template>
  <div class="complex-table-container">
    <!--  条件筛选栏  -->
    <cha-filter
      ref="chaFilter">
      <!--   筛选项   -->
      <template #filter-items="{ collapse, updateOffset, updateQuery, setResetMethod }">
        <slot
          name="filter-items"
          :collapse="collapse"
          :updateOffset="updateOffset"
          :updateQuery="updateQuery"
          :setResetMethod="setResetMethod"/>
      </template>
    </cha-filter>

    <!--  表格操作栏  -->
    <cha-action-bar
      ref="chaActionBar"
      :entity-display-name="entityDisplayName">
      <template #action-bar-addon-batch="{ display }">
        <slot name="action-bar-addon-batch" :display="display"></slot>
      </template>
    </cha-action-bar>

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

    <!--  数据操作对话框  -->
    <cha-form-dialog
      ref="chaFormDialog"
      :entity-display-name="entityDisplayName"
      :entity-form-rules="entityFormRules">
      <template #form-items="{ entityFormData }">
        <slot name="form-dialog-items" :entityFormData="entityFormData"></slot>
      </template>
      <template #dialog-footer>
        <slot name="form-dialog-footer"></slot>
      </template>
    </cha-form-dialog>
  </div>
</template>

<script>
import ChaFilter from './components/ChaFilter'
import ChaActionBar from './components/ChaActionBar'
import ChaTable from './components/ChaTable'
import ChaDetailDialog from './components/ChaDetailDialog'
import ChaFormDialog from './components/ChaFormDialog'
import { RemoteDataManager, LocalDataManager } from './manager/data-manager'
import { CompManager } from './manager/comp-manager'

export default {
  name: 'ChaComplexTable',
  components: {
    ChaFilter,
    ChaActionBar,
    ChaTable,
    ChaDetailDialog,
    ChaFormDialog
  },
  props: {
    /* >>>>>> General Props <<<<<< */
    /** 数据模式 本地模式/远程模式 */
    /** 有效值 'remote', 'local' */
    dataMode: { type: String, default: 'remote' },
    /** 换页模式 本地模式/远程模式/禁用 */
    /** 有效值 'remote', 'local', 'disable' */
    pageMode: { type: String, default: 'remote' },
    /** 在 api.js 中组成CRUD访问路径 */
    entityName: String,
    /** 用来代替 entityName 的显示名称（比如可以用于中文本地化时）
     *  未提供时与 entityName 相同 */
    entityDisplayName: String,
    /** 创建/修改时表单验证规则 */
    entityFormRules: Object
  },
  provide () {
    return {
      dataManager: this.dataManager,
      compManager: this.compManager
    }
  },
  data () {
    return {
      dataManager: this.getDataManager(),
      compManager: new CompManager()
    }
  },
  mounted () {
    this.compManager.setComps(
      this.$refs.chaFilter,
      this.$refs.chaActionBar,
      this.$refs.chaTable,
      this.$refs.chaDetailDialog,
      this.$refs.chaFormDialog
    )
  },
  methods: {
    getDataManager () {
      if (this.dataMode === 'local') {
        return new LocalDataManager(this.pageMode)
      } else {
        return new RemoteDataManager(this.pageMode, this.entityName)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
