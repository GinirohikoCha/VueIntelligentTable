import { create, updateBatch, deleteBatch, detail, list } from '../api'
import { export2Excel } from '../export2Excel'
import _ from 'lodash'

export class DataManager {
  pageMode = 'remote'

  page = {
    current: 1,
    size: 20
  }

  query = {}

  /**
   * 原始数据
   * @type {Array}
   */
  data = []

  displayData = []

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

  crudListMethod
  crudDetailMethod
  crudCreateMethod
  crudUpdateMethod
  crudDeleteMethod

  constructor (pageMode) {
    this.pageMode = pageMode
  }

  setCrudMethods (list, detail, create, updateBatch, deleteBatch) {
    this.crudListMethod = list
    this.crudDetailMethod = detail
    this.crudCreateMethod = create
    this.crudUpdateMethod = updateBatch
    this.crudDeleteMethod = deleteBatch
  }

  sliceData (data) {
    return data.slice(
      (this.page.current - 1) * this.page.size, // 当前页首项
      this.page.current * this.page.size // 下一页首项
    )
  }

  turnPage () {
    return new Promise((resolve, reject) => {
      switch (this.pageMode) {
        default:
        case 'remote':
          this.refresh()
            .then(response => resolve(response))
            .catch(error => reject(error))
          break
        case 'local':
          this.displayData = this.sliceData(this.data)
          resolve()
          break
        case 'disable':
          this.displayData = this.data
          resolve()
          break
      }
    })
  }

  refresh () {
    return new Promise((resolve) => {
      switch (this.pageMode) {
        default:
        case 'remote':
        case 'disable':
          this.displayData = this.data
          break
        case 'local':
          this.displayData = this.sliceData(this.data)
          break
      }
      resolve()
    })
  }

  filter (query) {
    this.query = query
  }

  reset () {
    this.query = {}
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

  exportAll (fileName, header, options) {
    export2Excel(this.data, fileName, header, options)
  }

  exportSelection (fileName, header, options) {
    export2Excel(this.selection, fileName, header, options)
  }
}

export class RemoteDataManager extends DataManager {
  /**
   * 访问路径组成部分
   * @type {string}
   */
  entityName

  constructor (pageMode, entityName) {
    super(pageMode)
    this.entityName = entityName
  }

  refresh () {
    return new Promise((resolve, reject) => {
      const listMethod = this.crudListMethod || list

      listMethod(this.entityName, { page: this.page, query: this.query }).then(response => {
        this.data = response.data.items
        this.total = response.data.total
        switch (this.pageMode) {
          default:
          case 'remote':
          case 'disable':
            this.displayData = this.data
            break
          case 'local':
            this.displayData = this.sliceData(this.data)
            break
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }

  detail (entity) {
    const detailMethod = this.crudDetailMethod || detail
    this.detailData = entity

    return new Promise((resolve, reject) => {
      detailMethod(this.entityName, entity.id).then(response => {
        this.detailData = response.data
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }

  create (entity) {
    const createMethod = this.crudCreateMethod || create

    return new Promise((resolve, reject) => {
      createMethod(this.entityName, entity).then(response => {
        this.createData = {}
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }

  update (entity) {
    const updateMethod = this.crudUpdateMethod || updateBatch

    return new Promise((resolve, reject) => {
      updateMethod(this.entityName, [entity]).then(response => {
        this.editIndex = -1
        this.updateData = {}
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }

  delete (entity) {
    const deleteMethod = this.crudDeleteMethod || deleteBatch

    return new Promise((resolve, reject) => {
      deleteMethod(this.entityName, [entity.id]).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }

  deleteBatch (entities) {
    const deleteMethod = this.crudDeleteMethod || deleteBatch

    return new Promise((resolve, reject) => {
      const ids = entities.map(item => { return item.id })
      deleteMethod(this.entityName, ids).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export class LocalDataManager extends DataManager {
}
