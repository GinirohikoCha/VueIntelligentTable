<template>
  <el-col :span="4" v-for="filterItem in filterItemsRender" :key="filterItem.name" style="margin-top: 5px">
    <component
      style="width: 100%;"
      :is="filterItem.type"
      :form="filterItem"
      :type="'Filter'"
      v-model="query[filterItem.name].value"
      v-model:meta="filterItem.meta"
      v-model:select-options="modelSelectOptions"/>
  </el-col>
</template>

<script>
export default {
  name: 'ChaFilterItems',
  props: {
    collapse: Boolean,
    enableCollapse: Function,
    updateOffset: Function,
    updateQuery: Function,
    setResetMethod: Function,
    selectOptions: Object
  },
  inject: ['entityForm'],
  emits: {
    'update:selectOptions': null
  },
  data () {
    return {
      filterItemsRender: [],
      query: {}
    }
  },
  computed: {
    filterItems () {
      return this.entityForm.filter(column => !(column.disable?.all || column.disable?.filter) && column.filter?.type)
    },
    modelSelectOptions: {
      get () { return this.selectOptions },
      set (newValue) { this.$emit('update:selectOptions', newValue) }
    }
  },
  watch: {
    collapse () {
      this.refreshRender()
      this.updateOffset(this.filterItemsRender.length * 4 % 24)
    },
    query: {
      handler (newValue) {
        this.updateQuery(newValue)
      },
      deep: true
    }
  },
  mounted () {
    // ISSUE 在mounted阶段进行init会导致modelQuery[filterItem.name].value会产生undefined错误
    this.initQuery()
    // FIX 目前通过冗余render数组解决
    this.refreshRender()
    // 初始化offset
    this.updateOffset(this.filterItemsRender.length * 4 % 24)
    // 初始化reset方法
    this.setResetMethod(this.reset)
  },
  methods: {
    reset () {
      for (const column of Object.keys(this.query)) {
        this.query[column].value = null
      }
    },
    /** 生成查询筛选条件 */
    initQuery () {
      this.filterItems.forEach(column => {
        if (!this.query[column.name]) {
          this.query[column.name] = {
            relation: column.filter.type,
            value: null
          }
        }
      })
    },
    refreshRender () {
      let hideCount = 0
      // 重新渲染数组
      this.filterItemsRender = []
      this.filterItems.forEach(item => {
        if (!item.filter?.hide || !this.collapse) {
          this.filterItemsRender.push(item)
        } else {
          hideCount += 1
        }
      })
      // 启用collapse
      if (hideCount > 0) {
        this.enableCollapse(true)
      }
    }
  }
}
</script>

<style scoped>
</style>
