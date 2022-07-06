<template>
  <div class="cha-action-bar-container">
    <div class="action-button-container">
      <el-space>
        <el-button type="primary" size="small" @click="handleCreate">
          <el-icon class="el-icon--left"><plus/></el-icon>{{ `添加${entityDisplayName ?? '数据'}` }}
        </el-button>
        <el-button type="primary" size="small" @click="handleExport">
          <el-icon class="el-icon--left"><files/></el-icon>{{ '全部导出' }}
        </el-button>
        <transition-group name="fade">
          <el-button v-if="hasSelection" type="primary" size="small" @click="handleExportBatch">
            <el-icon class="el-icon--left"><files/></el-icon>{{ `批量导出 ${selection.length} 项` }}
          </el-button>
          <el-button v-if="hasSelection" type="primary" size="small" @click="visible=true">
            <el-icon class="el-icon--left"><edit/></el-icon>{{ `批量修改 ${selection.length} 项` }}
          </el-button>
          <el-button v-if="hasSelection" type="danger" size="small" @click="handleDeleteBatch">
            <el-icon class="el-icon--left"><delete/></el-icon>{{ `批量删除 ${selection.length} 项` }}
          </el-button>
          <slot name="action-bar-addon-batch" :display="hasSelection"></slot>
        </transition-group>
      </el-space>
    </div>

    <div class="action-tool-container">
      <el-space>
        <el-tooltip content="刷新">
          <div>
            <el-icon style="width: 20px; height: 20px"><refresh class="refresh" @click="handleRefresh"/></el-icon>
          </div>
        </el-tooltip>
        <el-tooltip content="全屏">
          <div>
            <el-icon style="width: 20px; height: 20px"><full-screen @click="handleFullScreen"/></el-icon>
          </div>
        </el-tooltip>
        <el-tooltip content="下载导入模板">
          <div>
            <el-icon style="width: 20px; height: 20px"><download @click="handleDownloadTemplate"/></el-icon>
          </div>
        </el-tooltip>
<!--        <el-popover-->
<!--          placement="bottom"-->
<!--          trigger="hover"-->
<!--          title="列项开关">-->
<!--          <template #reference>-->
<!--            <div>-->
<!--              <el-icon style="width: 20px; height: 20px"><operation/></el-icon>-->
<!--            </div>-->
<!--          </template>-->
<!--          <template #default>-->
<!--            <cha-column-operation-panel-->
<!--              v-model:table-display="modelTableDisplay"/>-->
<!--          </template>-->
<!--        </el-popover>-->
<!--        <el-tooltip content="设置">-->
<!--          <div>-->
<!--            <el-icon style="width: 20px; height: 20px"><set-up @click="handleSetUp"/></el-icon>-->
<!--          </div>-->
<!--        </el-tooltip>-->
      </el-space>
    </div>
  </div>
</template>

<script>
import { Plus, Files, Edit, Delete, Refresh, Download, FullScreen } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

export default {
  name: 'ChaActionBar',
  components: {
    Plus,
    Files,
    Edit,
    Delete,
    Refresh,
    // Operation,
    // SetUp,
    Download,
    FullScreen
  },
  inject: ['dataManager', 'compManager'],
  props: {
    entityDisplayName: String
  },
  computed: {
    selection () {
      return this.dataManager.selection
    },
    hasSelection () {
      return this.selection.length > 0
    }
  },
  methods: {
    handleRefresh () {
      this.compManager.refresh()
    },
    handleFullScreen () {
      this.compManager.fullScreen()
    },
    handleCreate () {
      this.compManager.openCreateDialog()
    },
    handleExport () {
      this.compManager.export('all')
    },
    handleExportBatch () {
      this.compManager.export('selection')
    },
    handleDeleteBatch () {
      ElMessageBox.confirm(
        `确认删除这 ${this.selection.length} 项数据？`,
        { confirmButtonText: '确认', cancelButtonText: '取消', type: 'warning' }
      ).then(() => {
        this.dataManager.deleteBatch(this.selection).then(response => {
          ElMessage.success(response.message || '操作成功')
          this.handleRefresh()
        }).catch(error => {
          ElMessage.error(error.message)
        })
      })
    },
    handleDownloadTemplate () {
      this.compManager.export('template')
    }
  }
}
</script>

<style lang="scss" scoped>
.cha-action-bar-container {
  position: relative;
  margin: 8px 0;
  height: 32px;

  .action-button-container {
    position: absolute;
    height: 32px;
    left: 0;
  }

  .action-tool-container {
    position: absolute;
    right: 0;
    height: 20px;
    padding: 6px 0;

    svg {
      width: 20px;
      height: 20px;
      color: #606266;
      cursor: pointer;
      transition: transform 0.3s;
    }

    svg:hover {
      transform: scale(1.2);
    }

    svg.refresh:hover {
      transform: scale(1.2) rotate(180deg);
    }
  }
}

.dialog-footer {
  margin-top: 10px;
  text-align: right;
}
</style>
