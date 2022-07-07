<template>
  <div class="filter-container">
    <el-row :gutter="10">
      <!--  >>> 筛选项 Slot <<<  -->
      <slot
        name="filter-items"
        :collapse="collapse"
        :enableCollapse="enableCollapse"
        :updateOffset="updateOffset"
        :updateQuery="updateQuery"
        :setResetMethod="setResetMethod"/>

      <!--   筛选项操作按钮   -->
      <el-col v-if="collapseOn" :span="4" :offset="offset" style="margin-top: 5px">
        <el-button class="filter-button" :size="'small'" @click="handleReset">
          <el-icon class="el-icon--left"><RefreshLeft /></el-icon>{{ '重置' }}
        </el-button>
        <el-button class="filter-button" :size="'small'" type="primary" @click="handleFilter">
          <el-icon class="el-icon--left"><Search /></el-icon>{{ '查询' }}
        </el-button>
        <el-button class="filter-button" :size="'small'" type="primary" text @click="toggleCollapse">
          <el-icon class="el-icon--left"><component :is="collapse ? 'ArrowDown' : 'ArrowUp'" /></el-icon>
          {{ collapse ? '展开' : '收起' }}
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Search, RefreshLeft, ArrowUp, ArrowDown } from '@element-plus/icons-vue'

export default {
  name: 'ChaFilter',
  components: {
    Search,
    RefreshLeft,
    ArrowUp,
    ArrowDown
  },
  inject: ['dataManager', 'compManager'],
  data () {
    return {
      collapse: true,
      collapseOn: false,
      offset: 20,
      query: {},
      reset: undefined
    }
  },
  methods: {
    toggleCollapse () {
      this.collapse = !this.collapse
    },
    enableCollapse (bool) {
      this.collapseOn = bool
    },
    updateOffset (filterCol) {
      this.offset = 20 - filterCol
    },
    updateQuery (query) {
      this.query = query
    },
    setResetMethod (reset) {
      this.reset = reset
    },
    handleFilter () {
      this.dataManager.filter(this.query)
      this.compManager.refresh()
    },
    handleReset () {
      if (this.reset) {
        this.reset()
      }
      this.dataManager.reset()
      this.compManager.refresh()
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-container {

  .filter-button {
    float: right;
    margin-left: 10px;
    margin-top: 4px;
  }
}
</style>
