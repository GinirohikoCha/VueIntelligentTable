import { list } from '../api'

export class DataManager {
  entityName = null
  /**
   * 表格数据
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

  constructor (entityName) {
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

  filter () {
    console.log('filter')
  }

  reset () {
    console.log('reset')
  }

  select (selection) {
    this.selection = selection
  }
}
