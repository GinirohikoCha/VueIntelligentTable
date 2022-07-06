import { create, updateBatch, deleteBatch, detail, list } from '../api'
import _ from 'lodash'

export class DataManager {
  /**
   * 原始数据
   * @type {Array}
   */
  data = []

  /**
   * 数据总数（远程模式时为服务器可查询到的所有数据）
   * @type {number}
   */
  total = 0

  /**
   * 选取的数据
   * @type {Array}
   */
  selection = []

  /**
   * 详情数据
   * @type {Object}
   */
  detailData = {}

  /**
   * 创建数据内容
   * @type {Object}
   * */
  createData = {}

  /**
   * 编辑数据内容
   * @type {Object}
   * */
  updateData = {}

  /**
   * 编辑数据所在列表序号
   * @type {number}
   * */
  editIndex = -1

  refresh () {
    return new Promise((resolve) => {
      resolve()
    })
  }

  filter () {
    console.log('filter')
  }

  reset () {
    console.log('reset')
  }

  select (selection) {
    this.selection = selection
  }

  edit (entity) {
    this.editIndex = this.data.indexOf(entity)
    this.updateData = _.cloneDeep(entity)
  }

  detail (entity) {
    return new Promise((resolve) => {
      this.detailData = entity
      resolve()
    })
  }

  create (entity) {
    return new Promise(resolve => {
      this.data.push(entity)
      this.createData = {}
      resolve()
    })
  }

  update (entity) {
    return new Promise(resolve => {
      _.assign(this.data[this.editIndex], entity)
      this.editIndex = -1
      this.updateData = {}
      resolve()
    })
  }

  delete (entity) {
    return new Promise((resolve) => {
      const index = this.data.indexOf(entity)
      this.data.splice(index, 1)
      resolve()
    })
  }

  deleteBatch (entities) {
    return new Promise((resolve) => {
      for (const entity of entities) {
        this.delete(entity).then(() => {})
      }
      resolve()
    })
  }
}

export class RemoteDataManager extends DataManager {
  /**
   * 访问路径组成部分
   * @type {string}
   */
  entityName

  constructor (entityName) {
    super()
    this.entityName = entityName
  }

  refresh () {
    return new Promise((resolve, reject) => {
      list(this.entityName, {}).then(response => {
        this.data = response.data.items
        this.total = response.data.total
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }

  detail (entity) {
    this.detailData = entity
    return new Promise((resolve, reject) => {
      detail(this.entityName, entity.id).then(response => {
        this.detailData = response.data
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }

  create (entity) {
    return new Promise((resolve, reject) => {
      create(this.entityName, entity).then(response => {
        this.createData = {}
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }

  update (entity) {
    return new Promise((resolve, reject) => {
      updateBatch(this.entityName, [entity]).then(response => {
        this.editIndex = -1
        this.updateData = {}
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }

  delete (entity) {
    return new Promise((resolve, reject) => {
      deleteBatch(this.entityName, [entity.id]).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }

  deleteBatch (entities) {
    return new Promise((resolve, reject) => {
      const ids = entities.map(item => { return item.id })
      deleteBatch(this.entityName, ids).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export class LocalDataManager extends DataManager {
}
