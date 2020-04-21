import Vue from 'vue'
import App from './App.vue'
import VPicker from './picker'

Vue.use(VPicker)
new Vue({
    el: '#app',
    render: h => h(App)
})
