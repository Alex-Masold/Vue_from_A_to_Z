import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import App from './App.vue'
import router from './router/index'
import './style.css'
import 'vuetify/styles'

import components from '/src/components/UI'

const vuetify = createVuetify({
})


const app = createApp(App);
// console.log(components);
components.forEach(component => {
    app.component(component.name, component)
});
app
    .use(vuetify)
    .use(router)
    .mount('#app')