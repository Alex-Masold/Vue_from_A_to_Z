import { createStore } from "vuex";


export default createStore({
    state: {
        isAuthorized: false,
    },
    getters: {

    },
    mutations: {
        setAuth(state) {
            state.isAuthorized = !state.isAuthorized
        }
    },
    actions: {

    }
})