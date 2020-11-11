import authMethods from '../api/auth'
export default {
    namespaced: true,

    state: {
        authenticated: false,
        user: null,
        loading: false,
        wrongCredintals: false
    },

    getters: {
        authenticated(state) {
            return state.authenticated
        },

        user(state) {
            return state.user
        },
        loading(state) {
            return state.loading
        },
        wrongCredintals(state) {
            return state.wrongCredintals
        }
    },

    mutations: {
        SET_AUTHENTICATED(state, value) {
            state.authenticated = value
        },

        SET_USER(state, value) {
            state.user = value
        },
        SET_LOADING(state, value) {
            state.loading = value
        },
        SET_WRONG_CREDINTALS(state, value) {
            state.wrongCredintals = value
        }

    },

    actions: {
        async signIn({ dispatch, commit }, credentials) {
            commit('SET_LOADING', true)
            authMethods.signIn(credentials).then(() => {
                dispatch('getProfile')

            }).catch(() => {
                commit('SET_WRONG_CREDINTALS', true)
                commit('SET_LOADING', false)
            })

        },
        async signOut({ commit }) {
            authMethods.signOut().then(() => {
                commit('SET_AUTHENTICATED', false)
                commit('SET_USER', null)
            })

        },
        getProfile({ commit }) {
            authMethods.getProfile().then((response) => {
                commit('SET_AUTHENTICATED', true)
                commit('SET_USER', response.data)
                commit('SET_LOADING', false)
                commit('SET_WRONG_CREDINTALS', false)

            })
        }
    }
}