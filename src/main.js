import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import 'vuetify/styles'

import components from '/src/components/UI'

import { createVuetify } from 'vuetify'

const vuetify = createVuetify({
})


const app = createApp(App);
// console.log(components);
components.forEach(component => {
    app.component(component.name, component)
});
app.use(vuetify).mount('#app')