<template>
  <cha-complex-table :entity-name="'Test'"/>
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
