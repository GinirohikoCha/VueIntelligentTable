const FormComponents = require('@/components/ChaIntelligentTable/form-components')

export default (app) => {
  app.component('cha-text', FormComponents.ChaText)
  app.component('cha-select', FormComponents.ChaSelect)
  app.component('cha-number', FormComponents.ChaNumber)
  app.component('cha-text-area', FormComponents.ChaTextArea)
  app.component('cha-link', FormComponents.ChaLink)
  app.component('cha-color', FormComponents.ChaColor)
  app.component('cha-date', FormComponents.ChaDate)
  app.component('cha-boolean', FormComponents.ChaBoolean)
  app.component('cha-year', FormComponents.ChaYear)
  app.component('cha-cascader', FormComponents.ChaCascader)
  app.component('cha-date-time', FormComponents.ChaDateTime)
  app.component('cha-checkbox', FormComponents.ChaCheckbox)
}
