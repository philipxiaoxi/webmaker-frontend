'use strict'

import Vue from 'vue'
import axios from 'axios'
import store from '../store'
import qs from 'qs'
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config = {
    baseURL: 'http://127.0.0.1:8089/'
    // timeout: 60 * 1000, // Timeout
    // withCredentials: true, // Check cross-site Access-Control
}

const _axios = axios.create(config)
_axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
_axios.interceptors.request.use(
    function(config) {
    // Do something before request is sent
        if (store.state.token != null) {
            config.headers.token = store.state.token.data
        }
        if (config.data !== undefined && config.method !== 'get') {
            const name = config.data.constructor.name
            if (name !== 'FormData' && config.headers['Content-Type'].indexOf('json') === -1) {
                config.data = qs.stringify(config.data)
            }
        }
        return config
    },
    function(error) {
    // Do something with request error
        return Promise.reject(error)
    }
)

// Add a response interceptor
_axios.interceptors.response.use(
    function(response) {
    // Do something with response data
        // 当后端返回数组没有遵守规定的返回格式直接返回结果
        if (response.data.data == undefined || response.data.data == null) {
            return response
        }
        if (response.data.status != 200) {
            return Promise.reject(response.data.data)
        }
        return response
    },
    function(error) {
    // Do something with response error
        return Promise.reject(error)
    }
)

Plugin.install = function(Vue, options) {
    Vue.axios = _axios
    window.axios = _axios
    Object.defineProperties(Vue.prototype, {
        axios: {
            get() {
                return _axios
            }
        },
        $axios: {
            get() {
                return _axios
            }
        }
    })
}

Vue.use(Plugin)

export default Plugin
