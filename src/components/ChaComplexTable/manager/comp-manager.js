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

  openDetailDialog () {
    if (this.detailAction) {
      this.detailAction()
      return
    }
    if (this.detailDialog) {
      this.detailDialog.openDialog()
    }
  }

  openCreateDialog () {
    if (this.createAction) {
      this.createAction()
      return
    }
    if (this.formDialog) {
      this.formDialog.openDialog('create')
    }
  }

  openUpdateDialog () {
    if (this.editAction) {
      this.editAction()
      return
    }
    if (this.formDialog) {
      this.formDialog.openDialog('update')
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
