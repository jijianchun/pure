// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

import store from './store/store'

Vue.use(Element)

Vue.config.productionTip = false

/* eslint-disable no-new */
axios.get('static/global.json').then((res) => {
  axios.defaults.baseURL = res.data['AJAX_BASE_URL']
  axios.defaults.timeout = 10000
  // axios.defaults.withCredentials = true
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
  })
})
