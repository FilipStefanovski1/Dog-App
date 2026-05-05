import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import PrimeVue from 'primevue/config'

import App from './App.vue'
import router from './router'

import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primeicons/primeicons.css'
import './style.css'

const app = createApp(App)

app.use(router)
app.use(VueQueryPlugin)
app.use(PrimeVue)

app.mount('#app')
