import XLSX from 'xlsx'
import FileSaver from 'file-saver'

export function export2Excel (data, filename, header, options) {
  console.log(data)
  if (data && data.length > 0) {
    // 获取header中不含有的key
    const dataKeys = Object.keys(data[0])
    const headerKeys = Object.keys(header)
    const deleteKeys = dataKeys.filter(dataKey => !headerKeys.find(headerKey => headerKey === dataKey))
    console.debug('[export2Excel:export2Excel:deleteKeys]' + deleteKeys)
    // 输出添加header，并删除data数据中header不含有的key
    const outputData = []
    data.forEach(item => {
      const newItem = Object.assign({}, item)
      deleteKeys.forEach(key => {
        delete newItem[key]
      })
      outputData.push(newItem)
    })
    // 对存在options的key进行过滤，如：0=>男，1=>女
    if (options) {
      console.debug('[export2Excel:export2Excel:options]')
      console.debug(options)
      Object.keys(options).forEach(key => {
        // 存在该options对应key
        if (outputData[0][key] !== undefined) {
          outputData.forEach(item => {
            if (item[key] !== undefined) {
              const option = options[key].find(option => option.value === item[key])
              if (option) {
                item[key] = option.label
              } else {
                console.warn('[export2Excel]无法找到key ' + key + ' : ' + item[key] + '的对应选项')
              }
            }
          })
        }
      })
    }
    console.debug('[export2Excel:export2Excel:outputData]')
    console.debug(outputData)
    // 开始生成excel表格
    exportFile([header, ...outputData], headerKeys, filename)
  }
}

export function exportTemplate (filename, header) {
  exportFile([header], Object.keys(header), filename)
}

function exportFile (exportData, headerKeys, filename) {
  const book = XLSX.utils.book_new()
  const bookSheet = XLSX.utils.json_to_sheet(exportData, { header: headerKeys, skipHeader: true })
  XLSX.utils.book_append_sheet(book, bookSheet)
  const bookOut = XLSX.write(book, { bookType: 'xlsx', bookSST: true, type: 'array' })
  // 调取浏览器文件下载
  try {
    FileSaver.saveAs(new Blob([bookOut], { type: 'application/octet-stream' }), filename + '.xlsx')
  } catch (e) {
    if (typeof console !== 'undefined') console.error(e, bookOut)
  }
}
