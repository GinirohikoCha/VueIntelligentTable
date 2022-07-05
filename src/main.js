import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'

// mock
import './mock'

// style
import './style/index.scss'

const app = createApp(App)
installElementPlus(app)
app.use(store).use(router).mount('#app')
