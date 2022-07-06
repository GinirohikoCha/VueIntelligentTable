export class CompManager {
  filter
  actionBar
  table
  detailDialog
  formDialog

  setComps (filter, actionBar, table, detailDialog, formDialog) {
    this.filter = filter
    this.actionBar = actionBar
    this.table = table
    this.detailDialog = detailDialog
    this.formDialog = formDialog
  }

  refresh () {
    if (this.table) {
      this.table.refresh()
    }
  }

  fullScreen () {
    if (this.table) {
      this.table.openFullScreen()
    }
  }

  openDetailDialog () {
    if (this.detailDialog) {
      this.detailDialog.openDialog()
    }
  }

  openCreateDialog () {
    if (this.formDialog) {
      this.formDialog.openDialog('create')
    }
  }

  openUpdateDialog () {
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
