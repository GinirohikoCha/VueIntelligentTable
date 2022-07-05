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
}
