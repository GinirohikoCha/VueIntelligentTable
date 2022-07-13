<template>
  <cha-complex-table
    ref="chaComplexTable"
    :entity-name="entityName"
    :entity-display-name="entityDisplayName"
    :entity-form-rules="entityFormRules"
    :data-mode="dataMode"
    :page-mode="pageMode"
    :crud-list-method="crudListMethod"
    :crud-detail-method="crudDetailMethod"
    :crud-select-method="crudSelectMethod"
    :crud-create-method="crudCreateMethod"
    :crud-update-method="crudUpdateMethod"
    :crud-delete-method="crudDeleteMethod"
    :detail-action="detailAction"
    :create-action="createAction"
    :edit-action="editAction"
    :export-header="exportHeader"
    :export-file-name="exportFileName || entityDisplayName"
    :export-options="exportOptions || selectOptions"
    :settings="settings"
    v-model:data="modelData"
    v-model:selection="modelSelection"
    v-model:display-columns="displayColumns">
    <!--  ChaFilter  -->
    <template #filter-items="{ collapse, enableCollapse, updateOffset, updateQuery, setResetMethod }">
      <slot name="filter-items">
        <cha-filter-items
          :collapse="collapse"
          :enableCollapse="enableCollapse"
          :updateOffset="updateOffset"
          :updateQuery="updateQuery"
          :setResetMethod="setResetMethod"
          v-model:select-options="selectOptions"/>
      </slot>
    </template>
    <!--  ChaActionBar  -->
    <template #action-bar-addon-batch="{ display }"><slot name="action-bar-addon-batch" :display="display"></slot></template>
    <template #column-operation-panel><slot name="column-operation-panel"></slot></template>
    <!--  ChaTable  -->
    <template #table-index-column><slot name="table-index-column"/></template>
    <template #table-selection-column><slot name="table-selection-column"/></template>
    <template #table-columns>
      <slot name="table-columns">
        <cha-table-columns
          :page-mode="pageMode"
          :display-columns="displayColumns"
          v-model:select-options="selectOptions"/>
      </slot>
    </template>
    <template #table-action-column><slot name="table-action-column"/></template>
    <!--  ChaDetailDialog  -->
    <template #detail-dialog-items="{ entityData, visible, close }">
      <slot name="detail-dialog-items" :entityData="entityData" :visible="visible" :close="close">
        <cha-detail-panel
          :detail-tabs="detailTabs"
          :entity-data="entityData"
          :visible="visible"
          :close="close"
          v-model:select-options="selectOptions"/>
      </slot>
    </template>
    <!--  ChaFormDialog  -->
    <template #form-dialog-items="{ entityData }">
      <slot name="form-dialog-items" :entityData="entityData">
        <cha-form-items
          :entity-data="entityData"
          v-model:select-options="selectOptions"/>
      </slot>
    </template>
    <template #form-dialog-footer><slot name="form-dialog-footer"/></template>
  </cha-complex-table>
</template>

<script>
import ChaComplexTable from '../ChaComplexTable'
import ChaTableColumns from './components/ChaTableColumns'
import ChaFilterItems from './components/ChaFilterItems'
import ChaDetailPanel from './components/ChaDetailPanel'
import ChaFormItems from './components/ChaFormItems'
import { select } from '../ChaComplexTable/api'

export default {
  name: 'ChaIntelligentTable',
  components: {
    ChaComplexTable,
    ChaTableColumns,
    ChaFilterItems,
    ChaDetailPanel,
    ChaFormItems
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
    /** 实体字段配置项 */
    entityForm: { type: Array, data () { return [] } },
    /* >>>>>> CRUD 自定义方法相关 <<<<<< */
    crudListMethod: Function,
    crudDetailMethod: Function,
    crudSelectMethod: Function,
    crudCreateMethod: Function,
    crudUpdateMethod: Function,
    crudDeleteMethod: Function,
    /** 点击详细查询时动作，默认打开详情窗 */
    detailAction: Function,
    /** 点击创建时动作，默认打开创建窗 */
    createAction: Function,
    /** 点击编辑时动作，默认打开编辑窗 */
    editAction: Function,
    /* >>>>>> Export Props <<<<<< */
    exportOptions: Object,
    exportFileName: String,
    /* >>>>>> v-model Props <<<<<< */
    data: Array,
    selection: Array,
    /* >>>>>> Optional Props <<<<<< */
    detailTabs: Array,
    /* >>>>>> 设置 <<<<<< */
    settings: Object
  },
  emits: {
    'update:data': null,
    'update:selection': null
  },
  provide () {
    return {
      entityForm: this.entityForm
    }
  },
  computed: {
    exportHeader () {
      const exportHeader = {}
      this.entityForm
        .filter(column => !column.disable?.export && this.displayColumns[column.name]?.value)
        .forEach(item => {
          exportHeader[item.name] = item.meta?.title || item.name
        })
      return exportHeader
    },
    // v-model
    modelData: {
      get () { return this.data },
      set (newValue) { this.$emit('update:data', newValue) }
    },
    modelSelection: {
      get () { return this.selection },
      set (newValue) { this.$emit('update:selection', newValue) }
    }
  },
  data () {
    return {
      displayColumns: {},
      entityFormRules: [],
      selectOptions: []
    }
  },
  mounted () {
    this.initDisplayColumns()
    this.initSelectOptions()
    this.initFormRules()
  },
  methods: {
    /* >>>>>> For Outer Methods <<<<<< */
    refresh () {
      this.$refs.chaComplexTable.refresh()
    },
    select (rows) {
      this.$refs.chaComplexTable.select(rows)
    },
    /* >>>>>> Internal Methods <<<<<< */
    initDisplayColumns () {
      const columns = this.entityForm.filter(column => !(column.disable?.all || column.disable?.table))
      for (const column of columns) {
        this.displayColumns[column.name] = {
          label: column.meta?.title ?? column.name,
          value: !column.hide
        }
      }
    },
    /** 全局初始化选项 */
    initSelectOptions () {
      this.entityForm.forEach(column => {
        if (column.meta) {
          if (column.meta?.options) {
            this.selectOptions[column.name] = column.meta.options
          } else if (column.meta?.link) {
            const selectMethod = this.crudSelectMethod || select

            selectMethod(column.meta.link, {}).then(response => {
              this.selectOptions[column.name] = response.data.items
            })
          } else if (column.meta?.optionsMethod) {
            this.selectOptions[column.name] = column.meta.optionsMethod()
          }
        }
      })
    },
    /** 生成FormDialog中表单的rules要求 */
    initFormRules () {
      this.entityFormRules = {}
      // TODO custom validator
      this.entityForm
        .filter(column => column.required && !(column.disable?.all || column.disable?.form))
        .forEach(column => {
          this.entityFormRules[column.name] = {
            required: true,
            message: '未输入' + column.meta?.title,
            trigger: 'blur'
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
