import Vue from 'vue'
import App from './App.vue'
import VPicker from './lib'

Vue.use(VPicker)
new Vue({
    el: '#app',
    render: h => h(App)
})
