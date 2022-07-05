export class CompManager {
  filter
  actionBar
  table
  detailDialog

  setComps (filter, actionBar, table, detailDialog) {
    this.filter = filter
    this.actionBar = actionBar
    this.table = table
    this.detailDialog = detailDialog
  }

  refresh () {
    if (this.table) {
      this.table.refresh()
    }
  }

  openDetailDialog () {
    if (this.detailDialog) {
      this.detailDialog.openDialog()
    }
  }
}
