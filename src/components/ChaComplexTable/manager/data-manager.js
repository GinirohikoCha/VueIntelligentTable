import { detail, list } from '../api'

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

  detail (entity) {
    return new Promise((resolve) => {
      this.detailData = entity
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
}

export class LocalDataManager extends DataManager {
  detail (entity) {
    this.detailData = entity
  }
}
