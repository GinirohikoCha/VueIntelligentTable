import _ from 'lodash'
const Mock = require('mockjs')

const data = Mock.mock({
  'items|100': [
    {
      id: '@id',
      name: '@name',
      age: '@natural(18, 25)',
      gender: '@natural(0, 1)'
    }
  ]
})

Mock.mock(/mock\/student\/list/, 'post', (request) => {
  const queryBody = JSON.parse(request.body)
  console.debug('[Mock.mock:mock/student/list]')
  console.debug(queryBody)
  const query = queryBody.query
  const page = queryBody.page
  const sort = queryBody.sort
  let records = JSON.parse(JSON.stringify(data.items))
  if (sort && sort.prop && sort.direct) {
    records.sort((a, b) => {
      const key = sort.prop
      const order = sort.direct === 'ascending' ? 1 : -1
      if (a[key] > b[key]) {
        return order
      } else if (a[key] < b[key]) {
        return -1 * order
      } else {
        return 0
      }
    })
  }
  // 筛选模拟数据
  if (query) {
    for (const column in query) {
      if (query[column].value !== null && query[column].value !== '') {
        if (query[column].relation === 'eq') {
          records = records.filter(item => item[column] === parseInt(query[column].value))
        } else if (query[column].relation === 'like') {
          records = records.filter(item => item[column].match(query[column].value))
        }
      }
    }
  }

  return {
    code: 200,
    message: '查询成功',
    data: {
      total: records.length,
      items: page ? records.splice(page.size * (page.current - 1), page.size) : records
    }
  }
})

Mock.mock(/mock\/student\/*/, 'get', (request) => {
  console.debug('[Mock.mock:mock/student/{id}]')
  console.debug(request)
  const id = request.url.substring(request.url.lastIndexOf('/') + 1)

  return {
    code: 200,
    message: '操作成功',
    data: data.items.find(item => item.id === id)
  }
})

Mock.mock(/mock\/student\/create/, 'post', (request) => {
  console.debug('[Mock.mock:mock/student/create]')
  console.debug(request)
  const student = JSON.parse(request.body)
  student.id = Mock.mock('@id')
  data.items.push(student)

  return { code: 200, message: '添加成功' }
})

Mock.mock(/mock\/student\/update/, 'put', (request) => {
  const students = JSON.parse(request.body)
  console.debug('[Mock.mock:mock/student/update]')
  console.debug(students)
  for (const student of students) {
    const index = data.items.findIndex(item => item.id === student.id)
    if (index >= 0) {
      _.assign(data.items[index], student)
    } else {
      console.error(student.id, index)
    }
  }

  return { code: 200, message: '操作成功' }
})

Mock.mock(/mock\/student\/delete/, 'delete', (request) => {
  const ids = JSON.parse(request.body)
  console.debug('[Mock.mock:mock/student/delete]')
  console.debug(ids)
  for (const id of ids) {
    const index = data.items.findIndex(item => item.id === id)
    if (index >= 0) {
      data.items.splice(index, 1)
    } else {
      console.error(id, index)
      return { code: 400, message: '发生错误' }
    }
  }

  return { code: 200, message: '操作成功' }
})
