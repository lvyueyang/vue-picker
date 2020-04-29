import Picker from './picker'
import PickerModal from './modal'

const plugin = {
    install(Vue, options) {
        Vue.component('v-picker', Picker)
        Vue.component('v-picker-modal', PickerModal)

        const picker = new (Vue.extend(PickerModal))({
            el: document.createElement('div')
        })

        const pickerDom = picker.$el

        function createPicker() {
            document.body.appendChild(pickerDom)
        }

        function removePicker() {
            setTimeout(() => {
                document.body.removeChild(pickerDom)
            }, 300)
        }

        Vue.prototype.$picker = ({options = [], title = '', mask = true, value = [], change, cancel, confirm, confirmText, cancelText}) => {
            picker.options = options
            picker.title = title
            picker.value = value
            picker.show = true
            picker.mask = mask

            createPicker()
            picker.changeCallBack = (e) => {
                if (change) {
                    change(e)
                }
            }
            picker.confirmCallBack = e => {
                if (confirm) {
                    confirm(e)
                }
                removePicker()
            }
            picker.cancelCallBack = () => {
                if (cancel) {
                    cancel()
                }
                removePicker()
            }
            if (confirmText) {
                picker.confirmText = confirmText
            }
            if (cancelText) {
                picker.cancelText = cancelText
            }
            return picker
        }
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin)
}

export default plugin
export const VPicker = Picker
export const VPickerModal = PickerModal
