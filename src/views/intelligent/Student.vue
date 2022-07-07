<template>
  <div style="margin: 0 200px">
    <cha-intelligent-table
      :entity-name="'student'"
      :entity-display-name="'学生'"
      :entity-form="entityForm">
    </cha-intelligent-table>
  </div>
</template>

<script>
import ChaIntelligentTable from '@/components/ChaIntelligentTable'

export default {
  name: 'Demo',
  components: {
    ChaIntelligentTable
  },
  data () {
    return {
      entityForm: [{
        name: 'id',
        type: 'cha-text',
        required: true,
        filter: { type: 'like' },
        meta: {
          title: 'ID'
        }
      }, {
        name: 'name',
        type: 'cha-text',
        required: true,
        filter: { type: 'like' },
        meta: {
          title: '名称'
        }
      }, {
        name: 'age',
        type: 'cha-number',
        filter: { hide: true, type: 'eq' },
        meta: {
          title: '年龄'
        }
      }, {
        name: 'gender',
        type: 'cha-select',
        filter: { hide: true, type: 'eq' },
        meta: {
          title: '性别',
          options: [{ label: '女', value: 0 }, { label: '男', value: 1 }]
        }
      }]
    }
  }
}
</script>

<style scoped>

</style>
