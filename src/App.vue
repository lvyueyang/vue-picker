<template>
    <div id="app">
        <v-picker :options="list" v-model="checked" @change="handlerChange" @input="handlerInput"></v-picker>
        <br>
        <div style="text-align:center;">
            <button @click="handlerFunctionShow">显示函数调用</button>
            <button @click="visible = true">显示组件调用</button>
        </div>
        <br>
        <v-picker-modal :visible.sync="visible"
                        :options="list"
                        title="这是组件调用"
                        :value="checked"
                        @change="change"
                        @confirm="confirm"
                        @cancel="cancel"></v-picker-modal>
    </div>
</template>

<script>
    let list = []
    for (let j = 1; j <= 3; j++) {
        const arr = []
        for (let i = 1; i < 5; i++) {
            arr.push({
                label: `选项${j}-${i}`,
                value: `${j}-${i}`
            })
        }
        list.push(arr)
    }
    export default {
        name: 'App',
        data() {
            return {
                checked: ['1-1', '2-2', '3-3', '4-4'],
                cityChecked: ['13', '1302', '130202'],
                list,
                visible: false
            }
        },
        methods: {
            handlerChange(e) {
                console.log(JSON.stringify(e))
            },
            handlerInput(e) {
                console.log(JSON.stringify(e))
            },
            handlerFunctionShow() {
                const picker = this.$picker({
                    options: list,
                    value: ['1-1', '2-2', '3-3', '4-4'],
                    confirmText: 'Confirm',
                    cancelText: 'Cancel',
                    title: '这是函数调用',
                    mask: false, // 点击遮罩层是否关闭 默认 true
                    change: e => {
                        console.log('触发change', e)

                        // 设置第一列
                        picker.setOptions(0, [{
                            label: '12312',
                            value: '12312',
                        }])
                    },
                    confirm: e => {
                        console.log('点击了确定', e)
                    },
                    cancel: () => {
                        console.log('点击了取消')
                    }
                })
            },
            change(e) {
                // console.log(e)
            },
            confirm(e) {
                console.log(e)
            },
            cancel() {
            },
            setList(reduc = '+') {
                const list = []
                let len = this.list.length
                if (reduc === '-') {
                    len -= 10
                } else {
                    len += 10
                }
                console.log(len)
                for (let i = 1; i <= len; i++) {
                    list.push({
                        label: `选项${i}`,
                        value: i
                    })
                }
                return list
            }
        }
    }
</script>

<style lang="scss">
    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        padding: 0;
    }

</style>
