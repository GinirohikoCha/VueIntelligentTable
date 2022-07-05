export class CompManager {
  filter
  table
  detailDialog

  setComps (filter, table, detailDialog) {
    this.filter = filter
    this.table = table
    this.detailDialog = detailDialog
  }

  openDetailDialog () {
    if (this.detailDialog) {
      this.detailDialog.openDialog()
    }
  }
}
