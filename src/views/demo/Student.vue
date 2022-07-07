<template>
  <div style="margin: 0 200px">
    <cha-complex-table
      v-model:display-columns="displayColumns"
      :entity-name="'student'"
      :entity-display-name="'学生'"
      :export-file-name="'学生数据'"
      :export-header="{ id: 'ID', name: '名称', age: '年龄', gender: '性别' }"
      :export-options="{ gender: [{ label: '女', value: 0 }, { label: '男', value: 1 }] }">
      <template #filter-items="{ collapse, updateOffset, updateQuery, setResetMethod }">
        <filter-items
          :collapse="collapse"
          :updateOffset="updateOffset"
          :updateQuery="updateQuery"
          :setResetMethod="setResetMethod"/>
      </template>

      <template #table-columns>
        <el-table-column v-if="displayColumns.id.value" label="id" prop="id"></el-table-column>
        <el-table-column v-if="displayColumns.name.value" label="姓名" prop="name"></el-table-column>
        <el-table-column v-if="displayColumns.age.value" label="年龄" prop="age"></el-table-column>
        <el-table-column v-if="displayColumns.gender.value" label="性别" prop="gender">
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
              v-for="item in [{ label: '女', value: 0 }, { label: '男', value: 1 }]"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-form-item>
      </template>
    </cha-complex-table>
  </div>
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
  },
  data () {
    return {
      displayColumns: {
        id: { label: 'ID', value: true },
        name: { label: '姓名', value: true },
        age: { label: '年龄', value: true },
        gender: { label: '性别', value: true }
      }
    }
  }
}
</script>

<style scoped>

</style>
