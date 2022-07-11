import { createApp } from 'vue'
import App from './App.vue'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    if (["Upload", "UploadFilled"].includes(key)) {
        app.component(key, component)
    }
}

app.mount('#app')
