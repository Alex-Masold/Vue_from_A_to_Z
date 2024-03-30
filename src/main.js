import './style.css'
import 'vuetify/styles'

import { createApp } from 'vue'
import { createVuetify } from 'vuetify'

import App from './App.vue'
import store from './store'
import router from './router/index'
import components from '/src/components/UI'
import directives from './directives'

const vuetify = createVuetify({})

const app = createApp(App);
// console.log(components);
components.forEach(component => {
    app.component(component.name, component)
});

directives.forEach(directive => {
    app.directive(directive.name, directive)
})

app
    .use(vuetify)
    .use(store)
    .use(router)
    .mount('#app')