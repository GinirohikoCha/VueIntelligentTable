<template>
  <el-table-column
    v-for="tableColumn in displayTableColumns"
    :show-overflow-tooltip="true"
    :key="tableColumn.name"
    :prop="tableColumn.name"
    :label="tableColumn.meta?.title"
    :width="tableColumn.meta?.width"
    :sortable="tableColumn.meta?.sortable"
    :filters="filters[tableColumn.name]"
    :filter-method="getFilterMethod(tableColumn)">
    <template v-slot="{row}">
      <component
        :is="tableColumn.type"
        v-model="row[tableColumn.name]"
        v-model:meta="tableColumn.meta"
        v-model:select-options="modelSelectOptions"
        :form="tableColumn"
        :form-data="row"
        :type="'Table'"/>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: 'ChaTableColumns',
  inject: ['entityForm'],
  props: {
    pageMode: String,
    displayColumns: Object,
    selectOptions: Object
  },
  emits: {
    'update:selectOptions': null
  },
  computed: {
    modelSelectOptions: {
      get () { return this.selectOptions },
      set (newValue) { this.$emit('update:selectOptions', newValue) }
    }
  },
  watch: {
    displayColumns: {
      handler () {
        this.displayTableColumns = []
        for (const name of Object.keys(this.displayColumns)) {
          if (this.displayColumns[name].value) {
            const column = this.entityForm.find(form => form.name === name)
            // 非远程换页模式，添加表格筛选项
            // TODO 本地 filters 不再远程获取，选项仅为表格中有的数据
            if (this.pageMode !== 'remote') {
              if (column.meta?.filters) {
                this.filters[name] = column.meta?.filters.map(item => { return { text: item.label, value: item.value } })
              } else if (column.meta.link) {
                this.filters[name] = []
              }
            }
            this.displayTableColumns.push(column)
          }
        }
      },
      deep: true
    },
    selectOptions: {
      handler (newValue) {
        for (const name of Object.keys(newValue)) {
          if (this.filters[name] && this.filters[name].length === 0) {
            newValue[name].forEach(item => {
              const form = this.entityForm.find(form => form.name === name)
              this.filters[name].push(...this.flattenCascader(form.meta.checkStrictly, item))
            })
          }
        }
      },
      deep: true
    }
  },
  data () {
    return {
      displayTableColumns: [],
      filters: {}
    }
  },
  methods: {
    flattenCascader (checkStrictly, item, parentText) {
      const array = []
      if (item.children) {
        if (checkStrictly) {
          array.push({ text: parentText ? parentText + '/' + item.label : item.label, value: item.value })
        }
        item.children.forEach(child => {
          array.push(...this.flattenCascader(checkStrictly, child, parentText ? parentText + '/' + item.label : item.label))
        })
        return array
      } else {
        return [{ text: parentText ? parentText + '/' + item.label : item.label, value: item.value }]
      }
    },
    getFilterMethod (tableColumn) {
      if (tableColumn.meta?.filterMethod) {
        return tableColumn.meta?.filterMethod
      }
      if (this.filters[tableColumn.name]) {
        return (value, row, column) => { return row[column.property] === value }
      } else {
        return null
      }
    }
  }
}
</script>

<style scoped>

</style>
