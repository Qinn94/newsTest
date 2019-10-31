// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './css/base.css'
import './css/commom.css'
import axios from 'axios'
import '../src/js/rem'
import store from "./store/store"


Vue.config.productionTip = false
Vue.prototype.axios = axios
axios.defaults.baseURL = "https://goldeye.cfbond.com/"

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
