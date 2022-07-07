<template>
  <el-dialog
    custom-class="cha-detail-dialog"
    v-model="visible"
    :title="'详情'">
    <!--  >>> 详情项 Slot <<<  -->
    <slot name="detail-items" :entityData="this.dataManager.detailData" :visible="visible" :close="closeDialog"/>
  </el-dialog>
</template>

<script>
export default {
  name: 'ChaDetailDialog',
  inject: ['dataManager'],
  data () {
    return {
      visible: false
    }
  },
  methods: {
    openDialog () {
      this.visible = true
    },
    closeDialog () {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.cha-detail-dialog {

  .el-dialog__body {
    padding-top: 0;
  }
}
</style>
