import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'

// mock
import './mock'

// style
import './style/index.scss'

// ChaIntelligentTable
import installChaFormComponents from '@/plugins/cha-form-components'

const app = createApp(App)
installElementPlus(app)
installChaFormComponents(app)
app.use(store).use(router).mount('#app')
