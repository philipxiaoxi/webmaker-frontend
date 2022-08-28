import axios from './axios'
import Vue from 'vue'

const _axios = axios
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
