<template>
  <cha-complex-table :entity-name="'student'" :entity-display-name="'学生'">
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
  </cha-complex-table>
</template>

<script>
import ChaComplexTable from '@/components/ChaComplexTable'

export default {
  name: 'Demo',
  components: { ChaComplexTable },
  props: {
    ChaComplexTable
  }
}
</script>

<style scoped>

</style>
