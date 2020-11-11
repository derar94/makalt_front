import homeMethods from '../api/home'

export default {
    namespaced: true,

    state: {
        homeData: {},
        loading: false
    },

    getters: {
        homeData(state) {
            return state.homeData
        },
        loading(state) {
            return state.loading
        }
    },

    mutations: {

        SET_HOME_DATA(state, value) {
            state.homeData = value
        },
        SET_LOADING(state, value) {
            state.loading = value
        }

    },

    actions: {
        async getHomeContent({ commit }) {
            homeMethods.getHomeContent().then((response) => {
                commit('SET_LOADING', true)
                commit('SET_HOME_DATA', response.data)
                commit('SET_LOADING', false)

            })
        }
    }
}