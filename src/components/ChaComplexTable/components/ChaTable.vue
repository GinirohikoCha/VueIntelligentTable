<template>
  <el-table
    ref="chaTable"
    class="cha-table"
    v-loading="loading"
    :data="displayData"
    :size="'small'"
    :max-height="tableHeight"
    :class="{ 'cha-table-fullScreen': fullScreen }"
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

  <el-pagination
    v-if="this.dataManager.pageMode !== 'disable'"
    :total="this.dataManager.total"
    v-model:current-page="current"
    v-model:page-size="size"
    layout="total, sizes, prev, pager, next, jumper"
    class="cha-table-pagination"
    :page-sizes="pageSizes"
    @size-change="handlePageChange"
    @current-change="handlePageChange"/>
</template>

<script>
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Edit, Delete } from '@element-plus/icons-vue'

export default {
  name: 'ChaTable',
  components: {
    Search,
    Edit,
    Delete
  },
  inject: ['dataManager', 'compManager'],
  data () {
    return {
      loading: false,
      fullScreen: false
    }
  },
  computed: {
    displayData () {
      return this.dataManager.displayData
    },
    current: {
      get () { return this.dataManager.page.current },
      set (newValue) { this.dataManager.page.current = newValue }
    },
    size: {
      get () { return this.dataManager.page.size },
      set (newValue) { this.dataManager.page.size = newValue }
    },
    pageSizes () {
      if (this.dataManager.total <= 100) {
        return [10, 20, 30, 40, 50, 100]
      }
      return [10, 20, 30, 40, 50, 100, this.dataManager.total]
    },
    tableHeight () {
      return 'calc(100vh)'
    },
    actionColumnWidth () {
      return 20 + 3 * 35
    }
  },
  methods: {
    refresh () {
      this.loading = true
      this.dataManager.refresh().then(() => {
        this.loading = false
      })
    },
    openFullScreen () {
      this.fullScreen = true
      ElMessage.info({ message: '按下ESC退出全屏' })
    },
    handleSelectionChange (selection) {
      this.dataManager.select(selection)
    },
    handleDetail (row) {
      this.dataManager.detail(row)
      this.compManager.openDetailDialog()
    },
    handleUpdate (row) {
      this.dataManager.edit(row)
      this.compManager.openUpdateDialog()
    },
    handleDelete (row) {
      ElMessageBox.confirm(
        '确认删除该数据？',
        '删除' + (row.name || row.id),
        { confirmButtonText: '确认', cancelButtonText: '取消', type: 'warning' }
      ).then(() => {
        this.dataManager.delete(row).then(response => {
          ElMessage.success(response.message || '操作成功')
          this.refresh()
        }).catch(error => {
          ElMessage.error(error.message)
        })
      })
    },
    handlePageChange () {
      this.loading = true
      this.dataManager.turnPage().then(response => {
        ElMessage.success(response.message)
        this.loading = false
      }).catch(error => {
        ElMessage.error(error.message)
      })
    }
  },
  mounted () {
    this.refresh()
    const that = this
    // 监听全屏按下ESC退出
    document.onkeydown = (e) => {
      if (e.key === 'Escape') { that.fullScreen = false }
    }
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
