<template>
  <el-col :span="4"><el-input placeholder="ID" v-model="query.id.value"/></el-col>
  <el-col :span="4"><el-input placeholder="姓名" v-model="query.name.value"/></el-col>
  <el-col :span="4" v-if="!collapse"><el-input placeholder="年龄" v-model="query.age.value"/></el-col>
  <el-col :span="4" v-if="!collapse">
    <el-select  placeholder="性别" v-model="query.gender.value">
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
    updateOffset: Function,
    updateQuery: Function,
    setResetMethod: Function
  },
  watch: {
    collapse (newValue) {
      this.setOffset(newValue)
    }
  },
  data () {
    return {
      query: {
        id: {
          relation: 'like',
          value: null
        },
        name: {
          relation: 'like',
          value: null
        },
        age: {
          relation: 'eq',
          value: null
        },
        gender: {
          relation: 'eq',
          value: null
        }
      }
    }
  },
  mounted () {
    this.setOffset(this.collapse)
    this.updateQuery(this.query)
    this.setResetMethod(this.reset)
  },
  methods: {
    setOffset (collapse) {
      if (collapse) {
        this.updateOffset(8)
      } else {
        this.updateOffset(16)
      }
    },
    reset () {
      this.query = {
        id: {
          relation: 'like',
          value: null
        },
        name: {
          relation: 'like',
          value: null
        },
        age: {
          relation: 'eq',
          value: null
        },
        gender: {
          relation: 'eq',
          value: null
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
