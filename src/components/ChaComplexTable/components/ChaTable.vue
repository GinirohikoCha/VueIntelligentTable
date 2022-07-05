<template>
  <el-table
    ref="chaTable"
    class="cha-table"
    v-loading="loading"
    :data="dataManager.data"
    :size="'small'"
    border
    @selection-change="handleSelectionChange">
    <!--  >>> 序号列 Slot <<<  -->
    <slot name="table-index-column">
      <!--   默认序号列   -->
      <el-table-column type="index" align="center"/>
    </slot>

    <!--  >>> 选择列 Slot <<<  -->
    <slot name="table-selection-column">
      <!--   默认选项列   -->
      <el-table-column type="selection" align="center" width="35"/>
    </slot>

    <!--  >>> 表格数据列 Slot <<<  -->
    <slot name="table-columns"></slot>

    <!--  >>> 表格操作列 Slot <<<  -->
    <slot name="table-action-column">
      <!--   默认表格操作列   -->
      <el-table-column :fixed="'right'" :label="'操作'" align="center" :width="actionColumnWidth" class-name="small-padding fixed-width">
        <template v-slot="{row}">
          <el-button type="success" :size="'small'" @click="handleDetail(row)" style="min-width: 0">
            <el-icon><Search /></el-icon>
          </el-button>
          <el-button type="primary" :size="'small'" @click="handleUpdate(row)" style="min-width: 0">
            <el-icon><Edit /></el-icon>
          </el-button>
          <el-button type="danger" :size="'small'" @click="handleDelete(row)" style="min-width: 0">
            <el-icon><Delete /></el-icon>
          </el-button>
        </template>
      </el-table-column>
    </slot>
  </el-table>
</template>

<script>
import { Search, Edit, Delete } from '@element-plus/icons-vue'

export default {
  name: 'ChaTable',
  components: {
    Search,
    Edit,
    Delete
  },
  inject: ['dataManager'],
  data () {
    return {
      loading: false
    }
  },
  computed: {
    pageSize () {
      if (this.total <= 100) {
        return [10, 20, 30, 40, 50, 100]
      }
      return [10, 20, 30, 40, 50, 100, this.total]
    },
    actionColumnWidth () {
      return 20 + 3 * 35
    }
  },
  methods: {
    handleSelectionChange (selection) {
      this.dataManager.select(selection)
    }
  },
  mounted () {
    this.loading = true
    this.dataManager.refresh().then(() => {
      this.loading = false
    })
  }
}
</script>

<style lang="scss" scoped>
.cha-table {
  width: 100%;
}

.cha-table-fullScreen {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  z-index: 999;
}

.cha-table-pagination {
  margin-top: 10px;
}

.small-padding {

  .el-button+.el-button {
    margin-left: 5px;
  }
}

.fixed-width {

  .el-button--small {
    padding: 5px 7px;
    font-size: 14px;
  }
}
</style>
