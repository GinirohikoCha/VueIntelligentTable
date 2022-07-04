<template>
  <div class="complex-table-container">
    <!--  条件筛选栏  -->
    <cha-filter
      ref="chaFilter">
      <!--   筛选项   -->
      <template #filter-items><slot name="filter-items"></slot></template>
    </cha-filter>
  </div>
</template>

<script>
import ChaFilter from './components/ChaFilter'

export default {
  name: 'ChaComplexTable',
  components: {
    ChaFilter
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
      size: 'small'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
