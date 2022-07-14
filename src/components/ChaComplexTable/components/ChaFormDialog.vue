<template>
  <el-dialog
    v-model="visible"
    :title="dialogTitle"
    :width="dialogWidth">
    <el-form ref="form" :model="entityData" :rules="entityFormRules" :label-width="labelWidth">
      <!--  >>> 表单项 Slot <<<  -->
      <slot name="form-items" :entityData="entityData"></slot>
    </el-form>
    <template #footer>
      <!--  >>> 底部操作 Slot <<<  -->
      <slot name="dialog-footer">
        <!--  >>> 默认操作 <<<  -->
        <div class="dialog-footer">
          <el-button @click="visible = false">{{ '取消' }}</el-button>
          <el-button type="primary" @click="type==='create'?createData():updateData()">{{ '确认' }}</el-button>
        </div>
      </slot>
    </template>
  </el-dialog>
</template>

<script>
import { ElMessage } from 'element-plus'

export default {
  name: 'ChaFormDialog',
  props: {
    entityDisplayName: String,
    entityFormRules: Object
  },
  emits: {
    create: null,
    update: null
  },
  inject: ['dataManager', 'compManager', 'settingManager'],
  data () {
    return {
      visible: false,
      type: 'create' // create | update
    }
  },
  computed: {
    entityData () {
      switch (this.type) {
        default:
        case 'create':
          return this.dataManager.createData
        case 'update':
          return this.dataManager.updateData
      }
    },
    dialogTitle () {
      switch (this.type) {
        default:
        case 'create':
          return '添加' + this.entityDisplayName
        case 'update':
          return '编辑' + this.entityDisplayName
      }
    },
    labelWidth () {
      return this.settingManager.settings.form.labelWidth
    },
    dialogWidth () {
      return this.settingManager.settings.form.dialogWidth
    }
  },
  methods: {
    openDialog (type) {
      switch (type) {
        default: // create | update, default is create
        case 'create':
          if (this.type !== 'create') {
            this.type = type
          }
          break
        case 'update':
          this.type = type
          break
      }
      this.visible = true
      // * clearValidate must after visible set true
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
    },
    createData () {
      if (this.entityFormRules) {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.create()
          } else {
            ElMessage.error('表单验证失败')
          }
        })
      } else {
        this.create()
      }
    },
    updateData () {
      if (this.entityFormRules) {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.update()
          } else {
            ElMessage.error('表单验证失败')
          }
        })
      } else {
        this.update()
      }
    },
    create () {
      this.dataManager.create(this.entityData).then(response => {
        this.compManager.refresh()
        ElMessage.success(response.message)
        this.visible = false
      }).catch(error => {
        ElMessage.error(error.message)
      })
    },
    update () {
      this.dataManager.update(this.entityData).then(response => {
        this.compManager.refresh()
        ElMessage.success(response.message)
        this.visible = false
      }).catch(error => {
        ElMessage.error(error.message)
      })
    }
  }
}
</script>

<style scoped>

</style>
