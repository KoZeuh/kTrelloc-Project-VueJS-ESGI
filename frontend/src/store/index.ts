import { createStore } from 'vuex';
import { createUser, getUser, loginUser, updateUser } from '@/services/userService';
import { getBoardsByUser } from '@/services/boardService';

import ErrorService from '@/services/errorService';

export default createStore({
    state: {
        user: null,
        token: localStorage.getItem('token') || '',
        locale: localStorage.getItem('locale') || 'en',
        error: ''
    },

    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setToken(state, token) {
            state.token = token;
            localStorage.setItem('token', token);
        },
        logout(state) {
            state.user = null;
            state.token = '';
            localStorage.removeItem('token');
        },
        setError(state, error) {
            state.error = error;
        },
        clearError(state) {
            state.error = '';
        },
        setLocale(state, locale) {
            state.locale = locale;
        },
    },

    actions: {
        async initializeStore({ dispatch, state }) {
            if (state.token) {
                try {
                    await dispatch('getUserProfile');
                } catch (error) {
                    dispatch('logout');
                }
            }
        },

        async loginUser({ commit, dispatch }, { email, password }) {
            try {
                const response = await loginUser({ email, password });

                commit('setToken', response.token);

                await dispatch('getUserProfile');

                document.location.href = '/dashboard';
            } catch (error) {
                commit('setError', ErrorService.getErrorMessage(error));
            }
        },

        async getUserProfile({ commit, state }) {
            try {
                const response = await getUser(state.token);
                commit('setUser', response.user);
            } catch (error) {
                commit('setError', ErrorService.getErrorMessage(error));
            }
        },

        async getBoardsByUser({ state }) {
            try {
                return await getBoardsByUser(state.token);
            } catch (error) {
                return [];
            }
        }
    },

    getters: {
        isAuthenticated(state) {
            return !!state.token;
        },
        getUser(state) {
            return state.user;
        },
        getToken(state) {
            return state.token;
        },
        getError(state) {
            return state.error;
        },
        getLocale(state) {
            return state.locale;
        }
    },
});
