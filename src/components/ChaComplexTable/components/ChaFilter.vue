<template>
  <div class="filter-container">
    <el-row :gutter="10">
      <!--  >>> 筛选项 Slot <<<  -->
      <slot name="filter-items" :collapse="collapse" :updateOffset="updateOffset"/>

      <!--   筛选项操作按钮   -->
      <el-col :span="4" :offset="offset" style="margin-top: 5px">
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
  inject: ['dataManager'],
  data () {
    return {
      collapse: true,
      offset: 20
    }
  },
  methods: {
    toggleCollapse () {
      this.collapse = !this.collapse
    },
    updateOffset (filterCol) {
      this.offset = 20 - filterCol
    },
    handleFilter () {
      this.dataManager.filter()
    },
    handleReset () {
      this.dataManager.reset()
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
