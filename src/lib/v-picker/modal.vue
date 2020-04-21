<template>
    <transition name="fade">
        <div class="v-picker-wrap-modal" v-show="show" @click="handlerCancel(true)">
            <transition name="up-slide">
                <div class="v-picker-mb" v-show="show" @click.stop>
                    <div class="v-picker-header">
                        <button @click="handlerCancel">{{cancelText}}</button>
                        <div class="v-picker-title">{{title}}</div>
                        <button @click="handlerConfirm">{{confirmText}}</button>
                    </div>
                    <div class="v-picker-list-wrap">
                        <picker ref="Picker" :options="options" :value="value" @change="listChange"></picker>
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
    import util from './util'
    import Picker from './picker'

    export default {
        name: 'PickerModal',
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            mask: {
                type: Boolean,
                default: true
            },
            options: {
                type: Array,
                default() {
                    return []
                }
            },
            value: {
                type: Array,
                default() {
                    return []
                }
            },
            confirmText: {
                type: String,
                default: '确定'
            },
            cancelText: {
                type: String,
                default: '取消'
            },
            title: {
                type: String,
                default: ''
            },
            appendBody: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                show: this.visible,
            }
        },
        watch: {
            visible(val) {
                this.show = val
            },
        },
        computed: {
            checked() {
                return util.objectDeepCopy(this.value)
            },
        },
        components: {
            Picker
        },
        mounted() {
            if (this.appendBody) {
                document.body.appendChild(this.$el)
            }
        },
        methods: {
            changeCallBack() {
            },
            confirmCallBack() {
            },
            cancelCallBack() {
            },
            setOptions(index, list) {
                const options = util.objectDeepCopy(this.options)
                options[index] = list
                this.options = options
            },
            listChange(e) {
                e.checked.forEach((item, index) => {
                    this.checked.splice(index, 1, item)
                })
                this.changeCallBack(e)
                this.$emit('change', e)
            },
            handlerConfirm() {
                console.log()
                let value = this.$refs['Picker'].getResult()
                if (!value) {
                    value = this.$refs['Picker'].$children[0].getResult()
                }
                this.confirmCallBack(value)
                this.$emit('confirm', value)
                this.hide()
            },
            handlerCancel(clickMask = false) {
                if (clickMask === true) {
                    if (!this.mask) {
                        return
                    }
                }
                this.$emit('cancel')
                this.cancelCallBack()
                this.hide()
            },
            hide() {
                this.show = false
                this.$emit('update:visible', false)
            }
        },
    }
</script>

<style lang="scss" scoped>
    .v-picker-wrap-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .3);
        z-index: 2020;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        flex-direction: column;

        .v-picker-mb {
            width: 100%;
        }

        .v-picker-header {
            height: 50px;
            line-height: 50px;
            width: 100%;
            background-color: #fff;
            display: flex;
            font-size: 14px;
            border-bottom: 1px solid #ddd;

            button {
                background: transparent;
                border: none;
                font-size: 14px;
                white-space: nowrap;
                padding: 0 1em;
                outline: none;
                cursor: pointer;
            }

            .v-picker-title {
                flex: 1;
                text-align: center;
                font-weight: 700;
                padding: 0 1em;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    .up-slide-enter-active, .up-slide-leave-active {
        transition: transform .2s;
        transform: translateY(0);
    }

    .up-slide-enter, .up-slide-leave-to {
        transform: translateY(100%);
    }
</style>
