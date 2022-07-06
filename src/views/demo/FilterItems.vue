<template>
  <el-col :span="4"><el-input placeholder="ID"/></el-col>
  <el-col :span="4"><el-input placeholder="姓名"/></el-col>
  <el-col :span="4" v-if="!collapse"><el-input placeholder="年龄"/></el-col>
  <el-col :span="4" v-if="!collapse">
    <el-select  placeholder="性别">
      <el-option
        v-for="item in [{ label: '女', value: 0}, { label: '男', value: 1}]"
        :key="item.value"
        :label="item.label"
        :value="item.value"/>
    </el-select>
  </el-col>
</template>

<script>
export default {
  name: 'FilterItems',
  props: {
    collapse: Boolean,
    updateOffset: Function
  },
  watch: {
    collapse (newValue) {
      this.setOffset(newValue)
    }
  },
  methods: {
    setOffset (collapse) {
      if (collapse) {
        this.updateOffset(8)
      } else {
        this.updateOffset(16)
      }
    }
  },
  mounted () {
    this.setOffset(this.collapse)
  }
}
</script>

<style scoped>

</style>
