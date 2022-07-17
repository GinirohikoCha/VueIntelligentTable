export class CompManager {
  filter
  actionBar
  table
  detailDialog
  formDialog

  detailAction
  createAction

  setComps (filter, actionBar, table, detailDialog, formDialog) {
    this.filter = filter
    this.actionBar = actionBar
    this.table = table
    this.detailDialog = detailDialog
    this.formDialog = formDialog
  }

  setActions (detailAction, createAction, editAction) {
    this.detailAction = detailAction
    this.createAction = createAction
    this.editAction = editAction
  }

  refresh () {
    if (this.table) {
      this.table.refresh()
    }
  }

  select (rows) {
    if (this.table) {
      this.table.select(rows)
    }
  }

  fullScreen () {
    if (this.table) {
      this.table.openFullScreen()
    }
  }

  openDetailDialog (entity) {
    if (this.detailAction) {
      this.detailAction(entity)
      return false
    }
    if (this.detailDialog) {
      this.detailDialog.openDialog()
      return true
    }
  }

  openCreateDialog (entity) {
    if (this.createAction) {
      this.createAction(entity)
      return false
    }
    if (this.formDialog) {
      this.formDialog.openDialog('create')
      return true
    }
  }

  openUpdateDialog () {
    if (this.editAction) {
      this.editAction()
      return false
    }
    if (this.formDialog) {
      this.formDialog.openDialog('update')
      return true
    }
  }

  export (type) {
    switch (type) {
      default:
      case 'all':
        this.table.exportAll()
        break
      case 'selection':
        this.table.exportSelection()
        break
      case 'template':
        this.table.exportTemplate()
        break
    }
  }
}
