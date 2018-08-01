import Vue from 'vue'
import VueRouter from 'vue-router'
import vClickOutside from 'v-click-outside'

// Plugins
import GlobalComponents from './gloablComponents'
import Notifications from './components/UIComponents/NotificationPlugin'
import SideBar from './components/UIComponents/SidebarPlugin'
import App from './App'

// router setup
import routes from './routes/routes'

// library imports
import Chartist from 'chartist'
import './bootstrap.min.css'
import './assets/sass/paper-dashboard.scss'

import 'es6-promise/auto'
import Vuetify from 'vuetify'
import {ClientTable} from 'vue-tables-2'
import VueSession from 'vue-session'
import moment from 'moment'
import VueMomentJS from 'vue-momentjs'

Vue.use(require('vue-chartist'))
Vue.use(VueMomentJS, moment)
Vue.use(VueSession)
Vue.use(ClientTable)
Vue.use(Vuetify)
// plugin setup
Vue.use(VueRouter)
Vue.use(GlobalComponents)
Vue.use(vClickOutside)
Vue.use(Notifications)
Vue.use(SideBar)

// let config = {
//   databaseURL: 'https://agio-72a5e.firebaseio.com/',
//   apiKey: 'AIzaSyBY4t1yHIaW6MTHFf3-xsc0-c0p-ngvEyg'
// }
// Firebase.initializeApp(config)

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'active'
})

// global library setup
Object.defineProperty(Vue.prototype, '$Chartist', {
  get () {
    return this.$root.Chartist
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  data: {
    Chartist: Chartist
  }
})
