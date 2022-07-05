<template>
  <cha-complex-table :entity-name="'student'">
    <template #table-columns>
      <el-table-column label="id" prop="id"></el-table-column>
      <el-table-column label="name" prop="name"></el-table-column>
      <el-table-column label="age" prop="age"></el-table-column>
      <el-table-column label="gender" prop="gender">
        <template #default="scope">
          {{ ['女', '男'][scope.row.gender] }}
        </template>
      </el-table-column>
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
