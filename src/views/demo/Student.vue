<template>
  <cha-complex-table :entity-name="'student'" :entity-display-name="'学生'">
    <template #filter-items="{ collapse, updateOffset, updateQuery, setResetMethod }">
      <filter-items
        :collapse="collapse"
        :updateOffset="updateOffset"
        :updateQuery="updateQuery"
        :setResetMethod="setResetMethod"/>
    </template>

    <template #table-columns>
      <el-table-column label="id" prop="id"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="年龄" prop="age"></el-table-column>
      <el-table-column label="性别" prop="gender">
        <template #default="scope">
          {{ ['女', '男'][scope.row.gender] }}
        </template>
      </el-table-column>
    </template>

    <template #detail-dialog-items="{ entityData }">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="ID">{{ entityData.id }}</el-descriptions-item>
        <el-descriptions-item label="姓名">{{ entityData.name }}</el-descriptions-item>
        <el-descriptions-item label="年龄">{{ entityData.age }}</el-descriptions-item>
        <el-descriptions-item label="性别">{{ ['女', '男'][entityData.gender] }}</el-descriptions-item>
      </el-descriptions>
    </template>

    <template #form-dialog-items="{ entityFormData }">
      <el-form-item label="姓名"><el-input v-model="entityFormData.name"/></el-form-item>
      <el-form-item label="年龄"><el-input v-model="entityFormData.age"/></el-form-item>
      <el-form-item label="性别">
        <el-select v-model="entityFormData.gender">
          <el-option
            v-for="item in [{ label: '女', value: 0}, { label: '男', value: 1}]"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </el-form-item>
    </template>
  </cha-complex-table>
</template>

<script>
import ChaComplexTable from '@/components/ChaComplexTable'
import FilterItems from '@/views/demo/FilterItems'

export default {
  name: 'Demo',
  components: {
    ChaComplexTable,
    FilterItems
  },
  props: {
    ChaComplexTable
  }
}
</script>

<style scoped>

</style>
