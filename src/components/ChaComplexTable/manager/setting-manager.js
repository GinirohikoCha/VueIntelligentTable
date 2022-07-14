import _ from 'lodash'

const DEFAULT_SETTINGS = {
  general: {
    filter: true,
    detail: true,
    form: true,
    create: true,
    update: true,
    delete: true,
    import: true,
    export: true
  },
  table: {
    selectable: true,
    resultMessage: true
  },
  form: {
    labelWidth: '80px',
    dialogWidth: '50%'
  }
}

export class SettingManager {
  settings

  constructor (settings) {
    this.settings = _.defaultsDeep(settings, DEFAULT_SETTINGS)
  }
}
